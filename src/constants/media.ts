import type { Track } from "@/contexts/audio-context";

export const TRACKS = {
  FITTIPALDI: { id: "fittipaldi", src: "/audio/ze-roberto-lotus-72d.mp3", title: "Lotus 72D", artist: "Zé Roberto" },
  PIQUET: { id: "piquet", src: "/audio/tema-da-vitoria.mp3", title: "Tema da Vitória", artist: "Eduardo Souto Neto" },
  SENNA: { id: "senna", src: "/audio/the-best-tina-turner.mp3", title: "The Best", artist: "Tina Turner" },
  SENNA_LEGACY: { id: "senna-legacy", src: "/audio/tema-vitoria-violao.mp3", title: "Tema da Vitória (Violão)", artist: "Fabio Lima" },
  BARRICHELLO: { id: "barrichello", src: "/audio/dont-stop-me-now.mp3", title: "Don't Stop Me Now", artist: "Queen" },
  MASSA: { id: "massa", src: "/audio/the-winner-takes-it-all.mp3", title: "The Winner Takes It All", artist: "ABBA" },
  BORTOLETO: { id: "bortoleto", src: "/audio/just-keep-watching.mp3", title: "Just Keep Watching", artist: "Tate McRae" },
} satisfies Record<string, Track>;

export const ASSETS = {
  HERO: "/hero-image-retocada-color-semfundo.webp",

  FITTIPALDI: {
    PROFILE: "/fittipaldi/img-fitti-profile.webp",
    PRE_F1: "/fittipaldi/img-fitti-1.webp",
    LOTUS72: "/fittipaldi/img-fitti-2.webp",
    MCLAREN74: "/fittipaldi/img-fitti-3.webp",
    COPERSUCAR: "/fittipaldi/img-fitti-4.webp",
    INDY: "/fittipaldi/img-fitti-5.webp",
  },

  PIQUET: {
    PROFILE: "/piquet/img-piquet-profile.webp",
    PRE_F1: "/piquet/img-piquet-pre.webp",
    BRABHAM81: "/piquet/img-piquet-1.webp",
    BRABHAM83: "/piquet/img-piquet-2.webp",
    WILLIAMS87: "/piquet/img-piquet-3.webp",
    LOTUS_BENETTON: "/piquet/img-piquet-4.webp",
    POS_F1: "/piquet/img-piquet-pos.webp",
  },

  SENNA: {
    PROFILE: "/senna/img-senna-profile.webp",
    PRE_F1: "/senna/img-senna-pre.webp",
    TOLEMAN84: "/senna/img-senna-toleman.webp",
    LOTUS85: "/senna/img-senna-lotus.webp",
    MONACO88: "/senna/img-senna-monaco88.webp",
    TITLE88: "/senna/img-senna-title88.webp",
    TITLES9091: "/senna/img-senna-titles.webp",
    INTERLAGOS91: "/senna/img-senna-interlagos.webp",
    DONINGTON93: "/senna/img-senna-donington.webp",
  },

  SENNA_LEGACY: {
    IMOLA: "/senna/img-imola.webp",
    CORTEGO: "/senna/img-cortego.webp",
    INSTITUTO: "/senna/img-instituto-logo.webp",
    QUOTE_VIDEO: "/senna/senna-quote.mp4",
    SIGNATURE: "/senna/senna-signature.svg",
  },

  BARRICHELLO: {
    PROFILE: "/barrichello/img-rubinho-profile.webp",
    EARLY: "/barrichello/img-rubinho-senna.webp",
    IMOLA: "/barrichello/img-rubinho-1994.webp",
    FERRARI: "/barrichello/img-rubinho-ferrari.webp",
    BRAWN: "/barrichello/img-rubinho-brawn.webp",
    STOCKCAR: "/barrichello/rubinho-stockcar.webp",
    FAMILY: "/barrichello/rubinho-family.webp",
  },

  MASSA: {
    PROFILE: "/massa/img-massa-profile.webp",
    PRE_F1: "/massa/img-massa-sauber.webp",
    FERRARI: "/massa/img-massa-ferrari-interlagos.webp",
    DRAMA2008: "/massa/img-massa-interlagos-2008.webp",
    MOLA: "/massa/img-massa-mola-hungary.webp",
    STOCKCAR: "/massa/img-massa-stockcar.webp",
  },

  BORTOLETO: {
    HERO: "/bortoleto/img-bortoleto-profile.webp",
  },
};