---
trigger: manual
---

# Animações de Entrada
> Transmite: revelação dramática e narrativa visual — cada elemento "nasce" na tela como uma cena de filme.

## Fade Up (padrão para tudo)
```html
<div class="anim-reveal">Conteúdo</div>
```
```css
.anim-reveal { opacity:0; transform:translateY(40px);
  transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1); }
.anim-reveal.is-visible { opacity:1; transform:translateY(0); }
```

## Stagger (filhos em cascata)
```html
<div class="anim-stagger">
  <div class="anim-reveal">1</div>
  <div class="anim-reveal">2</div>
  <div class="anim-reveal">3</div>
</div>
```
Delays automáticos: nth-child(N) → delay `N * 0.08s` (até 10 filhos).

## Scale In (zoom-in dramático)
```html
<div class="anim-scale">KYMA®</div>
```
```css
.anim-scale { opacity:0; transform:scale(0.92);
  transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1); }
.anim-scale.is-visible { opacity:1; transform:scale(1); }
```

## Character Reveal (letra por letra)
```html
<div class="char-reveal" style="font-family:var(--font-display);font-size:clamp(30px,5vw,60px);
  font-weight:800;text-transform:uppercase;">TEXTO AQUI</div>
```
JS split em `.char`, cada char com delay `i * 0.025s`, slide-up de translateY(100%).

## Animated Counters (contagem animada)
```html
<span class="counter-value" data-counter data-target="83" data-suffix="%">0%</span>
```
Atributos: `data-target` | `data-prefix` | `data-suffix` | `data-decimals`
JS: ease-out cubic, duração 1800ms, dispara no scroll via IntersectionObserver threshold:0.5.
