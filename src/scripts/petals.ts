/**
 * Pétales en arrière-plan — animation canvas volontairement discrète.
 *
 * Principes :
 *  - peu d'éléments, opacité faible, mouvement lent et irrégulier ;
 *  - aucune image : chaque pétale est un tracé vectoriel (deux courbes de Bézier) ;
 *  - l'animation est mise en pause hors de l'écran, quand l'onglet est caché,
 *    et totalement désactivée si l'utilisateur préfère réduire les animations ;
 *  - le rendu est indépendant de la fréquence d'images (basé sur le temps écoulé).
 */

interface Petal {
  x: number;
  baseX: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  spin: number;
  vy: number;
  vx: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  alpha: number;
  color: string;
}

const MAX_DPR = 1.5;

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function readColors(el: HTMLElement): string[] {
  const styles = getComputedStyle(el);
  const pick = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return [
    pick('--rose-2', '#dfbfb3'),
    pick('--rose-2', '#dfbfb3'),
    pick('--clay-soft', '#b8806a'),
    pick('--taupe', '#a89283'),
  ];
}

function makePetal(width: number, height: number, colors: string[], fromTop = false): Petal {
  const w = rand(9, 18);
  const baseX = rand(-20, width + 20);
  return {
    baseX,
    x: baseX,
    y: fromTop ? rand(-height * 0.25, -20) : rand(-20, height),
    w,
    h: w * rand(1.5, 2.1),
    angle: rand(0, Math.PI * 2),
    spin: rand(-0.35, 0.35),
    vy: rand(11, 24),
    vx: rand(-3, 3),
    swayAmp: rand(10, 32),
    swayFreq: rand(0.12, 0.3),
    phase: rand(0, Math.PI * 2),
    alpha: rand(0.14, 0.3),
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal): void {
  const { w, h } = p;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.globalAlpha = p.alpha;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.moveTo(0, -h / 2);
  ctx.bezierCurveTo(w * 0.62, -h * 0.22, w * 0.5, h * 0.38, 0, h / 2);
  ctx.bezierCurveTo(-w * 0.5, h * 0.38, -w * 0.62, -h * 0.22, 0, -h / 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function mountPetals(canvas: HTMLCanvasElement): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const ctx = canvas.getContext('2d', { alpha: true });
  const host = canvas.parentElement ?? document.body;
  if (!ctx) return () => {};

  let width = 0;
  let height = 0;
  let dpr = 1;
  let petals: Petal[] = [];
  let colors = readColors(canvas);
  let raf = 0;
  let last = 0;
  let elapsed = 0;
  let inView = true;
  let pageVisible = !document.hidden;

  function resize(): void {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Densité faible : ~1 pétale pour 70 000 px², entre 5 et 16.
    const target = Math.min(16, Math.max(5, Math.round((width * height) / 70000)));
    if (petals.length > target) petals.length = target;
    while (petals.length < target) petals.push(makePetal(width, height, colors));
  }

  function step(now: number): void {
    raf = 0;
    if (!running()) return;

    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    elapsed += dt;

    ctx!.clearRect(0, 0, width, height);
    for (const p of petals) {
      p.y += p.vy * dt;
      p.baseX += p.vx * dt;
      p.x = p.baseX + Math.sin(elapsed * p.swayFreq * Math.PI * 2 + p.phase) * p.swayAmp;
      p.angle += p.spin * dt;

      if (p.y - p.h > height) {
        Object.assign(p, makePetal(width, height, colors, true));
      }
      drawPetal(ctx!, p);
    }
    raf = requestAnimationFrame(step);
  }

  function running(): boolean {
    return inView && pageVisible && !reduced.matches;
  }

  function start(): void {
    if (raf || !running()) return;
    last = performance.now();
    raf = requestAnimationFrame(step);
  }

  function stop(): void {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function sync(): void {
    if (running()) start();
    else {
      stop();
      if (reduced.matches) ctx!.clearRect(0, 0, width, height);
    }
  }

  const ro = new ResizeObserver(() => {
    resize();
    colors = readColors(canvas);
  });
  ro.observe(host);

  const io = new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting);
      sync();
    },
    { rootMargin: '80px 0px' },
  );
  io.observe(canvas);

  const onVisibility = () => {
    pageVisible = !document.hidden;
    sync();
  };
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', sync);

  resize();
  sync();

  return () => {
    stop();
    ro.disconnect();
    io.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    reduced.removeEventListener('change', sync);
  };
}

/** Monte l'animation sur chaque `<canvas data-petals>` de la page. */
export function initPetals(): void {
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-petals]').forEach((canvas) => {
    if (canvas.dataset.mounted) return;
    canvas.dataset.mounted = 'true';
    mountPetals(canvas);
  });
}
