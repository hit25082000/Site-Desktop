---
trigger: manual
---

# Forms
> Transmite: conversão sem atrito e profissionalismo — campos limpos que respeitam o tempo do usuário.

## Estrutura

```html
<div class="ds-form-container">
  <div class="ds-form-grid"> <!-- 2 colunas, 1 no mobile -->
    <div class="ds-field">
      <label class="ds-label">NAME*</label>
      <input type="text" class="ds-input" placeholder="Jane Smith">
    </div>
  </div>
  <div class="ds-field">
    <label class="ds-label">MENSAGEM*</label>
    <textarea class="ds-textarea" placeholder="Descreva..."></textarea>
  </div>
  <!-- Radio -->
  <div class="ds-field">
    <label class="ds-label">ORÇAMENTO</label>
    <div class="ds-radio-group">
      <label class="ds-control"><input type="radio" name="budget" checked> Até R$50K</label>
    </div>
  </div>
  <!-- Checkbox -->
  <label class="ds-control"><input type="checkbox"> Aceito os termos</label>
  <button class="ds-btn--submit">ENVIAR</button>
</div>
```

### CSS chave
```css
.ds-input, .ds-textarea { background:transparent; border:1px solid var(--token-border);
  color:var(--token-white); padding:14px 16px; font-family:var(--font-display);
  font-size:16px; font-weight:600; border-radius:0; }
.ds-input:focus { border-color:var(--token-accent); box-shadow:0 0 15px rgba(209,255,0,.1); }
.ds-control input { appearance:none; width:18px; height:18px; border:1px solid var(--token-border);
  background:var(--token-surface-card); }
.ds-control input:checked { background:var(--token-accent); border-color:var(--token-accent); }
.ds-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); }
```
