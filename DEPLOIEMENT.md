# Mettre le portfolio en ligne

Le site est entièrement statique : le dossier `dist/` généré par `npm run build` peut être hébergé n'importe où. La solution retenue est **GitHub + Cloudflare (Workers & Pages)** : le code vit sur GitHub, Cloudflare construit et publie le site automatiquement à chaque `git push`, gratuitement, avec HTTPS et la possibilité d'ajouter un nom de domaine plus tard.

> Rien n'est publié tant que le dépôt n'a pas été poussé et que Cloudflare n'a pas été connecté. Chaque étape est manuelle et réversible.

## 1. Vérifier le build en local

```bash
npm run check     # 0 erreur attendu
npm run build     # génère dist/
npm run preview   # http://localhost:4321 pour vérifier le résultat
```

## 2. Pousser le code sur GitHub

1. Sur github.com, **New repository** : nom `portfolio-ela` (ou autre), visibilité *Public*, **sans** README ni .gitignore (le projet en a déjà).
2. Dans le dossier du projet :

```bash
git add .
git commit -m "Portfolio initial"
git branch -M main
git remote add origin https://github.com/<utilisateur>/portfolio-ela.git
git push -u origin main
```

Le dossier `private/` (rapport de stage, documents sources) est ignoré par git : il ne part jamais sur GitHub.

## 3. Cloudflare (Workers & Pages)

Le site est publié à l'adresse **https://portfolio.ekizilgoz1.workers.dev** via un projet Cloudflare *Workers* connecté au dépôt GitHub. Configuration réalisée dans le tableau de bord :

| Champ | Valeur |
|---|---|
| Source | dépôt GitHub `ekizilgoz1-beep/portfolio`, branche `main` |
| Framework | Astro |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (par défaut) |

Le fichier `wrangler.jsonc` à la racine décrit le déploiement (dossier `dist/`, page 404 personnalisée, gestion des slashs finaux). Son champ `name` (`portfolio`) doit rester identique au nom du projet Cloudflare.

Aucune variable d'environnement n'est nécessaire : l'URL publique est définie par défaut dans `astro.config.mjs` (`SITE_URL` permet de la remplacer, par exemple pour un nom de domaine).

### Mettre à jour le site

```bash
git add .
git commit -m "Ajout des compétences réseaux"
git push
```

Cloudflare reconstruit et publie automatiquement (1 à 2 minutes). Suivi dans **Workers & Pages → portfolio → Deployments**.

## 4. Nom de domaine personnalisé (plus tard)

1. Acheter le domaine (chez Cloudflare directement — le plus simple — ou chez un autre registrar).
2. Dans le projet : **Settings → Domains & Routes → Add → Custom domain**, saisir le domaine. Si le domaine est géré par Cloudflare, les DNS sont configurés automatiquement ; sinon, ajouter l'enregistrement CNAME indiqué chez le registrar.
3. Remplacer l'URL par défaut dans `astro.config.mjs` (ligne `const site = …`) par le nouveau domaine, commit, push.

## 5. Alternatives

- **GitHub Pages** : le workflow `.github/workflows/deploy.yml` est conservé en lancement manuel. Activer Pages (Settings → Pages → Source : GitHub Actions), lancer le workflow depuis l'onglet Actions, ou remettre `push: branches: [main]` pour l'automatiser. L'URL et le chemin de base sont gérés automatiquement.
- **Netlify** : importer le dépôt, la configuration est lue dans `netlify.toml` ; définir `SITE_URL`.
- **Vercel** : importer le dépôt (Astro détecté automatiquement) ; définir `SITE_URL`.
- **Serveur classique / FTP** : `SITE_URL=https://votre-domaine.fr npm run build` puis envoyer le contenu de `dist/` à la racine.

## 6. Variables d'environnement

| Variable | Rôle | Exemple |
|---|---|---|
| `SITE_URL` | URL publique complète (balises `canonical`, Open Graph) — facultative, valeur par défaut dans `astro.config.mjs` | `https://portfolio.ekizilgoz1.workers.dev` |
| `BASE_PATH` | Chemin de base si le site est servi dans un sous-dossier | `/` (Cloudflare) · `/portfolio` (GitHub Pages sans domaine) |

## 7. Dépannage

- **Le build Cloudflare échoue** : ouvrir le journal du déploiement ; vérifier que la commande est `npm run build` et le dossier `dist`. Le fichier `package-lock.json` doit être commité.
- **Les liens sont cassés** : `BASE_PATH` ne doit pas être défini (ou valoir `/`) sur Cloudflare.
- **Un changement n'apparaît pas** : vérifier dans **Deployments** que le dernier build est bien terminé ; forcer un rechargement du navigateur (Ctrl + F5).
- **Une page projet renvoie 404** : le nom du fichier Markdown ne doit contenir ni espace ni accent (ex. `serveur-web.md`).
