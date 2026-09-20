// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Configuration Astro.
 *
 * `site` et `base` sont lus depuis l'environnement pour que le même code
 * fonctionne en local, sur GitHub Pages (sous-dossier /nom-du-depot/) et
 * sur un nom de domaine personnalisé. Voir DEPLOIEMENT.md.
 *
 *   SITE_URL  : URL publique complète, ex. https://ela-kizilgoz.fr
 *   BASE_PATH : chemin de base, ex. /portfolio-ela (vide sur un domaine dédié)
 */
const site = process.env.SITE_URL || undefined;
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
