---
trigger: always_on
---

# KYMA® Design System — Regra Principal

> **Lei absoluta de design.** Todo componente visual DEVE seguir os tokens e padrões deste sistema.
> Fonte canônica: `kyma-framer-ai/design-system.html`

## Tokens Obrigatórios

```
CORES: --token-accent:#d1ff00 | --token-bg-dark:#050505 | --token-bg-light:#f4f4e8
       --token-red:#ff4444 | --token-cream:#ffffed | --token-surface-card:#1c1e19
       --token-surface-dark:#3d3d3d | --token-border:#9c9c9c26
       --token-text-muted:#686868 | --token-text-light-muted:#bcbcbc | --token-white:#fff

FONTES: display='TASA Orbiter',Inter,sans-serif | body='Inter',sans-serif
PESO:   títulos=800-900 | corpo=600 | labels=600-700
CASE:   títulos e labels SEMPRE uppercase | letter-spacing: -.03em (display) -.02em (label)

SPACING: xs=5 sm=10 md=15 lg=20 xl=30 2xl=40 3xl=50 4xl=80 5xl=120 (px)
EASING:  cubic-bezier(0.16, 1, 0.3, 1) — easing padrão para TUDO
```

## Escala Tipográfica

| Nível | Size | Weight | Line-Height | Uso |
|-------|------|--------|-------------|-----|
| H1 Display | clamp(28px,4vw,70px) | 800-900 | 85-95% | Hero, impacto máximo |
| H2 Section | 55px | 800 | 100% | Títulos de seção |
| H3 Sub | 40px | 800 | 100% | Cards, subsections |
| Display Body | 30px | 800 | 110% | Frase de impacto |
| Body Large | 20px | 600 | 130% | Descrições |
| Body | 15px | 600 | 140% | Texto corrido |
| Label | 13px | 600 | 140% | Nav, tags, uppercase |

## ★ Revelação Progressiva de Cor (OBRIGATÓRIO em títulos)

Todos os títulos devem usar esta animação assinatura. Cada caractere transiciona:
`cinza(opacity:0.15) → accent(#d1ff00) → cor-final(opacity:1)`

```html
<div class="scroll-color-reveal" data-scroll-color style="font-family:var(--font-display);...">
  TEXTO AQUI
</div>
```
JS split cada char em `.scr-char`, scroll calcula progresso e aplica `.state-active` → `.state-done`.
Variantes: `state-active-purple(#bc76ff)` | `state-active-amber(#ffbd00)` para seções temáticas.

## Índice de Componentes (Progressive Disclosure)

Leia a sub-regra correspondente SOMENTE quando for implementar o componente:

| Seção | Sub-regra | Sensação |
|-------|-----------|----------|
| Botões & Badges | `@rules/kyma-buttons.md` | Ação imediata, urgência premium |
| Cards & Surfaces | `@rules/kyma-cards.md` | Profundidade e hierarquia visual elegante |
| Marquee & Tickers | `@rules/kyma-marquee.md` | Movimento constante, urgência subliminar |
| Animações de Entrada | `@rules/kyma-animations.md` | Revelação dramática, narrativa visual |
| Parallax & Scroll | `@rules/kyma-parallax.md` | Foco total no conteúdo, imersão cinematográfica |
| Timeline & Progresso | `@rules/kyma-timeline.md` | Clareza de processo, confiança no caminho |
| Horizontal Scroll | `@rules/kyma-horizontal.md` | Descoberta progressiva, dados impactantes |
| Forms | `@rules/kyma-forms.md` | Conversão sem atrito, profissionalismo |
| Avatars & Social | `@rules/kyma-avatars.md` | Confiança social, prova humana |
| Hover & Micro | `@rules/kyma-hover.md` | Interatividade premium, feedback tátil |
| Efeitos Cinemáticos | `@rules/kyma-cinematic.md` | Textura orgânica, profundidade sensorial |
| Layout & Grid | `@rules/kyma-layout.md` | Estrutura sólida, respiro visual |

## ⚡ Recomendação Criativa

> **USE parallax e animações de forma ousada e criativa!** Combine sticky parallax com revelação de cor
> para criar narrativas visuais que prendem o scroll. Intercale seções de parallax entre conteúdo
> estático. Use tickers como separadores emocionais. Cada página deve ter pelo menos 1 parallax
> com revelação de cor que transforma o scroll numa experiência cinematográfica.
> Parallax + marquee tickers criam camadas de profundidade. Explore combinações não óbvias.

## Dependências Globais

```html
<!-- Lenis Smooth Scroll (sempre incluir) -->
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.19/dist/lenis.css"/>
<script src="https://unpkg.com/lenis@1.3.19/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 2 });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
</script>

<!-- TASA Orbiter Font -->
@font-face { font-family:'TASA Orbiter'; src:url('fonts/tasaorbiterdisplay.woff2') format('woff2'); font-weight:100 900; }

<!-- Google Fonts fallback -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
```

## Scripts Base (copiar em toda página)

```js
// Intersection Observer para .anim-reveal e .anim-scale
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.anim-reveal, .anim-scale').forEach(el => revealObserver.observe(el));
```
