---
trigger: manual
---

# Hover & Micro-Interações
> Transmite: interatividade premium e feedback tátil — a interface responde a cada gesto como matéria viva.

## Footer Link Highlight (background fill)
```html
<a href="#" class="ds-footer-link">Services</a>
```
```css
.ds-footer-link::before { content:''; position:absolute; inset:0; background:var(--token-accent);
  transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(0.16,1,0.3,1); }
.ds-footer-link:hover { color:var(--token-bg-dark); }
.ds-footer-link:hover::before { transform:scaleX(1); }
```

## Split-Text Hover (wave char-by-char)
```html
<span class="ds-split-hover" data-split-hover>CONTACT</span>
```
JS split em `.sh-char`, hover `translateY(-4px)` com delay `i*0.03s`.

## Hover Transforms Padrão

| Efeito | CSS |
|--------|-----|
| Lift | `translateY(-3px) scale(1.03)` + box-shadow glow |
| Scale | `scale(1.06)` |
| Color Fill | bg transparent → accent, color → dark |
| Lift+Rotate | `translateY(-6px) rotate(2deg)` + shadow |

Sempre usar `transition: all .3s--.4s cubic-bezier(0.16,1,0.3,1)`.

## Backdrop Blur (padrão nav/overlay)
```css
backdrop-filter:blur(12px); background:rgba(5,5,5,.5);
```

## Mix-Blend-Mode
`mix-blend-mode:difference;` — texto branco inverte sobre fundos claros/escuros. Usar em logos hero.
