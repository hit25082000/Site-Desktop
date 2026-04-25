---
trigger: manual
---

# Botões & Badges
> Transmite: ação imediata, urgência premium — o usuário sente que precisa clicar agora.

## Botões
Variantes: `--primary`(dark bg) | `--accent`(lime) | `--outline`(transparente) | `--pill`(border-radius:999px)

```html
<button class="ds-btn ds-btn--accent ds-btn--pill ds-btn-glow">Start Now →</button>
```

```css
.ds-btn {
  display:inline-flex; align-items:center; gap:8px;
  font-family:var(--font-display); font-size:14px; font-weight:700;
  text-transform:uppercase; letter-spacing:-.02em;
  padding:10px 20px; border:none; cursor:pointer;
  transition:transform .2s, box-shadow .2s;
}
.ds-btn:hover { transform:translateY(-2px); }
.ds-btn--primary { background:var(--token-bg-dark); color:var(--token-white); }
.ds-btn--accent  { background:var(--token-accent); color:var(--token-bg-dark); }
.ds-btn--outline  { background:transparent; color:var(--token-white); border:1px solid var(--token-border); }
.ds-btn--pill { border-radius:999px; }
```

### CTA Glow (para CTAs primários)
Adiciona aura luminosa no hover:
```css
.ds-btn-glow::after {
  content:''; position:absolute; inset:-3px; border-radius:inherit;
  background:var(--token-accent); opacity:0; filter:blur(12px); z-index:-1;
  transition:opacity .4s ease;
}
.ds-btn-glow:hover::after { opacity:0.35; }
```

### Submit (forms)
Full-width com barra accent que desliza no hover:
```css
.ds-btn--submit {
  width:100%; height:56px; background:var(--token-surface-card);
  color:var(--token-white); font-family:var(--font-display);
  font-size:14px; font-weight:800; text-transform:uppercase;
}
.ds-btn--submit::after { /* barra accent na base, scaleX(0→1) no hover */ }
```

## Badges
```html
<span class="ds-badge"><span class="ds-badge-dot"></span> Available Now</span>
```
Variante accent: `background:var(--token-accent); color:var(--token-bg-dark);`
