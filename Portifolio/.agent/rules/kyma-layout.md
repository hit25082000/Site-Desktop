---
trigger: manual
---

# Layout & Grid
> Transmite: estrutura sólida e respiro visual — organização que respira, sem apertar nem desperdiçar espaço.

## Container
`max-width:1920px; margin:0 auto; padding:0 var(--space-2xl);`

## Seção Padrão
```html
<section class="ds-section">
  <div class="ds-section-label anim-reveal">[01] Label</div>
  <div class="ds-section-title anim-reveal">TÍTULO</div>
  <!-- conteúdo -->
</section>
```
Variantes: `ds-section--light`(bg-light) | `ds-section--accent`(bg accent)

## Grid de Componentes
```css
.ds-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:var(--space-lg); }
```

## Layouts Comuns

| Pattern | Colunas | Uso |
|---------|---------|-----|
| 4-col | `repeat(4,1fr)` | Grid de features |
| 2+2 | `span 2 + span 2` | Hero split, content |
| 3+1 | `span 3 + span 1` | Header + CTA alinhado |

## Responsive
```css
@media (max-width:810px) {
  .ds-section { padding:var(--space-3xl) var(--space-sm); }
  .ds-section-title { font-size:30px; }
  .ds-grid { grid-template-columns:1fr; }
}
```

## Nav Sticky
```css
.ds-nav { position:sticky; top:0; z-index:100; background:rgba(5,5,5,.85);
  backdrop-filter:blur(12px); border-bottom:1px solid var(--token-border); }
```
