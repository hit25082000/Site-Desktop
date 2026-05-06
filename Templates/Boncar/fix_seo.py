import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. SEO Head
seo_injection = '''  <link rel="canonical" href="https://www.boncar.com.br" />
  <meta property="og:title" content="Boncar — Oficina mecânica | Seu carro em boas mãos" />
  <meta property="og:description" content="Boncar: mecânica geral, troca de óleo, embreagem, suspensão, freio motor, câmbio e socorro. Agende pelo WhatsApp." />
  <meta property="og:image" content="https://www.boncar.com.br/assets/logo.png" />
  <meta property="og:url" content="https://www.boncar.com.br" />
  <meta property="og:type" content="website" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Boncar Oficina Mecânica",
    "image": "https://www.boncar.com.br/assets/logo.png",
    "telephone": "+5567992000561",
    "url": "https://www.boncar.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Temprano, 1",
      "addressLocality": "Campo Grande",
      "addressRegion": "MS",
      "postalCode": "79041-370",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -20.4846433,
      "longitude": -54.6186981
    },
    "priceRange": "",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://wa.me/5567992000561"
    ]
  }
  </script>
</head>'''
content = content.replace('</head>', seo_injection)

# 2. Main End -> FAQ and Map
main_end_injection = '''    <!-- FAQ Section -->
    <section id="faq" class="ds-section w-full py-24 px-6 md:px-12 bg-white">
      <div class="max-w-4xl mx-auto bon-reveal" data-bon-reveal>
        <p class="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500 mb-3 text-center">Dúvidas Frequentes</p>
        <h2 class="text-4xl md:text-5xl font-newsreader font-light text-[#0b1d3f] mb-12 text-center leading-[1.05]">
          Tudo o que você precisa saber
        </h2>
        
        <div class="space-y-4">
          <details class="group border border-stone-200 rounded-2xl bg-stone-50 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between gap-4 p-6 font-medium text-[#0b1d3f] cursor-pointer hover:text-[#f37021] transition-colors">
              <span>Vocês oferecem garantia nos serviços realizados?</span>
              <span class="transition-transform group-open:rotate-180">
                <iconify-icon icon="solar:alt-arrow-down-linear" width="24"></iconify-icon>
              </span>
            </summary>
            <div class="px-6 pb-6 text-stone-600 text-sm leading-relaxed">
              Sim, todos os nossos serviços possuem garantia legal conforme as normas do Código de Defesa do Consumidor, variando de acordo com a peça e o sistema (geralmente de 90 dias a 1 ano). Utilizamos apenas peças de alta qualidade e com procedência comprovada.
            </div>
          </details>
          <details class="group border border-stone-200 rounded-2xl bg-stone-50 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between gap-4 p-6 font-medium text-[#0b1d3f] cursor-pointer hover:text-[#f37021] transition-colors">
              <span>Posso agendar uma revisão diretamente pelo WhatsApp?</span>
              <span class="transition-transform group-open:rotate-180">
                <iconify-icon icon="solar:alt-arrow-down-linear" width="24"></iconify-icon>
              </span>
            </summary>
            <div class="px-6 pb-6 text-stone-600 text-sm leading-relaxed">
              Com certeza! Nosso atendimento no WhatsApp é focado em agilizar seu dia. Você pode usar a qualificação rápida aqui no site ou mandar uma mensagem direta para marcarmos o melhor horário para sua visita à oficina.
            </div>
          </details>
          <details class="group border border-stone-200 rounded-2xl bg-stone-50 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between gap-4 p-6 font-medium text-[#0b1d3f] cursor-pointer hover:text-[#f37021] transition-colors">
              <span>A oficina conta com serviço de socorrista/guincho?</span>
              <span class="transition-transform group-open:rotate-180">
                <iconify-icon icon="solar:alt-arrow-down-linear" width="24"></iconify-icon>
              </span>
            </summary>
            <div class="px-6 pb-6 text-stone-600 text-sm leading-relaxed">
              Temos suporte para atendimento a emergências. Caso o seu veículo não possa rodar com segurança, acionamos nossos parceiros socorristas para buscar seu carro com total cuidado e segurança.
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- Map & Address Section -->
    <section id="localizacao" class="w-full h-[500px] md:h-[600px] relative border-t border-stone-200">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.525992928172!2d-54.6186981!3d-20.4846433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e66e927bb2cd%3A0xc66518a4a51130d2!2sR.%20Temprano%2C%201%20-%20Tiradentes%2C%20Campo%20Grande%20-%20MS%2C%2079041-370!5e0!3m2!1spt-BR!2sbr!4v1714800000000!5m2!1spt-BR!2sbr" class="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      
      <div class="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-[90%] md:max-w-sm w-full bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-stone-200/50 bon-reveal" data-bon-reveal>
        <div class="w-12 h-12 rounded-xl bg-[#0b1d3f]/10 flex items-center justify-center text-[#0b1d3f] mb-4">
          <iconify-icon icon="solar:map-point-linear" width="24"></iconify-icon>
        </div>
        <h3 class="text-xl md:text-2xl font-newsreader font-medium text-[#0b1d3f] mb-2">Onde estamos</h3>
        <p class="text-stone-600 text-sm md:text-base leading-relaxed mb-5">
          Rua Temprano, 1<br>
          Campo Grande — MS<br>
          <span class="text-xs text-stone-400 mt-1 block">CEP 79041-370</span>
        </p>
        <a href="https://maps.google.com/?q=Rua+Temprano+1+Campo+Grande+MS" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-[#f37021] hover:text-[#e06518] transition-colors group">
          Traçar rota
          <iconify-icon icon="solar:arrow-right-linear" width="18" class="transition-transform group-hover:translate-x-1"></iconify-icon>
        </a>
      </div>
    </section>
  </main>'''
content = content.replace('</main>', main_end_injection)

# 3. Floating Buttons & Accelerator script
floating_injection = '''  <!-- Floating Actions -->
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
    <!-- Accelerator -->
    <button id="scroll-accelerator" class="w-12 h-12 rounded-full bg-stone-900/60 backdrop-blur border border-white/10 text-white flex items-center justify-center hover:bg-[#f37021] hover:scale-110 transition-all shadow-lg" aria-label="Rolar para baixo">
      <iconify-icon icon="solar:double-alt-arrow-down-linear" width="24" class="animate-bounce"></iconify-icon>
    </button>
    <!-- WhatsApp -->
    <a href="https://wa.me/5567992000561?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Boncar." target="_blank" rel="noopener noreferrer" class="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1EBE5D] hover:scale-110 transition-transform shadow-xl" aria-label="Falar no WhatsApp">
      <iconify-icon icon="simple-icons:whatsapp" width="28"></iconify-icon>
    </a>
  </div>

  <script>
    document.getElementById("scroll-accelerator").addEventListener("click", function() {
      // Scroll down by 80% of window height
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    });
  </script>
</body>'''
content = content.replace('</body>', floating_injection)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updates applied successfully.")
