import re
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Overflow clip
content = content.replace('overflow-x: hidden !important', 'overflow-x: clip !important')
content = content.replace('overflow-x-hidden', 'overflow-x-clip')

# 2. Header relative
content = content.replace('class="sticky top-0 z-[100] w-full', 'class="relative z-[100] w-full')

# 3. Remove nav link
nav_link = '''        <a href="#bon-scroll-montagem" class="inline-flex items-center gap-2 hover:text-[#0b1d3f] transition-colors">
          <iconify-icon icon="solar:layers-minimalistic-linear" width="18" class="text-[#f37021]/90 shrink-0"></iconify-icon>
          Montagem
        </a>'''
content = content.replace(nav_link, '')

# 4. Hero video src
content = content.replace('id="hero-video"\n            src="download.mp4"', 'id="hero-video"\n            src="video_scroll.mp4"')

# 5. Hero gradient
old_grad = 'bg-gradient-to-r from-[#0b1d3f]/95 via-[#0b1d3f]/65 to-[#0b1d3f]/20 md:via-[#0b1d3f]/45 md:to-transparent'
new_grad = 'bg-gradient-to-r from-[#0b1d3f]/95 via-[#0b1d3f]/60 via-25% to-transparent to-50%'
content = content.replace(old_grad, new_grad)

# 6. Remove montagem section
# We use regex to find and remove the section.
montagem_pattern = re.compile(r'    <!-- Montagem: vídeo no scroll \+ Bonzinho -->\s*<section.*?id="bon-scroll-montagem".*?</section>\s*', re.DOTALL)
content = montagem_pattern.sub('\n', content)

# 7. Add keyframes to style
style_pattern = re.compile(r'(<style data-scroll-fix="true">.*?)(\s*</style>)', re.DOTALL)
keyframes = '''
    @keyframes scroll-carousel {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }'''
content = style_pattern.sub(r'\1' + keyframes + r'\2', content)

# 8. Replace grid with carousel
grid_pattern = re.compile(r'<div class="bon-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" data-bon-reveal>.*?</div>\s*</div>\s*</section>', re.DOTALL)
carousel_html = '''<div class="relative w-full overflow-hidden group bon-reveal" data-bon-reveal>
          <div class="absolute top-0 bottom-0 left-0 w-8 md:w-24 bg-gradient-to-r from-[#E6E3D6] to-transparent z-10 pointer-events-none"></div>
          <div class="absolute top-0 bottom-0 right-0 w-8 md:w-24 bg-gradient-to-l from-[#E6E3D6] to-transparent z-10 pointer-events-none"></div>
          
          <div class="flex w-max animate-[scroll-carousel_40s_linear_infinite] group-hover:[animation-play-state:paused] py-4">
            <div class="flex gap-6 pr-6">
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Troca de óleo / filtros')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_oleo_1777897675492.png" alt="Troca de óleo" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:bottle-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-12 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Troca de óleo</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Lubrificantes e filtros compatíveis com a especificação do fabricante.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Manutenção / revisão')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_manutencao_1777897688385.png" alt="Manutenção" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:clipboard-check-linear" width="28" class="transition-transform duration-300 group-hover/item:-rotate-6 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Manutenção</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Revisões programadas, fluidos, correias e itens de desgaste com checklist.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Embreagem')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_embreagem_1777897712660.png" alt="Embreagem" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:transmission-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-6 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Embreagem</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Diagnóstico de patinação, ruídos e trepidação; troca com alinhamento correto.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Suspensão')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_suspensao_1777897727734.png" alt="Suspensão" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:wheel-angle-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-90 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Suspensão</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Amortecedores, batentes, pivôs e geometria para dirigibilidade estável.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Freio motor')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_freio_1777897754126.png" alt="Freio motor" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:vinyl-record-linear" width="28" class="transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-180"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Freio motor</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Sistemas exaustivo/auxiliar em veículos pesados: ajuste, vácuo e segurança.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Câmbio')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_cambio_1777897769366.png" alt="Câmbio" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:settings-minimalistic-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-45 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Câmbio</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Automático ou manual: vazamentos, embreagem dupla, trocas de fluido e revisão.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Socorrista')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_socorrista_1777897784788.png" alt="Socorrista" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:siren-rounded-linear" width="28" class="transition-transform duration-300 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Socorrista</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Atendimento para emergências e encaminhamento para oficina quando necessário.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Mecânica geral / outro')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_geral_1777897799885.png" alt="Mecânica geral" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:wrench-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-12 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Mecânica geral</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Motor, arrefecimento, elétrica e demais sistemas com diagnóstico organizado.</p>
                </div>
              </article>
            </div>
            <!-- DUPLICATED FOR INFINITE SCROLL -->
            <div class="flex gap-6 pr-6" aria-hidden="true">
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Troca de óleo / filtros')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_oleo_1777897675492.png" alt="Troca de óleo" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:bottle-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-12 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Troca de óleo</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Lubrificantes e filtros compatíveis com a especificação do fabricante.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Manutenção / revisão')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_manutencao_1777897688385.png" alt="Manutenção" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:clipboard-check-linear" width="28" class="transition-transform duration-300 group-hover/item:-rotate-6 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Manutenção</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Revisões programadas, fluidos, correias e itens de desgaste com checklist.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Embreagem')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_embreagem_1777897712660.png" alt="Embreagem" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:transmission-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-6 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Embreagem</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Diagnóstico de patinação, ruídos e trepidação; troca com alinhamento correto.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Suspensão')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_suspensao_1777897727734.png" alt="Suspensão" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:wheel-angle-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-90 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Suspensão</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Amortecedores, batentes, pivôs e geometria para dirigibilidade estável.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Freio motor')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_freio_1777897754126.png" alt="Freio motor" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:vinyl-record-linear" width="28" class="transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-180"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Freio motor</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Sistemas exaustivo/auxiliar em veículos pesados: ajuste, vácuo e segurança.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Câmbio')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_cambio_1777897769366.png" alt="Câmbio" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:settings-minimalistic-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-45 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Câmbio</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Automático ou manual: vazamentos, embreagem dupla, trocas de fluido e revisão.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Socorrista')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_socorrista_1777897784788.png" alt="Socorrista" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:siren-rounded-linear" width="28" class="transition-transform duration-300 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Socorrista</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Atendimento para emergências e encaminhamento para oficina quando necessário.</p>
                </div>
              </article>
              <article class="relative flex-none w-[85vw] sm:w-[45vw] lg:w-[380px] bg-white rounded-2xl border border-stone-200 shadow-sm hover:border-[#f37021]/40 hover:shadow-md transition-all duration-300 group/item overflow-hidden cursor-pointer" onclick="selectQuizService('Mecânica geral / outro')">
                <div class="h-48 overflow-hidden">
                  <img src="assets/service_geral_1777897799885.png" alt="Mecânica geral" class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" />
                </div>
                <div class="p-6 relative bg-white">
                  <div class="absolute -top-8 right-6 w-14 h-14 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#0b1d3f] shadow-sm border border-stone-100 group-hover/item:text-[#f37021] group-hover/item:bg-[#f37021]/10 transition-colors z-10">
                    <iconify-icon icon="solar:wrench-linear" width="28" class="transition-transform duration-300 group-hover/item:rotate-12 group-hover/item:scale-110"></iconify-icon>
                  </div>
                  <h3 class="text-xl font-newsreader font-medium text-[#0b1d3f] mb-2 mt-2">Mecânica geral</h3>
                  <p class="text-stone-600 text-sm leading-relaxed">Motor, arrefecimento, elétrica e demais sistemas com diagnóstico organizado.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
</section>'''
content = grid_pattern.sub(carousel_html, content)

# 9. Inject selectQuizService
quiz_replace = '''      window.selectQuizService = function (val) {
        state.answers['servico'] = val;
        state.index = 1;
        elResult.classList.add('hidden');
        elCard.classList.remove('hidden');
        render();
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      render();'''
content = content.replace('      render();\n    })();\n  </script>\n  <script>\n    (function () {', quiz_replace + '\n    })();\n  </script>\n  <script>\n    (function () {')

# 10. Replace video script with lerp logic
old_script = '''      var progress = 0;
      var pending = false;
      var scrollBound = false;

      function snapEnd() {
        var d = video.duration;
        if (!d || !isFinite(d)) return;
        try {
          video.currentTime = d;
        } catch (e) {}
      }

      function apply() {
        pending = false;
        if (mq.matches || !metaReady) return;
        var d = video.duration;
        if (!d || !isFinite(d)) return;
        var t = clamp(progress, 0, 1) * d;
        if (Math.abs(video.currentTime - t) < EPS) return;
        try {
          video.currentTime = t;
        } catch (e) {}
      }

      function schedule() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () {
          pending = false;
          apply();
        });
      }

      function update() {
        if (mq.matches || !metaReady) return;
        var rect = section.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var sectionTop = scrollY + rect.top;
        var sectionH = section.offsetHeight;
        var vh = window.innerHeight;
        var denom = Math.max(1, sectionH - vh);
        progress = clamp((scrollY - sectionTop) / denom, 0, 1);
        schedule();
      }'''

new_script = '''      var targetProgress = 0;
      var currentProgress = 0;
      var loopRunning = false;
      var scrollBound = false;

      function snapEnd() {
        var d = video.duration;
        if (!d || !isFinite(d)) return;
        try {
          video.currentTime = d;
        } catch (e) {}
      }

      function loop() {
        if (mq.matches || !metaReady) {
          loopRunning = false;
          return;
        }
        
        var diff = targetProgress - currentProgress;
        
        if (Math.abs(diff) < 0.0005) {
          currentProgress = targetProgress;
          loopRunning = false;
        } else {
          currentProgress += diff * 0.08;
          requestAnimationFrame(loop);
        }

        var d = video.duration;
        if (d && isFinite(d)) {
          var t = clamp(currentProgress, 0, 1) * d;
          if (Math.abs(video.currentTime - t) > 0.001) {
            try { video.currentTime = t; } catch (e) {}
          }
        }
      }

      function update() {
        if (mq.matches || !metaReady) return;
        var rect = section.getBoundingClientRect();
        var scrollY = window.scrollY || window.pageYOffset;
        var sectionTop = scrollY + rect.top;
        var sectionH = section.offsetHeight;
        var vh = window.innerHeight;
        var denom = Math.max(1, sectionH - vh);
        targetProgress = clamp((scrollY - sectionTop) / denom, 0, 1);
        
        if (!loopRunning) {
          loopRunning = true;
          requestAnimationFrame(loop);
        }
      }'''
content = content.replace(old_script, new_script)
content = content.replace('      var EPS = 0.03;\n', '')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement successful")
