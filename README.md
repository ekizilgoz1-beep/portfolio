# Portfolio — Ela Kizilgöz

Portfolio professionnel d'Ela Kizilgöz, étudiante en **BTS SIO option SISR** au Lycée René Cassin (Strasbourg).

Site statique construit avec [Astro](https://astro.build) : aucun serveur, aucune base de données, aucun cookie. Les polices (Fraunces et Mulish) sont hébergées avec le site.

## Démarrer

Prérequis : [Node.js](https://nodejs.org) 22.12 ou plus récent (le projet a été développé avec Node 24).

```bash
npm install        # installer les dépendances (une seule fois)
npm run dev        # lancer le site en local → http://localhost:4321
npm run build      # générer le site de production dans dist/
npm run preview    # prévisualiser le site généré
npm run check      # vérifier les types et la syntaxe
```

## Où modifier le contenu

Toutes les informations personnelles sont regroupées à **un seul endroit** :

| Quoi | Où |
|---|---|
| Nom, présentation, objectifs, compétences, stage, formation, contact | `src/data/profile.ts` |
| Fiches projets (une par fichier Markdown) | `src/content/projets/*.md` |
| Photo de profil | déposer dans `src/assets/` puis renseigner `portrait` dans `profile.ts` |
| CV au format PDF | déposer dans `public/` puis renseigner `cvUrl` dans `profile.ts` |
| Titre, description, favicon | `profile.ts` (`siteTitle`, `siteDescription`) et `public/favicon.svg` |

### Zones « à compléter »

Aucune information n'a été inventée. Tout ce qui n'est pas encore connu est affiché comme une zone **à compléter** (texte italique souligné en pointillés). Il suffit de remplacer la valeur vide (`''`, `[]`) ou de retirer `placeholder: true` pour que l'affichage devienne définitif.

Exemples dans `src/data/profile.ts` :

```ts
// Un canal de contact vide s'affiche « À compléter » ; supprimer la ligne pour le masquer.
contact: [
  { label: 'E-mail', value: 'prenom.nom@exemple.fr', href: 'mailto:prenom.nom@exemple.fr' },
],

// Un domaine de compétences dont la liste est vide n'est pas affiché du tout.
skills: [
  { id: 'reseaux', title: 'Réseaux', items: [{ label: 'Configuration de VLAN', detail: 'Switchs Cisco' }] },
],
```

### Ajouter un projet

Créer un fichier `src/content/projets/mon-projet.md` (le nom du fichier devient l'adresse `/projets/mon-projet/`) :

```md
---
title: "Titre du projet"
summary: "Une ou deux phrases affichées sur l'accueil."
type: scolaire            # scolaire | personnel | stage
period: "2026"            # facultatif
technologies: ["Debian", "Proxmox"]   # facultatif — uniquement si réellement utilisées
order: 10                 # ordre d'affichage
placeholder: false        # true tant que la fiche n'est pas rédigée
---

## Contexte
…
```

Les fichiers `projet-scolaire-1.md` et `projet-personnel-1.md` sont des canevas : les renommer, les compléter ou les supprimer.

## Structure du projet

```
src/
├── data/profile.ts        ← toutes les données personnelles
├── content/projets/       ← fiches projets (Markdown)
├── content.config.ts      ← schéma des fiches projets
├── layouts/BaseLayout.astro
├── pages/                 ← routes : accueil, projets/[id], mentions-legales, 404
├── sections/              ← sections de l'accueil (Hero, About, Skills, …)
├── components/            ← briques réutilisables (Header, Footer, Placeholder, Petals…)
├── scripts/               ← petals.ts (pétales), reveal.ts (apparitions), nav.ts (menu)
└── styles/                ← tokens.css (palette, typo, espacements) et base.css
```

## Identité visuelle

- **Palette** : crème papier, sable, taupe, brun d'encre et un accent « argile » ; jamais de marron très foncé. Définie dans `src/styles/tokens.css`.
- **Typographie** : *Fraunces* (titres, italiques) et *Mulish* (texte), auto-hébergées via Fontsource.
- **Forme signature** : coins « pétale » asymétriques (`--petal-radius`), repris sur la favicon, le cadre photo et les encadrés.
- **Mouvement** : pétales en arrière-plan très discrets (canvas, en pause hors écran ou onglet caché), apparitions au défilement. Tout est désactivé si l'utilisateur a activé *Réduire les animations* dans son système.

## Mise en ligne

Voir [DEPLOIEMENT.md](./DEPLOIEMENT.md).
