/**
 * Apparition progressive au défilement.
 * Les éléments portant `data-reveal` reçoivent la classe `is-visible` lorsqu'ils
 * entrent dans la fenêtre. `data-reveal-delay="120"` ajoute un décalage (ms)
 * pour échelonner des éléments voisins.
 *
 * Sans JavaScript, tout reste visible (les styles masqués ne s'appliquent
 * qu'avec la classe `.js` sur <html>).
 */
export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = el.dataset.revealDelay;
        if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  targets.forEach((el) => {
    // Ce qui est déjà à l'écran au chargement apparaît sans attendre.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('is-visible');
    } else {
      io.observe(el);
    }
  });
}
