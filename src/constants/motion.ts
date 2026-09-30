// Linha do tempo da entrada da página (em segundos, a partir da hidratação).
// O preloader sobe em PRELOADER_EXIT e o resto do hero entra em cascata a partir daí.
const PRELOADER_EXIT = 2.2;

export const INTRO = {
  PRELOADER_EXIT,
  HERO_IMAGE: PRELOADER_EXIT - 0.5,
  TITLE: PRELOADER_EXIT + 0.2,
  HEADER: PRELOADER_EXIT + 0.4,
  DESCRIPTION: PRELOADER_EXIT + 1,
  BUTTON: PRELOADER_EXIT + 1.4,
};
