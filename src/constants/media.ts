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
  HERO: "/hero-image-retocada-color-semfundo.png",

  FITTIPALDI: {
    PROFILE: "/fittipaldi/img-fitti-profile.jpg",
    PRE_F1: "/fittipaldi/img-fitti-1.jpg",
    LOTUS72: "/fittipaldi/img-fitti-2.jpg",
    MCLAREN74: "/fittipaldi/img-fitti-3.webp",
    COPERSUCAR: "/fittipaldi/img-fitti-4.jpg",
    INDY: "/fittipaldi/img-fitti-5.webp",
  },

  PIQUET: {
    PROFILE: "/piquet/img-piquet-profile.jpg",
    PRE_F1: "/piquet/img-piquet-pre.jpg",
    BRABHAM81: "/piquet/img-piquet-1.jpg",
    BRABHAM83: "/piquet/img-piquet-2.jpg",
    WILLIAMS87: "/piquet/img-piquet-3.jpg",
    LOTUS_BENETTON: "/piquet/img-piquet-4.jpg",
    POS_F1: "/piquet/img-piquet-pos.jpg",
  },

  SENNA: {
    PROFILE: "/senna/img-senna-profile.jpg",
    PRE_F1: "/senna/img-senna-pre.jpg",
    TOLEMAN84: "/senna/img-senna-toleman.jpg",
    LOTUS85: "/senna/img-senna-lotus.jpg",
    MONACO88: "/senna/img-senna-monaco88.jpg",
    TITLE88: "/senna/img-senna-title88.jpg",
    TITLES9091: "/senna/img-senna-titles.jpg",
    INTERLAGOS91: "/senna/img-senna-interlagos.jpg",
    DONINGTON93: "/senna/img-senna-donington.jpg",
  },

  SENNA_LEGACY: {
    IMOLA: "/senna/img-imola.jpg",
    CORTEGO: "/senna/img-cortego.jpg",
    INSTITUTO: "/senna/img-instituto-logo.webp",
    QUOTE_VIDEO: "/senna/senna-quote.mp4",
    SIGNATURE: "/senna/senna-signature.svg",
  },

  BARRICHELLO: {
    PROFILE: "/barrichello/img-rubinho-profile.jpg",
    EARLY: "/barrichello/img-rubinho-senna.jpg",
    IMOLA: "/barrichello/img-rubinho-1994.jpg",
    FERRARI: "/barrichello/img-rubinho-ferrari.jpg",
    BRAWN: "/barrichello/img-rubinho-brawn.jpg",
    STOCKCAR: "/barrichello/rubinho-stockcar.jpg",
    FAMILY: "/barrichello/rubinho-family.jpg",
  },

  MASSA: {
    PROFILE: "/massa/img-massa-profile.jpg",
    PRE_F1: "/massa/img-massa-sauber.jpg",
    FERRARI: "/massa/img-massa-ferrari-interlagos.jpg",
    DRAMA2008: "/massa/img-massa-interlagos-2008.jpg",
    MOLA: "/massa/img-massa-mola-hungary.jpg",
    STOCKCAR: "/massa/img-massa-stockcar.jpg",
  },

  BORTOLETO: {
    HERO: "/bortoleto/img-bortoleto-profile.jpg",
  },
};