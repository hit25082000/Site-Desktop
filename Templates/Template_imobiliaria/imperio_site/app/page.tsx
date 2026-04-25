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
            Autoridade Técnica
          </div>
          <div className="md:col-span-8">
             <h2 className="display text-3xl md:text-5xl leading-tight tracking-tighter">
               Mais do que crédito, entregamos a <span className="italic text-gray-400">segurança</span> de um processo habitacional livre de burocracia.
             </h2>
             <p className="mt-8 text-lg font-light text-black/60 leading-relaxed max-w-2xl">
               Na Império Consultoria, transformamos a complexidade dos processos bancários em um caminho claro e seguro para a sua conquista. Especialistas em Financiamento, FGTS e Regularização.
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
               <div className="text-[10px] uppercase tracking-[0.5em] text-black/30 mb-8">Prova Social</div>
               <h2 className="display text-4xl leading-tight tracking-tighter mb-8">O que dizem as famílias que <span className="italic text-gray-400">confiaram</span> no Império.</h2>
            </div>
            <div className="space-y-12">
               {[
                 { 
                   text: "A equipe do Império resolveu meu financiamento que estava travado há 3 meses em outro banco. Em 15 dias meu crédito estava aprovado na Caixa.",
                   author: "Marcos Oliveira",
                   role: "Proprietário Residencial"
                 },
                 { 
                   text: "Todo mundo dizia que eu não conseguiria usar meu FGTS daquela forma. A consultoria técnica deles me mostrou o caminho legal e hoje estou na minha casa.",
                   author: "Ana Julia Silva",
                   role: "Primeiro Imóvel"
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
          <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 mb-8">03 / Metodologia Império</div>
          <h2 className="display text-4xl md:text-6xl mb-20 tracking-tighter">Nosso <span className="text-gray-500 italic">Processo</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Triagem Técnica", desc: "Análise preliminar de documentos e perfil de crédito." },
              { step: "02", title: "Montagem do Processo", desc: "Estruturação completa seguindo as exigências bancárias." },
              { step: "03", title: "Aprovação & Laudo", desc: "Gestão da avaliação do imóvel e aprovação final." },
              { step: "04", title: "Assinatura", desc: "Acompanhamento no ato da assinatura da escritura pública." },
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
          VAMOS <br/>CONVERSAR?
        </h2>
        <a 
          href="tel:+556730450333"
          className="inline-flex items-center gap-4 text-xs md:text-sm uppercase tracking-[0.4em] font-bold border-b-2 border-black pb-4 hover:gap-8 transition-all"
        >
          Agendar Consultoria Presencial <ArrowRight size={20} />
        </a>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
