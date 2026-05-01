"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

const steps = [
  {
    id: "scenário",
    question: "O que você procura?",
    options: ["Comprar um imóvel", "Agendar uma visita", "Ver outras opções", "Falar com corretor"],
  },
  {
    id: "income",
    question: "Qual faixa de investimento faz sentido para você?",
    options: ["Até R$ 3.000", "R$ 3.000 a R$ 6.000", "R$ 6.000 a R$ 10.000", "Acima de R$ 10.000"],
  },
  {
    id: "fgts",
    question: "Você já escolheu um bairro ou região?",
    options: ["Sim", "Não"],
  },
  {
    id: "property_value",
    question: "Qual tipo de imóvel você procura?",
    options: ["Até R$ 200 mil", "R$ 200 mil a R$ 400 mil", "R$ 400 mil a R$ 700 mil", "Acima de R$ 700 mil"],
  },
  {
    id: "contact",
    question: "Para quem enviamos as opções e a visita?",
    isFinal: true,
  },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleOptionSelect = (option: string) => {
    setFormData({ ...formData, [steps[currentStep].id]: option });
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mocking API call/Webhook
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 2000);
  };

  return (
    <section id="triagem" className="py-24 px-6 md:px-20 bg-[var(--c-dark)] text-white">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.5em] text-white/50 mb-4">01 / Interesse e Visita</div>
          <h2 className="display text-4xl md:text-5xl tracking-tighter">Encontre o <span className="text-gray-500 italic">imóvel certo</span></h2>
          <p className="mt-4 text-white/40 font-light max-w-lg">Responda 4 perguntas rápidas para receber as opções mais aderentes e seguir para o WhatsApp.</p>
        </div>

        <div className="bg-[#1a1a1a] p-8 md:p-12 border border-white/5 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <div className="text-xs uppercase tracking-widest text-white/30 mb-8">Passo {currentStep + 1} de {steps.length}</div>
                <h3 className="text-2xl md:text-3xl font-light mb-10">{steps[currentStep].question}</h3>

                {!steps[currentStep].isFinal ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps[currentStep].options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={`text-left p-5 border transition-all duration-300 ${
                          formData[steps[currentStep].id] === option
                            ? "border-white bg-white text-black"
                            : "border-white/10 hover:border-white/30 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex justify-between items-center text-sm uppercase tracking-widest font-medium">
                          {option}
                          {formData[steps[currentStep].id] === option && <Check size={16} />}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] opacity-40">Nome Completo</label>
                        <input required className="w-full bg-transparent border-b border-white/20 pb-4 focus:border-white outline-none transition-colors" type="text" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] opacity-40">WhatsApp / Telefone</label>
                        <input required className="w-full bg-transparent border-b border-white/20 pb-4 focus:border-white outline-none transition-colors" type="tel" />
                      </div>
                    </div>
                    <button
                      disabled={isSubmitting}
                      className="w-full mt-10 py-6 bg-white text-black display text-[10px] tracking-widest hover:bg-[#E3E1DC] transition-colors flex justify-center items-center gap-4"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "RECEBER OPÇÕES"}
                    </button>
                    <p className="text-[9px] text-white/30 uppercase tracking-widest text-center mt-4">
                      Ao enviar, você concorda com nossos termos de privacidade (LGPD).
                    </p>
                  </form>
                )}

                <div className="mt-12 flex gap-4">
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest"
                    >
                      <ChevronLeft size={14} /> Voltar
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check size={40} className="text-black" />
                </div>
                <h3 className="display text-3xl mb-4">SOLICITAÇÃO ENVIADA</h3>
                <p className="text-white/50 font-light max-w-sm mx-auto">
                  Um corretor entrará em contato via WhatsApp nas próximas 24h com opções de imóvel e visita.
                </p>
                <button
                   onClick={() => setIsDone(false)}
                   className="mt-10 text-[10px] uppercase tracking-widest border-b border-white/20 pb-2 text-white/40 hover:text-white transition-colors"
                >
                  Fazer nova simulação
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
