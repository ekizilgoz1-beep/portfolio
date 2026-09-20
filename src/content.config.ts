import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Collection « projets » : un fichier Markdown par projet dans `src/content/projets/`.
 * Le nom du fichier devient l'URL : `mon-projet.md` → `/projets/mon-projet/`.
 */
const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    /** Titre du projet */
    title: z.string(),
    /** Résumé en une ou deux phrases (affiché sur l'accueil) */
    summary: z.string(),
    /** Nature du projet */
    type: z.enum(['scolaire', 'personnel', 'stage']),
    /** Période ou année (texte libre, ex. « 2026 » ou « janvier – mars 2026 ») — facultatif */
    period: z.string().optional(),
    /** Technologies réellement utilisées — facultatif, laisser vide si inconnu */
    technologies: z.array(z.string()).default([]),
    /** Lien externe (dépôt, démo…) — facultatif */
    link: z.url().optional(),
    linkLabel: z.string().optional(),
    /** Ordre d'affichage (croissant) */
    order: z.number().default(100),
    /** `true` tant que le contenu n'est pas rédigé : une mention « à compléter » s'affiche */
    placeholder: z.boolean().default(false),
    /** `true` pour masquer le projet sans supprimer le fichier */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projets };
