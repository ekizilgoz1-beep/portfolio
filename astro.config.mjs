// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Configuration Astro.
 *
 * `site` et `base` sont lus depuis l'environnement pour que le même code
 * fonctionne en local, sur GitHub Pages (sous-dossier /nom-du-depot/) et
 * sur un nom de domaine personnalisé. Voir DEPLOIEMENT.md.
 *
 *   SITE_URL  : URL publique complète (par défaut l'adresse Cloudflare ci-dessous ;
 *               à remplacer par le nom de domaine le jour où il y en a un)
 *   BASE_PATH : chemin de base, ex. /portfolio-ela (vide sur un domaine dédié)
 */
const site = process.env.SITE_URL || 'https://portfolio.ekizilgoz1.workers.dev';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    format: 'directory',
    // Les feuilles de style sont petites : les inliner évite des requêtes bloquantes.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
