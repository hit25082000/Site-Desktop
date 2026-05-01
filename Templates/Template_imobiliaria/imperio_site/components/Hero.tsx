"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    gsap.to(".hero-text-line span", {
      y: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.out",
      delay: 2.5, // After preloader
    });

    gsap.to(".hero-fade", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 3.2,
      ease: "power2.out",
    });

    gsap.to(".hero-bg", {
      scale: 1.1,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="hero-section h-screen relative flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Corretor imobiliário atendendo cliente"
          fill
          className="object-cover hero-bg brightness-50"
          priority
        />
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="display text-[10vw] md:text-[8vw] leading-[0.9] tracking-tighter mix-blend-difference uppercase">
          <div className="hero-text-line overflow-hidden">
            <span className="block translate-y-full">IMÓVEIS</span>
          </div>
          <div className="hero-text-line overflow-hidden">
            <span className="block translate-y-full text-[var(--c-bg)]">À VENDA</span>
          </div>
        </h1>
        
        <div className="mt-8 flex flex-col items-center hero-fade opacity-0 translate-y-10 mix-blend-difference">
          <p className="max-w-xl text-xs md:text-sm uppercase tracking-[0.4em] font-light leading-loose text-white/70">
            Imóveis selecionados para quem quer comprar, visitar e falar direto no WhatsApp
          </p>
          <Link href="#triagem" className="mt-10 px-10 py-4 bg-white text-black display text-[10px] tracking-widest hover:bg-[#E3E1DC] transition-colors">
            AGENDAR VISITA
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 md:left-20 hero-fade opacity-0 mix-blend-difference hidden md:block">
        <div className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Segmento</div>
        <div className="text-xs font-light">Compra, visita e atendimento</div>
      </div>
    </section>
  );
}
