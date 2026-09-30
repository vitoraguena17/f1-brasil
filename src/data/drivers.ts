import { ASSETS, TRACKS } from "@/constants/media";
import type { Track } from "@/contexts/audio-context";

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
