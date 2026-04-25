"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

const servicos = [
  {
    id: "01",
    title: "Aprovação de Crédito",
    desc: "Análise técnica rigorosa do perfil financeiro para garantir as melhores taxas junto aos maiores bancos (Caixa, BB, Itaú, Bradesco).",
    location: "Assessoria Bancária",
    img: "/service.png",
  },
  {
    id: "02",
    title: "Uso do FGTS",
    desc: "Consultoria estratégica para utilização do saldo de FGTS na entrada ou amortização do financiamento, seguindo as normas vigentes do governo.",
    location: "Estratégia Financeira",
    img: "/hero.png", // Reusing for placeholder feel but with context
  },
  {
    id: "03",
    title: "Minha Casa Minha Vida",
    desc: "Especialistas no programa habitacional do Governo Federal, garantindo subsídios máximos e menores juros do mercado.",
    location: "Subsídios Federais",
    img: "/service.png",
  },
  {
    id: "04",
    title: "Regularização Jurídica",
    desc: "Assessoria completa para regularização de imóveis, escrituras, ITBI e toda a burocracia documental para viabilizar a transação.",
    location: "Legal & Compliance",
    img: "/hero.png",
  },
];

export default function Services() {
  useEffect(() => {
    // Card Hover Parallax
    document.querySelectorAll(".card-inner").forEach((card) => {
      const img = card.querySelector(".card-img");
      card.addEventListener("mouseenter", () => {
        gsap.to(img, { scale: 1.1, duration: 1.5, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(img, { scale: 1, duration: 1.5, ease: "power2.out" });
      });
    });
  }, []);

  return (
    <section id="servicos" className="py-24 bg-[var(--c-bg)]">
      <div className="px-6 md:px-20 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.5em] text-black/30 mb-6">02 / Áreas de Atuação</div>
            <h2 className="display text-5xl md:text-7xl tracking-tighter mix-blend-difference">Nossas <br/><span className="text-gray-400">Soluções</span></h2>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] font-light max-w-xs text-right hidden md:block opacity-60">
            Acompanhamento técnico do início ao fim do processo habitacional.
          </p>
        </div>

        <div className="space-y-12">
          {servicos.map((item) => (
            <div key={item.id} className="group overflow-hidden bg-[var(--c-card)] min-h-[500px] grid grid-cols-1 md:grid-cols-2 card-inner border border-white/5 transition-all duration-700">
              <div className="p-12 flex flex-col justify-between text-white">
                <div>
                  <div className="display text-[80px] leading-none opacity-5 mb-4">{item.id}</div>
                  <h3 className="display text-3xl md:text-4xl mb-6">{item.title}</h3>
                  <p className="font-light text-white/50 leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-8 mt-12">
                   <span className="text-[10px] uppercase tracking-widest text-white/30">{item.location}</span>
                   <button className="text-[10px] uppercase tracking-[0.3em] border-b border-white/20 pb-2 hover:border-white transition-all">Saiba mais</button>
                </div>
              </div>
              <div className="relative overflow-hidden h-[300px] md:h-auto order-first md:order-last">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover card-img transition-transform duration-[2s]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
