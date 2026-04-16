import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Ignace Consulting | Consultant IA pour CGP",
  description:
    "J'automatise vos opérations pour que vous passiez moins de temps à administrer et plus de temps à conseiller. Spécialiste des Conseillers en Gestion de Patrimoine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-[#2D2D2D]`}>
        {children}
      </body>
    </html>
  );
}
