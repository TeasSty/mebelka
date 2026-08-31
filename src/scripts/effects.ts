import { NeatGradient } from '@firecms/neat';

let auroraInstance: NeatGradient | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobile(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
}

export function initAurora(canvas: HTMLCanvasElement | null): void {
  if (!canvas || prefersReducedMotion()) return;

  auroraInstance = new NeatGradient({
    ref: canvas,
    resolution: isMobile() ? 0.4 : 0.65,
    speed: 2.2,
    horizontalPressure: 3,
    verticalPressure: 4,
    waveAmplitude: 2.8,
    waveFrequencyX: 2.2,
    waveFrequencyY: 2.8,
    colorSaturation: 1.05,
    colorBrightness: 1.08,
    colorBlending: 5.5,
    grainIntensity: 0.06,
    grainScale: 2.2,
    grainSpeed: 0.25,
    bloomIntensity: 0.28,
    bloomThreshold: 0.55,
    fresnelEnabled: true,
    fresnelIntensity: 0.35,
    fresnelColor: '#f0c896',
    iridescenceEnabled: true,
    iridescenceIntensity: 0.12,
    iridescenceSpeed: 0.4,
    domainWarpEnabled: true,
    domainWarpIntensity: 0.22,
    vignetteIntensity: 0.45,
    backgroundColor: '#0a0806',
    backgroundAlpha: 1,
    colors: [
      { color: '#d4845c', enabled: true },
      { color: '#7a3d1f', enabled: true },
      { color: '#1a100c', enabled: true },
      { color: '#f0c896', enabled: true },
      { color: '#4a2518', enabled: true },
    ],
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && auroraInstance) {
      auroraInstance.speed = 0;
    } else if (auroraInstance && !prefersReducedMotion()) {
      auroraInstance.speed = 2.2;
    }
  });
}

export function initScrollReveal(): void {
  if (prefersReducedMotion()) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}

export function initCardTilt(): void {
  if (prefersReducedMotion() || isMobile()) return;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

export function initEffects(): void {
  initAurora(document.querySelector<HTMLCanvasElement>('[data-aurora]'));
  initScrollReveal();
  initCardTilt();
}
