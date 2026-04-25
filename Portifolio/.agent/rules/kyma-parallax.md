---
trigger: manual
---

# Parallax & Sticky Scroll
> Transmite: foco total no conteúdo central — faz o usuário parar de scrollar e absorver a mensagem, muito poderoso para narrativas transformadoras.

## Parallax Simples (frase com revelação de cor)
```html
<section id="meu-parallax" class="parallax-short-wrapper"> <!-- height:400vh -->
  <div class="parallax-timeline-sticky"> <!-- sticky top:0, height:100vh -->
    <div class="parallax-timeline-content">
      <h2 id="meuTexto" class="timeline-text-main" style="color:var(--token-white);">
        FRASE<br/>IMPACTANTE.
      </h2>
    </div>
  </div>
</section>
```

### CSS essencial
```css
.parallax-short-wrapper { position:relative; height:400vh; overflow:visible; }
.parallax-timeline-sticky { position:sticky; top:0; height:100vh; display:flex;
  align-items:center; justify-content:center; overflow:hidden; }
.timeline-text-main { font-family:var(--font-display); font-size:clamp(32px,6vw,85px);
  font-weight:900; text-transform:uppercase; letter-spacing:-.04em; line-height:.9;
  text-align:center; max-width:1200px; }
```

### JS (revelação de cor por scroll)
```js
setupSimpleParallax('meu-parallax', 'meuTexto', 'state-active');
// Reutilizar a função genérica: split chars em .scroll-color-char,
// scroll progress aplica state-active → state-done
```
Variantes de cor: `state-active`(red) | `state-active-purple`(#bc76ff) | `state-active-amber`(#ffbd00)

## Parallax Avançado (multi-fase com tickers)
Altura: `1200vh`. Fases orquestradas por scroll progress (0→1):

| Fase | Progress | Conteúdo |
|------|----------|----------|
| 1: Headline | 0–0.25 | Revelação de cor char-by-char |
| 2: Caos | 0.25–0.45 | Tickers aparecem, bg escurece |
| 3: Solução | 0.45–0.75 | "IA Elimina Todos", bg dark |
| 4: Humano | 0.75–0.92 | "Humanos fazem trabalho humano", bg light |
| 5: IA | 0.92–1.0 | "IA faz todo o resto", bg light |

Tickers posicionados em `.row-pos-1`(top:12%) até `.row-pos-12`(bottom:12%), aparecem staggered.
Background overlay transiciona opacity 0→1→0 entre fases.

> ⚡ DICA CRIATIVA: Use parallax para contar uma história de transformação. O scroll vira uma
> jornada emocional do problema → caos → solução → clareza. Combine com tickers para amplificar tensão.
