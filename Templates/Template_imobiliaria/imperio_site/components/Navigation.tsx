"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-50 mix-blend-difference text-white">
      <Link href="/" className="display text-xl md:text-2xl tracking-tight uppercase">
        Capta Imóveis
      </Link>
      
      <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-medium">
        <Link href="#imoveis" className="hover:text-gray-400 transition-colors">Imóveis</Link>
        <Link href="#como-funciona" className="hover:text-gray-400 transition-colors">Visita</Link>
        <Link href="#contato" className="hover:text-gray-400 transition-colors">Contato</Link>
      </div>

      <a 
        href="tel:+5511999999999"
        className="flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-[10px] uppercase tracking-widest"
      >
        <Phone size={14} />
        <span className="hidden sm:inline">(11) 99999-9999</span>
      </a>
    </nav>
  );
}
