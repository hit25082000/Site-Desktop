/**
 * Exemplo (Vite + React): importe o vídeo como URL ou use caminho público.
 *
 * Tailwind (equivalente aproximado ao module):
 * - section: bg-gradient-to-b from-[#0f1419] via-[#1a2332] to-[#0f1419]
 * - texto: text-white; destaque título: text-orange-500 (#f97316)
 * - badges: rounded-full border border-orange-500/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide
 * - CTA: rounded-full bg-orange-500 px-7 py-3 font-bold text-[#0f1419] shadow-lg shadow-orange-500/35
 *
 * Perf: listener scroll passivo + um rAF por frame no máximo; currentTime só se |Δ|>0,03s;
 * sem setState no scroll; vídeo muted+playsInline reduz bloqueios em iOS.
 */
import { ScrollCarAssemblySection } from './ScrollCarAssemblySection';

export function ScrollCarAssemblySectionUsage() {
  return (
    <ScrollCarAssemblySection
      videoSrc="/templates/boncar/download.mp4"
      poster="/templates/boncar/assets/100_e68f6b0cbbf0.jpg"
      mascotSrc="/templates/boncar/image.png"
      whatsappNumber="5511999999999"
      heightVh={220}
    />
  );
}
