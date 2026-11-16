import { useEffect, useState } from "react";

const API_URL = "https://api.jolpi.ca/ergast/f1";

export interface SeasonStats {
  season: number;
  /** Posição no campeonato de pilotos */
  position: number;
  points: number;
  bestFinish: number;
  bestGrid: number;
  /** GPs disputados na carreira */
  starts: number;
}

interface ApiResult {
  position?: string;
  grid?: string;
}

// Uma requisição por piloto por sessão, mesmo com remounts (troca de idioma, HMR etc.)
const cache = new Map<string, Promise<Partial<SeasonStats>>>();

// A Jolpica limita rajadas a ~4 req/s e as vitórias dos campeões já disparam 5 no carregamento:
// os pilotos atuais entram depois, um de cada vez (a seção fica bem abaixo da dobra)
const START_DELAY_MS = 1500;
let queue: Promise<unknown> = new Promise((resolve) => setTimeout(resolve, START_DELAY_MS));

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

async function getJson(path: string) {
  const res = await fetch(`${API_URL}/${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const toNumber = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

const best = (values: (number | undefined)[]) => {
  const valid = values.filter((v): v is number => v !== undefined);
  return valid.length ? Math.min(...valid) : undefined;
};

async function fetchStats(apiId: string): Promise<Partial<SeasonStats>> {
  const [standings, results, career] = await Promise.allSettled([
    getJson(`current/drivers/${apiId}/driverStandings.json`),
    getJson(`current/drivers/${apiId}/results.json?limit=100`),
    getJson(`drivers/${apiId}/results.json?limit=1`),
  ]);

  const stats: Partial<SeasonStats> = {};

  if (standings.status === "fulfilled") {
    const list = standings.value?.MRData?.StandingsTable?.StandingsLists?.[0];
    const row = list?.DriverStandings?.[0];
    // Antes da 1ª corrida a temporada "current" ainda não tem dados: mantém o fallback inteiro
    if (row) {
      stats.season = toNumber(list.season);
      stats.position = toNumber(row.position);
      stats.points = Number(row.points) >= 0 ? Number(row.points) : undefined;
    }
  }

  if (results.status === "fulfilled" && stats.season) {
    const races: { Results?: ApiResult[] }[] = results.value?.MRData?.RaceTable?.Races ?? [];
    const rows = races.map((race) => race.Results?.[0]).filter(Boolean) as ApiResult[];
    stats.bestFinish = best(rows.map((r) => toNumber(r.position)));
    // grid "0" = largada do pit lane, ignorado
    stats.bestGrid = best(rows.map((r) => toNumber(r.grid)));
  }

  if (career.status === "fulfilled") {
    stats.starts = toNumber(career.value?.MRData?.total);
  }

  // Remove campos que a API não conseguiu preencher para não sobrescrever o fallback com undefined
  return Object.fromEntries(Object.entries(stats).filter(([, v]) => v !== undefined));
}

/** Números da temporada atual vindos da API Jolpica (Ergast), com valores locais como fallback. */
export function useSeasonStats(apiId: string, fallback: SeasonStats) {
  const [stats, setStats] = useState(fallback);

  useEffect(() => {
    let isMounted = true;
    let request = cache.get(apiId);
    if (!request) {
      request = enqueue(() => fetchStats(apiId)).catch(() => ({}));
      cache.set(apiId, request);
    }
    request.then((live) => {
      if (isMounted) setStats((prev) => ({ ...prev, ...live }));
    });
    return () => { isMounted = false; };
  }, [apiId]);

  return stats;
}
