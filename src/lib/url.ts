/**
 * Construit une URL interne en tenant compte du `base` configuré
 * (utile lorsque le site est hébergé dans un sous-dossier, ex. GitHub Pages).
 *
 *   url('/')            → '/' ou '/portfolio-ela/'
 *   url('/projets/x/')  → '/projets/x/' ou '/portfolio-ela/projets/x/'
 *   url('/#contact')    → '/#contact' ou '/portfolio-ela/#contact'
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
