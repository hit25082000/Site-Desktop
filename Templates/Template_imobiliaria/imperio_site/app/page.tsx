import React from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MultiStepForm from "@/components/MultiStepForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative bg-[var(--c-bg)]">
      <Preloader />
      <SmoothScroll />
      <Navigation />
      
      <Hero />

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-20 max-w-[1400px] mx-auto border-b border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline">
          <div className="md:col-span-4 text-[10px] uppercase tracking-[0.5em] text-black/30">
            Imóveis e visitas
          </div>
          <div className="md:col-span-8">
             <h2 className="display text-3xl md:text-5xl leading-tight tracking-tighter">
               Uma página de corretor para atrair quem quer <span className="italic text-gray-400">comprar um imóvel</span> e falar no WhatsApp.
             </h2>
             <p className="mt-8 text-lg font-light text-black/60 leading-relaxed max-w-2xl">
               O foco é apresentação dos imóveis, resposta rápida e agendamento de visita com quem já tem intenção real de comprar.
             </p>
          </div>
        </div>
      </section>

      <Services />

      {/* Testimonials / Social Proof */}
      <section className="py-24 px-6 md:px-20 bg-[var(--c-bg)] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
               <div className="text-[10px] uppercase tracking-[0.5em] text-black/30 mb-8">Visitas e interesse</div>
               <h2 className="display text-4xl leading-tight tracking-tighter mb-8">Quem procura imóvel quer resposta rápida e <span className="italic text-gray-400">visita bem agendada</span>.</h2>
            </div>
            <div className="space-y-12">
               {[
                 { 
                   text: "Depois que a página entrou no ar, os contatos passaram a perguntar preço, localização e disponibilidade para visita sem enrolação.",
                   author: "Marina Costa",
                   role: "Interessada em comprar"
                 },
                 { 
                   text: "Eu vi o imóvel, tirei dúvidas no WhatsApp e já saí com a visita marcada para o dia seguinte.",
                   author: "Lucas Almeida",
                   role: "Comprador em busca ativa"
                 }
               ].map((t, i) => (
                 <div key={i} className="border-l border-black/10 pl-8">
                   <p className="text-xl font-light italic text-black/70 mb-4">"{t.text}"</p>
                   <div className="text-[10px] uppercase tracking-widest font-bold">{t.author}</div>
                   <div className="text-[9px] uppercase tracking-[0.3em] opacity-40">{t.role}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Process */}
      <section id="como-funciona" className="py-24 px-6 md:px-20 bg-[var(--c-dark)] text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">03 / Jornada da Visita</div>
          <h2 className="display text-4xl md:text-6xl mb-20 tracking-tighter">Como o <span className="text-gray-500 italic">atendimento</span> funciona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Apresentação", desc: "Os imóveis aparecem com foco visual e chamada objetiva para o interessado." },
              { step: "02", title: "Dúvidas", desc: "O visitante entende localização, faixa de preço e detalhes principais." },
              { step: "03", title: "WhatsApp", desc: "O contato abre direto no WhatsApp para tirar dúvidas sem perder o interesse." },
              { step: "04", title: "Visita", desc: "A conversa termina com a visita marcada e o próximo passo definido." },
            ].map((item, idx) => (
              <div key={idx} className="p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                 <div className="display text-3xl mb-8 text-white/10">{item.step}</div>
                 <h3 className="display text-sm tracking-widest mb-4">{item.title}</h3>
                 <p className="text-xs text-white/40 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MultiStepForm />

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-20 text-center">
        <div className="text-[10px] uppercase tracking-[0.5em] text-black/30 mb-8">Finalização</div>
        <h2 className="display text-5xl md:text-[8vw] tracking-tighter mix-blend-difference mb-12">
          QUERO <br/>VISITAR
        </h2>
        <a 
          href="https://wa.me/5511999999999?text=Olá!%20Tenho%20interesse%20em%20comprar%20um%20imóvel%20e%20quero%20agendar%20uma%20visita."
          className="inline-flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.4em] font-bold border-b-2 border-black pb-4 hover:gap-8 transition-all"
        >
          Falar no WhatsApp Agora <ArrowRight size={20} />
        </a>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
