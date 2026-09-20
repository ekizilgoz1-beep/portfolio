/**
 * Navigation : menu mobile accessible, filet d'en-tête au défilement,
 * et mise en évidence de la section courante sur la page d'accueil.
 */
export function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]');
  const label = document.querySelector<HTMLElement>('[data-nav-label]');
  if (!header) return;

  /* Filet discret dès que l'on quitte le haut de page */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  if (toggle && panel) {
    const setOpen = (open: boolean) => {
      toggle.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      if (label) label.textContent = open ? 'Fermer' : 'Menu';
      header.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('nav-open', open);
    };
    setOpen(false);

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    // Si l'on repasse en affichage large, on referme le panneau.
    const wide = window.matchMedia('(min-width: 48em)');
    wide.addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* Section courante (accueil uniquement) */
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  const sections = links
    .map((link) => {
      const hash = link.hash;
      return hash ? document.getElementById(hash.slice(1)) : null;
    })
    .filter((el): el is HTMLElement => el !== null);

  if (sections.length === 0 || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        const active = link.hash === `#${visible.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] },
  );
  sections.forEach((s) => io.observe(s));
}
