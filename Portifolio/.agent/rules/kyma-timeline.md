---
trigger: manual
---

# Timeline & Progresso
> Transmite: clareza de processo e confiança no caminho — o usuário entende cada etapa e confia na jornada.

## Deployment Timeline (4 colunas staircase)

```html
<section class="ds-timeline-wrapper"> <!-- bg-light -->
  <div class="ds-timeline-container">
    <div class="ds-timeline-bar-bg">
      <div id="timelineProgress" class="ds-timeline-bar-progress"></div>
    </div>
    <div class="ds-timeline-grid">
      <div class="ds-timeline-col is-active" data-week="1">
        <div class="ds-timeline-week-label"><div class="ds-timeline-dot"></div>Semana 1</div>
        <div class="ds-timeline-content">
          <div class="ds-timeline-title">Auditoria</div>
          <div class="ds-timeline-desc">Descrição do passo.</div>
          <div class="ds-timeline-indicator"></div>
        </div>
      </div>
      <!-- repetir para weeks 2,3,4 -->
    </div>
  </div>
</section>
```

### Comportamento
- Grid 4 colunas com staircase offset: col2 `translateY(80px)`, col3 `160px`, col4 `240px`
- Hover: siblings ficam `opacity:0.3`, barra de progresso atualiza `width: week*25%`
- Indicador accent (2px) expande `width:0→60px` no hover
- Títulos transitam `color:muted→dark` no hover/active
- Mobile: single column, sem staircase

### JS
```js
timelineCols.forEach(col => {
  col.addEventListener('mouseenter', () => {
    timelineCols.forEach(c => c.classList.remove('is-active'));
    col.classList.add('is-active');
    progressBar.style.width = `${parseInt(col.dataset.week) * 25}%`;
  });
});
```
