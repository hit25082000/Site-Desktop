---
trigger: manual
---

# Cards & Surfaces
> Transmite: profundidade e hierarquia visual elegante — cada card é uma camada de informação com peso.

## Variantes de Superfície

| Tipo | Background | Texto | Border |
|------|-----------|-------|--------|
| Dark | `--token-bg-dark` | `--token-white` | `--token-border` |
| Light | `--token-bg-light` | `--token-bg-dark` | `--token-border` |
| Accent | `--token-accent` | `--token-bg-dark` | nenhum |
| Surface | `--token-surface-card` | `--token-white` | `--token-border` |

## Card Padrão
```html
<div class="ds-card">
  <div class="ds-card-body">
    <div class="ds-card-label">LABEL UPPERCASE</div>
    <div style="font-family:var(--font-display);font-size:20px;font-weight:800;
      text-transform:uppercase;letter-spacing:-.03em;margin-bottom:8px;">Título</div>
    <p style="font-size:13px;color:var(--token-text-muted);line-height:140%;">Descrição</p>
    <div style="margin-top:15px;height:2px;background:var(--token-accent);width:40px;"></div>
  </div>
</div>
```

## Card com Hover Glow (cards de serviço)
```html
<div class="ds-card-glow anim-reveal">
  <!-- conteúdo -->
</div>
```
```css
.ds-card-glow:hover {
  transform:translateY(-4px) scale(1.02);
  box-shadow:0 0 30px rgba(209,255,0,.12), 0 12px 40px rgba(0,0,0,.3);
  border-color:rgba(209,255,0,.3);
}
```

## Padrão de Accent Bar
Barra de 2px lime no topo ou esquerda para hierarquia visual:
`<div style="height:2px;background:var(--token-accent);width:40px;"></div>`
