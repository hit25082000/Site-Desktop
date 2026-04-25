---
trigger: manual
---

# Avatars & Social Proof
> Transmite: confiança social e prova humana — rostos reais validam a proposta, geram credibilidade instantânea.

## Grupo Empilhado
```html
<div class="ds-avatar-group">
  <div class="ds-avatar"><img src="avatar1.jpg" alt=""></div>
  <div class="ds-avatar"><img src="avatar2.jpg" alt=""></div>
  <div class="ds-avatar ds-avatar-more">+6</div>
</div>
```
```css
.ds-avatar { width:32px; height:32px; border-radius:8px; border:2px solid var(--token-bg-light);
  margin-left:-12px; overflow:hidden; transition:transform .3s cubic-bezier(0.16,1,0.3,1); }
.ds-avatar:hover { transform:translateY(-4px) scale(1.1); z-index:10; }
.ds-avatar-more { background:#1c1e19; color:var(--token-accent); font-size:10px; font-weight:800; }
```

## Avatar Rotulado (testimonial)
```html
<div class="ds-avatar-labeled">
  <div class="ds-avatar" style="width:40px;height:40px;margin-left:0;">
    <img src="foto.jpg" alt="">
  </div>
  <div class="ds-avatar-info">
    <div class="ds-avatar-name">NOME</div>
    <div class="ds-avatar-role">CARGO</div>
  </div>
</div>
```
Name: display font, 11px, 800, uppercase, color dark.
Role: display font, 10px, 600, uppercase, color muted.
