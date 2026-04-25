---
trigger: manual
---

# Efeitos Cinemáticos
> Transmite: textura orgânica e profundidade sensorial — elimina a frieza digital, tudo parece tátil e vivo.

## Film Grain Overlay (global)
```html
<div id="grainOverlay" class="ds-grain-overlay">
  <div class="ds-grain-inner"></div>
</div>
```
```css
.ds-grain-overlay { position:fixed; inset:-100%; width:300%; height:300%;
  pointer-events:none; z-index:9999; mix-blend-mode:hard-light; opacity:0.05; }
.ds-grain-inner { background-image:url('grain.gif'); background-size:240px;
  width:100%; height:100%; }
.ds-grain--off { display:none; }
```

### Toggle
```js
grainOverlay.classList.toggle('ds-grain--off');
```

## Pulse Animation (status dots)
```css
@keyframes ds-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.ds-status-dot { width:7px; height:7px; border-radius:50%;
  background:var(--token-accent); animation:ds-pulse 2s ease-in-out infinite; }
```

## Accent Bar Top (hero)
`<div style="position:absolute;top:0;left:0;right:0;height:3px;background:var(--token-accent);"></div>`
Barra fina lime no topo — marca registrada visual.
