import type { Metadata } from "next";
import { Syncopate, Manrope } from "next/font/google";
import "./globals.css";
import React from "react";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://capta-imoveis.vercel.app"),
  title: "Capta Imóveis | Imóveis à venda e visitas pelo WhatsApp",
  description: "Página de corretor imobiliário para captar interessados em comprar imóvel, pedir informações e agendar visita pelo WhatsApp.",
  keywords: "corretor imobiliário, imóveis à venda, agendar visita, whatsapp imobiliário, comprar imóvel",
  openGraph: {
    title: "Capta Imóveis",
    description: "Encontre imóveis, peça informações e agende visita pelo WhatsApp.",
    images: [{ url: '/hero.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${syncopate.variable} ${manrope.variable} antialiased`}>
        <div className="noise-overlay"></div>
        {children}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Capta Imóveis",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Central, 1000",
                "addressLocality": "Sua Cidade",
                "addressRegion": "BR",
                "postalCode": "00000-000",
                "addressCountry": "BR"
              },
              "telephone": "+55 11 99999-9999",
              "openingHours": [
                "Mo-Fr 08:00-17:30",
                "Sa 09:00-13:00"
              ],
              "url": "https://capta-imoveis.vercel.app"
            })
          }}
        />
      </body>
    </html>
  );
}
