import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styles from './ScrollCarAssemblySection.module.css';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

const DEFAULT_BADGES = [
  'Motor',
  'Câmbio',
  'Freios',
  'Embreagem',
  'Revisão',
] as const;

const DEFAULT_TITLE = 'Da peça solta ao carro pronto para rodar.';
const DEFAULT_SUBTITLE =
  'Na Boncar, cada detalhe passa por uma análise cuidadosa antes do serviço.';
const WHATSAPP_DEFAULT_TEXT =
  'Olá, vim pelo site da Boncar e quero fazer uma avaliação no meu carro.';

const TIME_EPSILON = 0.03;

function titleAccentParts(full: string): { head: string; accent: string | null } {
  const lower = full.toLowerCase();
  const key = 'pronto para rodar';
  const i = lower.indexOf(key);
  if (i === -1) return { head: full, accent: null };
  return { head: full.slice(0, i), accent: full.slice(i) };
}

export type ScrollCarAssemblySectionProps = {
  videoSrc: string;
  whatsappNumber?: string;
  title?: string;
  subtitle?: string;
  heightVh?: number;
  poster?: string;
  mascotSrc?: string;
};

export function ScrollCarAssemblySection({
  videoSrc,
  whatsappNumber,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  heightVh = 200,
  poster,
  mascotSrc,
}: ScrollCarAssemblySectionProps) {
  const badges = DEFAULT_BADGES;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const pendingApplyRef = useRef(false);
  const metaReadyRef = useRef(false);
  const reduceMotionRef = useRef(false);

  const [reduceMotion, setReduceMotion] = useState(false);

  const whatsHref =
    whatsappNumber && whatsappNumber.replace(/\D/g, '').length > 0
      ? buildWhatsAppUrl(whatsappNumber, WHATSAPP_DEFAULT_TEXT)
      : undefined;

  useLayoutEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotionRef.current = mq.matches;
    setReduceMotion(mq.matches);
    const onChange = () => {
      reduceMotionRef.current = mq.matches;
      setReduceMotion(mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const applyVideoFromProgress = useCallback(() => {
    pendingApplyRef.current = false;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reduceMotionRef.current) return;
    if (!metaReadyRef.current || !Number.isFinite(video.duration)) return;

    const duration = video.duration;
    if (duration <= 0) return;

    const targetTime = clamp(progressRef.current, 0, 1) * duration;
    if (Math.abs(video.currentTime - targetTime) < TIME_EPSILON) return;

    try {
      video.currentTime = targetTime;
    } catch {
      /* seeking pode falhar em alguns frames; tenta no próximo rAF */
    }
  }, []);

  const scheduleApply = useCallback(() => {
    if (pendingApplyRef.current) return;
    pendingApplyRef.current = true;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      applyVideoFromProgress();
    });
  }, [applyVideoFromProgress]);

  const updateProgressFromScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section || reduceMotionRef.current) return;

    const rect = section.getBoundingClientRect();
    const scrollY = window.scrollY;
    const sectionTop = scrollY + rect.top;
    const sectionHeight = section.offsetHeight;
    const viewportH = window.innerHeight;
    const denom = Math.max(1, sectionHeight - viewportH);

    progressRef.current = clamp((scrollY - sectionTop) / denom, 0, 1);
    scheduleApply();
  }, [scheduleApply]);

  useEffect(() => {
    if (reduceMotion) return;

    const onScroll = () => updateProgressFromScroll();
    const onResize = () => updateProgressFromScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    updateProgressFromScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, updateProgressFromScroll]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    metaReadyRef.current = false;

    const onMeta = () => {
      metaReadyRef.current = true;
      if (reduceMotionRef.current) {
        try {
          if (Number.isFinite(video.duration) && video.duration > 0) {
            video.currentTime = video.duration;
          }
        } catch {
          /* */
        }
        return;
      }
      updateProgressFromScroll();
    };

    const onCanPlay = () => {
      if (!metaReadyRef.current) return;
      if (reduceMotionRef.current) return;
      updateProgressFromScroll();
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('canplay', onCanPlay);

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('canplay', onCanPlay);
    };
  }, [videoSrc, reduceMotion, updateProgressFromScroll]);

  useEffect(() => {
    if (!reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;
    const snapEnd = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      try {
        video.currentTime = video.duration;
      } catch {
        /* */
      }
    };
    if (video.readyState >= 1) snapEnd();
    video.addEventListener('loadedmetadata', snapEnd);
    return () => video.removeEventListener('loadedmetadata', snapEnd);
  }, [reduceMotion, videoSrc]);

  const sectionStyle = { height: `${heightVh}vh` } as const;
  const { head: titleHead, accent: titleAccent } = titleAccentParts(title);

  const ctaClass = `${styles.cta} ${!whatsHref ? styles.ctaMuted : ''}`;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={sectionStyle}
      aria-label={title}
    >
      <div className={styles.sticky}>
        <div className={styles.stickyInner}>
          <div className={styles.stage}>
            <video
              ref={videoRef}
              className={styles.video}
              src={videoSrc}
              poster={poster}
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
              aria-hidden
              disablePictureInPicture
              disableRemotePlayback
            />

            <div className={styles.gradient} aria-hidden />

            {mascotSrc ? (
              <img
                className={styles.mascot}
                src={mascotSrc}
                alt=""
                decoding="async"
              />
            ) : null}

            <div className={styles.copy}>
              <h2 className={styles.title}>
                {titleHead}
                {titleAccent ? (
                  <span className={styles.titleAccent}>{titleAccent}</span>
                ) : null}
              </h2>
              <p className={styles.subtitle}>{subtitle}</p>
              <ul className={styles.badges}>
                {badges.map((b) => (
                  <li key={b} className={styles.badge}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.ctaRow}>
            {whatsHref ? (
              <a
                className={ctaClass}
                href={whatsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chamar no WhatsApp
              </a>
            ) : (
              <span className={ctaClass} aria-disabled="true">
                Chamar no WhatsApp
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
