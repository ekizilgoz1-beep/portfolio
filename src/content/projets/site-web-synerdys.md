---
title: "Site web et tableau de bord de suivi pour Synerdys"
summary: "Création et amélioration du site web d’une entreprise d’audit énergétique — présentation, générateur d’audit gratuit, FAQ, référencement, informations légales — puis mise en place d’un tableau de bord de suivi relié à un SaaS."
type: stage
period: "Juin – juillet 2026 · stage de 5 semaines"
technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "SEO"]
order: 1
placeholder: false
---

## Contexte

Stage de première année de BTS SIO, réalisé du 1er juin au 3 juillet 2026 chez **Synerdys**, entreprise d’audit énergétique et d’ingénierie immobilière. L’entreprise s’appelait Enerdys au début du stage et a changé de nom pendant celui-ci : les contenus du site devaient donc rester cohérents avec la nouvelle identité.

L’objectif du site était simple à formuler et exigeant à réaliser : permettre à une personne qui découvre l’entreprise de comprendre rapidement son activité, lui donner envie de demander un audit ou de prendre contact, et regrouper les informations utiles dans une présentation claire.

Le projet a été mené en parallèle de celui d’un camarade de stage, qui développait un SaaS. Les deux travaux ont finalement été reliés.

## Organisation

| Semaine | Travail réalisé |
|---|---|
| 1 | Découverte de l’entreprise, prise en main du projet, réflexion sur l’organisation du site |
| 2 | Création et amélioration des principales pages, premières fonctionnalités interactives |
| 3 | Générateur d’audit, formulaires et envoi des informations par e-mail |
| 4 | Tableau de bord et suivi des visites et des actions des utilisateurs |
| 5 | Connexion avec le SaaS du camarade, corrections, vérifications, finalisation |

## Ce qui a été réalisé

### Structure et contenus du site

Le site s’articule autour d’une page d’accueil, d’une présentation de l’entreprise et de ses certifications, d’un espace consacré à l’audit gratuit, d’une FAQ, d’une zone de contact et d’une section d’avis clients (avec renvoi direct vers la page Google de l’entreprise). J’ai construit ces pages en me plaçant du point de vue d’un visiteur qui ne connaît pas l’entreprise : informations principales accessibles immédiatement, moyens de contact toujours visibles, étapes inutiles supprimées.

### FAQ interactive et questions personnalisées

La FAQ utilise un système de questions dépliables : l’utilisateur choisit sa question et la réponse s’affiche directement, ce qui évite une page trop longue. Si sa question n’y figure pas, un formulaire lui permet de l’écrire et de laisser son adresse e-mail pour recevoir une réponse.

### Générateur d’audit gratuit

Un formulaire récupère les informations nécessaires puis déclenche l’envoi des résultats par e-mail, créant un lien direct entre le visiteur et l’entreprise. Cette fonctionnalité m’a appris à contrôler les saisies des utilisateurs, à comprendre le fonctionnement des formulaires et à tester une fonctionnalité dans plusieurs situations, pas seulement dans le cas où tout se passe bien.

### Référencement et génération de contenus

Travail sur les mots-clés, les titres, les balises et l’organisation des contenus pour améliorer la visibilité du site. J’ai aussi participé à un système de génération automatique d’articles de blog à partir de mots-clés définis à l’avance — en retenant qu’un contenu généré doit toujours être relu et vérifié.

### Informations légales

Mise en place des pages et mentions concernant les cookies, les droits des utilisateurs, la réglementation et le copyright. Une partie peu visible mais indispensable pour un site professionnel destiné au public.

### Tableau de bord d’administration

Pour que l’entreprise comprenne comment les visiteurs utilisent le site, j’ai créé un tableau de bord présentant le nombre d’utilisateurs, les clics, les impressions, les pages visitées et le trafic, accessible uniquement via un espace administrateur distinct du site public.

### Intégration au SaaS

Le projet initial s’arrêtait au tableau de bord. J’ai proposé de le rapprocher du SaaS développé par mon camarade afin que l’administrateur dispose d’un environnement unique regroupant les indicateurs de fréquentation et de suivi. Cette évolution, venue de ma propre réflexion, m’a montré qu’un projet informatique ne se construit pas de manière linéaire et qu’il faut savoir communiquer lorsque deux travaux doivent être reliés.

## Technologies

- **HTML** — structure des pages et organisation des contenus
- **CSS** — mise en forme et apparence du site
- **JavaScript** — comportements interactifs : menus, FAQ, actions
- **Python / Flask** — fonctions du tableau de bord et partie dynamique

J’ai également utilisé un assistant d’intelligence artificielle (Claude Code), avec l’accord de mon tuteur, comme support d’apprentissage : demander des explications, comparer plusieurs solutions, puis comprendre, tester et vérifier chaque proposition avant de l’intégrer.

## Difficultés et solutions

- **Comprendre des notions nouvelles** (tableau de bord, partie dynamique) : demander des explications, tester de petites modifications, observer le résultat.
- **Faire fonctionner plusieurs éléments ensemble** : avancer progressivement pour ne pas casser ce qui fonctionnait déjà.
- **Corriger les erreurs** après une modification : identifier la partie responsable, tester la correction, puis continuer.
- **Vérifier les réponses de l’IA** : tester, relire et adapter avant d’utiliser une proposition.

## Ce que j’en retiens

Ce stage m’a permis de passer d’exercices scolaires à un projet ayant un objectif réel. J’ai progressé en développement web, en organisation de projet et en travail en équipe, et j’ai compris que je n’avais pas besoin de tout connaître dès le début pour avancer. Le fait d’avoir proposé l’intégration du tableau de bord au projet de mon camarade m’a montré que je pouvais apporter des idées, et pas seulement exécuter une consigne.
