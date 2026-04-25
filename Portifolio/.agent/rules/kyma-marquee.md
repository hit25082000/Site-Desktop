---
trigger: manual
---

# Marquee & Tickers
> Transmite: movimento constante e urgência subliminar — cria sensação de dados fluindo, escassez de tempo.

## Marquee V2 (JS-driven seamless)

```html
<div class="ds-marquee-v2" style="background:var(--token-bg-dark);padding:12px 0;">
  <div class="ds-marquee-v2-track" data-marquee>
    <span class="ds-marquee-item">TEXTO 1</span>
    <span class="ds-marquee-item">TEXTO 2</span>
    <!-- JS clona 4x automaticamente -->
  </div>
</div>
```

Modificadores na track: `reverse` (direção invertida) | `fast` (15s ao invés de 25s)

```css
.ds-marquee-v2-track.running { animation: ds-marquee-v2 25s linear infinite; }
.ds-marquee-v2-track.reverse.running { animation-direction:reverse; }
.ds-marquee-v2-track.fast.running { animation-duration:15s; }
@keyframes ds-marquee-v2 { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
```

### Item com dot accent
```css
.ds-marquee-item::before {
  content:''; width:7px; height:7px; border-radius:50%;
  background:var(--token-accent); flex-shrink:0;
}
```

## Ticker Pills (para parallax caos)
```html
<div class="ticker-item red">BACKLOG DE SUPORTE</div>
<div class="ticker-item accent">PERDA DE ROI</div>
```
```css
.ticker-item { background:rgba(10,10,10,0.85); backdrop-filter:blur(4px);
  border-radius:99px; padding:6px 16px; font-size:11px; font-weight:700; }
.ticker-item.red { background:rgba(255,68,68,0.15); color:var(--token-red); }
.ticker-item.accent { background:rgba(255,68,68,0.2); color:var(--token-red); }
```

### JS init
```js
document.querySelectorAll('[data-marquee]').forEach(track => {
  const c = track.innerHTML;
  track.innerHTML = c+c+c+c;
  requestAnimationFrame(() => track.classList.add('running'));
});
```
