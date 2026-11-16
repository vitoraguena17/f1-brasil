import { ASSETS, TRACKS } from "@/constants/media";
import type { Track } from "@/contexts/audio-context";
import type { SeasonStats } from "@/hooks/use-season-stats";

export interface DriverCard {
  /** Chave no JSON de idioma: `<driver.id>.<key>.period|title|text` */
  key: string;
  image: string;
}

export interface Driver {
  /** Namespace no JSON de idioma e prefixo do id da seção (`<id>-section`) */
  id: string;
  /** driverId na API Jolpica/Ergast */
  apiId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  /** Vitórias usadas enquanto a API não responde (ou se ela falhar) */
  wins: number;
  titles: number;
  /** Conferidos na API Jolpica (pódios = resultados 1º-3º, poles = largadas em 1º) */
  podiums: number;
  poles: number;
  /** Anos na F1 e principais equipes, exibidos sobre a foto de abertura */
  era: string;
  teams: string[];
  /** Mostra um asterisco nos títulos com a nota `<id>.titlesNote` */
  titlesNote?: boolean;
  track: Track;
  cards: DriverCard[];
}

export const DRIVERS = {
  fittipaldi: {
    id: "fittipaldi",
    apiId: "emerson_fittipaldi",
    firstName: "Emerson",
    lastName: "Fittipaldi",
    profileImage: ASSETS.FITTIPALDI.PROFILE,
    wins: 14,
    titles: 2,
    podiums: 35,
    poles: 6,
    era: "1970 – 1980",
    teams: ["Lotus", "McLaren", "Fittipaldi"],
    track: TRACKS.FITTIPALDI,
    cards: [
      { key: "preF1", image: ASSETS.FITTIPALDI.PRE_F1 },
      { key: "lotus72", image: ASSETS.FITTIPALDI.LOTUS72 },
      { key: "mclaren74", image: ASSETS.FITTIPALDI.MCLAREN74 },
      { key: "copersucar", image: ASSETS.FITTIPALDI.COPERSUCAR },
      { key: "indy", image: ASSETS.FITTIPALDI.INDY },
    ],
  },
  piquet: {
    id: "piquet",
    apiId: "piquet",
    firstName: "Nelson",
    lastName: "Piquet",
    profileImage: ASSETS.PIQUET.PROFILE,
    wins: 23,
    titles: 3,
    podiums: 60,
    poles: 24,
    era: "1978 – 1991",
    teams: ["Brabham", "Williams", "Lotus", "Benetton"],
    track: TRACKS.PIQUET,
    cards: [
      { key: "preF1", image: ASSETS.PIQUET.PRE_F1 },
      { key: "brabham81", image: ASSETS.PIQUET.BRABHAM81 },
      { key: "brabham83", image: ASSETS.PIQUET.BRABHAM83 },
      { key: "williams87", image: ASSETS.PIQUET.WILLIAMS87 },
      { key: "benetton", image: ASSETS.PIQUET.LOTUS_BENETTON },
      { key: "posF1", image: ASSETS.PIQUET.POS_F1 },
    ],
  },
  senna: {
    id: "senna",
    apiId: "senna",
    firstName: "Ayrton",
    lastName: "Senna",
    profileImage: ASSETS.SENNA.PROFILE,
    wins: 41,
    titles: 3,
    podiums: 80,
    poles: 65,
    era: "1984 – 1994",
    teams: ["Toleman", "Lotus", "McLaren", "Williams"],
    track: TRACKS.SENNA,
    cards: [
      { key: "preF1", image: ASSETS.SENNA.PRE_F1 },
      { key: "toleman84", image: ASSETS.SENNA.TOLEMAN84 },
      { key: "lotus85", image: ASSETS.SENNA.LOTUS85 },
      { key: "monaco88", image: ASSETS.SENNA.MONACO88 },
      { key: "title88", image: ASSETS.SENNA.TITLE88 },
      { key: "titles9091", image: ASSETS.SENNA.TITLES9091 },
      { key: "interlagos91", image: ASSETS.SENNA.INTERLAGOS91 },
      { key: "donington93", image: ASSETS.SENNA.DONINGTON93 },
    ],
  },
  barrichello: {
    id: "barrichello",
    apiId: "barrichello",
    firstName: "Rubens",
    lastName: "Barrichello",
    profileImage: ASSETS.BARRICHELLO.PROFILE,
    wins: 11,
    titles: 0,
    podiums: 68,
    poles: 14,
    era: "1993 – 2011",
    teams: ["Jordan", "Stewart", "Ferrari", "Brawn", "Williams"],
    track: TRACKS.BARRICHELLO,
    cards: [
      { key: "early", image: ASSETS.BARRICHELLO.EARLY },
      { key: "imola", image: ASSETS.BARRICHELLO.IMOLA },
      { key: "ferrari", image: ASSETS.BARRICHELLO.FERRARI },
      { key: "brawn", image: ASSETS.BARRICHELLO.BRAWN },
      { key: "stockcar", image: ASSETS.BARRICHELLO.STOCKCAR },
      { key: "family", image: ASSETS.BARRICHELLO.FAMILY },
    ],
  },
  massa: {
    id: "massa",
    apiId: "massa",
    firstName: "Felipe",
    lastName: "Massa",
    profileImage: ASSETS.MASSA.PROFILE,
    wins: 11,
    titles: 0,
    podiums: 41,
    poles: 16,
    era: "2002 – 2017",
    teams: ["Sauber", "Ferrari", "Williams"],
    titlesNote: true,
    track: TRACKS.MASSA,
    cards: [
      { key: "preF1", image: ASSETS.MASSA.PRE_F1 },
      { key: "ferrari", image: ASSETS.MASSA.FERRARI },
      { key: "drama2008", image: ASSETS.MASSA.DRAMA2008 },
      { key: "mola", image: ASSETS.MASSA.MOLA },
      { key: "stockcar", image: ASSETS.MASSA.STOCKCAR },
    ],
  },
} satisfies Record<string, Driver>;

/* ---------- Capítulo "Agora": pilotos em atividade ---------- */

type LiveStatKey = Exclude<keyof SeasonStats, "season">;

export interface NowStat {
  /** Chave em `now.stats.<label>` */
  label: string;
  /** Campo vindo da API (ao vivo) ou um número fixo */
  source: LiveStatKey | number;
  prefix?: string;
}

export interface NowDriver {
  /** Namespace no JSON de idioma: `now.<id>` */
  id: string;
  /** driverId na API Jolpica/Ergast */
  apiId: string;
  firstName: string;
  lastName: string;
  number: number;
  /** Sem imagem, o painel mostra o número do carro */
  image?: string;
  track: Track;
  /** Valores usados enquanto a API não responde (atualizados após o GP de São Paulo de 2026) */
  fallback: SeasonStats;
  stats: NowStat[];
  /** Chaves em `now.<id>.milestones.<key>.year|title|text` */
  milestones: string[];
}

export const NOW_DRIVERS = {
  bortoleto: {
    id: "bortoleto",
    apiId: "bortoleto",
    firstName: "Gabriel",
    lastName: "Bortoleto",
    number: 5,
    image: ASSETS.BORTOLETO.HERO,
    track: TRACKS.BORTOLETO,
    fallback: { season: 2026, position: 14, points: 14, bestFinish: 8, bestGrid: 8, starts: 44 },
    stats: [
      { label: "position", source: "position", prefix: "P" },
      { label: "points", source: "points" },
      { label: "bestFinish", source: "bestFinish", prefix: "P" },
      { label: "starts", source: "starts" },
    ],
    milestones: ["f3", "f2", "rookie", "audi"],
  },
  camara: {
    id: "camara",
    apiId: "rafael_camara",
    firstName: "Rafael",
    lastName: "Câmara",
    number: 51,
    image: ASSETS.CAMARA.HERO,
    track: TRACKS.CAMARA,
    fallback: { season: 2026, position: 25, points: 0, bestFinish: 20, bestGrid: 11, starts: 1 },
    stats: [
      { label: "bestGrid", source: "bestGrid", prefix: "P" },
      { label: "starts", source: "starts" },
      { label: "juniorTitles", source: 2 },
      { label: "fullTimeFrom", source: 2027 },
    ],
    milestones: ["freca", "f3", "f2", "debut", "haas"],
  },
} satisfies Record<string, NowDriver>;
