import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/contexts/language-context";
import { AudioProvider } from "@/contexts/audio-context";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AudioPlayer } from "@/components/audio/audio-player";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
});

const SITE_URL = "https://f1brasil.pages.dev";
const TITLE = "F1 Brasil | Lendas das Pistas";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: "Oito títulos mundiais e um país inteiro acelerando junto. Uma jornada interativa pela história e telemetria dos maiores heróis brasileiros da Fórmula 1.",
  keywords: ["F1", "Fórmula 1", "Brasil", "Emerson Fittipaldi", "Nelson Piquet", "Ayrton Senna", "Rubens Barrichello", "Felipe Massa", "Gabriel Bortoleto"],

  openGraph: {
    title: TITLE,
    description: "Conheça a trajetória épica dos pilotos que transformaram as manhãs de domingo na era de ouro do nosso automobilismo.",
    url: SITE_URL,
    siteName: "F1 Brasil",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "F1 Brasil - Lendas das Pistas" }],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Uma imersão na história dos ícones brasileiros da F1.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased`}>
        <SmoothScroll>
          <LanguageProvider>
            <AudioProvider>
              <ScrollProgress />
              {children}
              <AudioPlayer />
              <div className="film-grain" aria-hidden="true" />
            </AudioProvider>
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
