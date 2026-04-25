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
  title: "Império Consultoria Habitacional | Especialistas em Financiamento e FGTS",
  description: "Consultoria técnica especializada em processos bancários, FGTS e financiamentos habitacionais em Campo Grande - MS. Segurança e agilidade na sua conquista.",
  keywords: "consultoria habitacional, financiamento caixa, fgts, aprovação de crédito, campo grande ms, império consultoria",
  openGraph: {
    title: "Império Consultoria Habitacional",
    description: "Sua aprovação de crédito imobiliário sem burocracia.",
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
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Império Consultoria Habitacional",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "R. Joaquim Távora, 35 - Centro",
                "addressLocality": "Campo Grande",
                "addressRegion": "MS",
                "postalCode": "79002-076",
                "addressCountry": "BR"
              },
              "telephone": "+55 67 3045-0333",
              "openingHours": [
                "Mo-Fr 08:00-17:30",
                "Sa 09:00-13:00"
              ],
              "url": "https://imperioconsultoria.com.br"
            })
          }}
        />
      </body>
    </html>
  );
}
