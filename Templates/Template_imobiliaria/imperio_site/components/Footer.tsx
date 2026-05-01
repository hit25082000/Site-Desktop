import React from "react";
import { Mail, Phone, MapPin, Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contato" className="bg-[var(--c-dark)] text-white pt-24 pb-12 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Brand & Address */}
        <div className="md:col-span-4">
          <div className="display text-3xl tracking-tight uppercase mb-6">Capta Imóveis</div>
          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-8">Imóveis à venda e visita agendada pelo WhatsApp</div>
          <p className="text-white/40 font-light text-sm max-w-xs leading-relaxed mb-8">
            Página de atendimento para mostrar imóveis, responder dúvidas e conduzir o interessado até a visita.
          </p>
          <div className="space-y-4">
             <div className="flex items-start gap-4 group">
               <MapPin className="text-white/30 group-hover:text-white transition-colors" size={18} />
               <span className="text-xs font-light leading-relaxed">
                 Av. Central, 1000<br/>
                 Sua Cidade - BR, 00000-000
               </span>
             </div>
             <div className="flex items-center gap-4 group">
               <Phone className="text-white/30 group-hover:text-white transition-colors" size={18} />
               <span className="text-xs font-light">+55 11 99999-9999</span>
             </div>
             <div className="flex items-center gap-4 group">
               <Mail className="text-white/30 group-hover:text-white transition-colors" size={18} />
               <span className="text-xs font-light">contato@captaimoveis.com.br</span>
             </div>
          </div>
        </div>

        {/* Hours */}
        <div className="md:col-span-4">
          <h4 className="display text-[10px] tracking-[0.4em] opacity-40 mb-8 uppercase">Horário de Atendimento</h4>
          <div className="space-y-4">
             <div className="flex justify-between items-center border-b border-white/5 pb-4">
               <span className="text-xs font-light text-white/50">Segunda a Sexta</span>
               <span className="text-xs font-bold">08:00 — 17:30</span>
             </div>
             <div className="flex justify-between items-center border-b border-white/5 pb-4">
               <span className="text-xs font-light text-white/50">Sábado</span>
               <span className="text-xs font-bold">09:00 — 13:00</span>
             </div>
          </div>
          <div className="mt-8">
             <a href="https://www.instagram.com" className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
               <Camera size={16} /> @captaimoveis
             </a>
          </div>
        </div>

        {/* Quick Links / Map Placeholder */}
        <div className="md:col-span-4">
          <h4 className="display text-[10px] tracking-[0.4em] opacity-40 mb-8 uppercase">Legal & Compliance</h4>
          <ul className="space-y-3 text-[10px] uppercase tracking-widest font-medium">
            <li><a href="#" className="hover:text-gray-400">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-gray-400">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-gray-400">Tratamento de Dados (LGPD)</a></li>
          </ul>
          
          <div className="mt-12 p-6 border border-white/10 bg-white/5 flex flex-col gap-4">
             <div className="text-[9px] uppercase tracking-[0.3em] opacity-40">Área do Cliente</div>
             <p className="text-[11px] font-light text-white/60">Acompanhe seus imóveis, visitas e respostas em tempo real.</p>
             <button className="text-[10px] bg-white text-black py-2 px-4 font-bold tracking-widest hover:bg-gray-300 transition-colors">ENTRAR NO PAINEL</button>
          </div>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] uppercase tracking-widest opacity-20">
          © 2026 Capta Imóveis — Todos os direitos reservados.
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-20">
          Desenvolvido por Antigravity
        </div>
      </div>
    </footer>
  );
}
