---
trigger: manual
---

# Horizontal Scroll
> Transmite: descoberta progressiva de dados impactantes — cada card é uma revelação, como virar páginas de resultados.

## Estrutura

```html
<section id="horizontal-results" class="horizontal-scroll-wrapper"> <!-- height:500vh, bg-light -->
  <div class="horizontal-scroll-sticky"> <!-- sticky top:0, height:100vh -->
    <div id="horizontalTrack" class="horizontal-scroll-track">
      <!-- Intro Card -->
      <div class="horizontal-card" style="border:none;background:transparent;">
        <h2 style="font-size:clamp(32px,8vw,90px);font-weight:900;text-transform:uppercase;">
          Resultados<br/>que<br/>importam.
        </h2>
      </div>
      <!-- Stat Cards -->
      <div class="horizontal-card">
        <div class="ds-badge" style="align-self:start;">Label</div>
        <div><h3>83%</h3><p>Descrição do resultado.</p></div>
      </div>
      <!-- Variante dark: background:var(--token-bg-dark); color:white -->
      <!-- Variante accent: background:var(--token-accent) -->
    </div>
  </div>
</section>
```

### CSS
```css
.horizontal-scroll-wrapper { position:relative; height:500vh; background:var(--token-bg-light); }
.horizontal-scroll-track { display:flex; padding:0 10vw; gap:40px; will-change:transform; }
.horizontal-card { flex-shrink:0; width:500px; height:340px; background:var(--token-white);
  padding:40px; border:1px solid var(--token-border); }
.horizontal-card:hover { transform:translateY(-10px) scale(1.02); box-shadow:0 30px 60px rgba(0,0,0,.08); }
.horizontal-card h3 { font-size:48px; font-weight:900; text-transform:uppercase; }
```

### JS
```js
const totalMove = track.scrollWidth - window.innerWidth + 100;
track.style.transform = `translateX(${-progress * totalMove}px)`;
```
