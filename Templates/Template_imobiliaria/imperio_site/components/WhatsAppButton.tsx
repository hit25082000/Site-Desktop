"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Olá! Tenho interesse em comprar um imóvel e quero agendar uma visita.");
  const phone = "+5511999999999";

  return (
    <a
      href={`https://wa.me/${phone.replace(/[\s+]/g, "")}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-black text-[10px] py-2 px-4 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold shadow-lg pointer-events-none">
        Conversar agora
      </span>
    </a>
  );
}
