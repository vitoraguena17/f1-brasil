import { useEffect, useState } from "react";

const API_URL = "https://api.jolpi.ca/ergast/f1";

// Uma requisição por piloto por sessão, mesmo com remounts (troca de idioma, HMR etc.)
const cache = new Map<string, Promise<number | null>>();

function fetchWins(apiId: string) {
  let request = cache.get(apiId);
  if (!request) {
    request = fetch(`${API_URL}/drivers/${apiId}/results/1.json?limit=1`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        const total = Number(data?.MRData?.total);
        return Number.isFinite(total) && total > 0 ? total : null;
      })
      .catch(() => null);
    cache.set(apiId, request);
  }
  return request;
}

/** Vitórias na F1 vindas da API Jolpica (Ergast), com o valor local como fallback. */
export function useDriverWins(apiId: string, fallback: number) {
  const [wins, setWins] = useState(fallback);

  useEffect(() => {
    let isMounted = true;
    fetchWins(apiId).then((total) => {
      if (isMounted && total !== null) setWins(total);
    });
    return () => { isMounted = false; };
  }, [apiId]);

  return wins;
}
