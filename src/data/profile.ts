/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DONNÉES DU PORTFOLIO — source unique de vérité
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Toutes les informations personnelles, académiques et professionnelles
 *  affichées sur le site sont définies ici (sauf le contenu détaillé des
 *  projets, qui vit dans `src/content/projets/*.md`).
 *
 *  Règle : rien n'a été inventé. Chaque champ non encore connu est laissé
 *  vide (`''`, `[]`) ou marqué `placeholder: true` ; le site l'affiche alors
 *  comme une zone « à compléter » clairement identifiable. Il suffit de
 *  remplacer la valeur pour que l'affichage devienne définitif.
 */

export interface SkillGroup {
  /** Identifiant utilisé pour l'ancre HTML */
  id: string;
  /** Titre du domaine (Systèmes, Réseaux, …) */
  title: string;
  /** Une phrase d'introduction du domaine (optionnelle) */
  intro?: string;
  /** Compétences réellement acquises. Laisser `placeholder: true` tant que la liste n'est pas validée. */
  items: { label: string; detail?: string; placeholder?: boolean }[];
}

export interface TimelineEntry {
  title: string;
  place: string;
  location?: string;
  period: string;
  description?: string;
  placeholder?: boolean;
}

export interface ContactChannel {
  /** Ex. « E-mail », « LinkedIn », « GitHub » */
  label: string;
  /** Texte affiché (adresse, identifiant…). Vide = à compléter. */
  value: string;
  /** Lien cliquable (mailto:, https://…). Vide = pas de lien. */
  href?: string;
}

export const profile = {
  /* ── Identité ─────────────────────────────────────────────────────── */
  name: 'Ela Kizilgöz',
  firstName: 'Ela',
  initials: 'EK',
  /** Accroche sous le nom */
  role: 'Étudiante en deuxième année de BTS SIO — option SISR',
  school: 'Lycée René Cassin',
  city: 'Strasbourg',

  /** Métadonnées du site (balise <title>, description pour les moteurs de recherche) */
  siteTitle: 'Ela Kizilgöz — Portfolio BTS SIO SISR',
  siteDescription:
    'Portfolio d’Ela Kizilgöz, étudiante en BTS SIO option SISR au Lycée René Cassin de Strasbourg. Systèmes, réseaux, cybersécurité et projets.',

  /** Photo de profil : placer le fichier dans `src/assets/` et renseigner le chemin, ex. 'portrait.jpg'. Vide = cadre décoratif. */
  portrait: '',
  portraitAlt: 'Portrait d’Ela Kizilgöz',

  /** CV téléchargeable : placer le fichier dans `public/` et renseigner ex. '/cv-ela-kizilgoz.pdf'. Vide = bouton masqué. */
  cvUrl: '',

  /* ── Accueil ─────────────────────────────────────────────────────── */
  hero: {
    intro:
      'Je me forme aux systèmes et aux réseaux au Lycée René Cassin, à Strasbourg, avec un intérêt particulier pour la cybersécurité.',
    goal: 'Objectif : poursuivre mes études jusqu’à un Bac+5 dans le domaine de l’informatique.',
  },

  /* ── À propos ────────────────────────────────────────────────────── */
  about: {
    paragraphs: [
      'Étudiante en deuxième année de BTS Services Informatiques aux Organisations, option Solutions d’Infrastructure, Systèmes et Réseaux (SISR), je me forme à l’administration des systèmes, à la gestion des réseaux et à la sécurisation des infrastructures.',
      'Mon projet est de poursuivre mes études jusqu’à un Bac+5 dans le domaine de l’informatique, avec un intérêt particulier pour les systèmes, les réseaux et la cybersécurité.',
    ],
    /**
     * Paragraphe personnel supplémentaire (parcours, ce qui m'anime…).
     * Laisser vide tant qu'il n'est pas rédigé : une zone « à compléter » s'affiche.
     */
    personal: '',
    facts: [
      { label: 'Formation', value: 'BTS SIO — option SISR (2ᵉ année)' },
      { label: 'Établissement', value: 'Lycée René Cassin, Strasbourg' },
      { label: 'Objectif', value: 'Poursuite d’études jusqu’à un Bac+5' },
      { label: 'Domaines', value: 'Systèmes · Réseaux · Cybersécurité' },
    ],
  },

  /* ── Compétences ─────────────────────────────────────────────────── */
  /**
   * Les groupes dont `items` est vide ne sont pas affichés.
   * Remplacer les entrées `placeholder` par les compétences réellement acquises.
   */
  skills: <SkillGroup[]>[
    {
      id: 'systemes',
      title: 'Systèmes',
      intro: 'Installation, configuration et administration de systèmes d’exploitation et de services.',
      items: [{ label: 'Compétence à renseigner', placeholder: true }],
    },
    {
      id: 'reseaux',
      title: 'Réseaux',
      intro: 'Conception, mise en place et maintenance d’infrastructures réseau.',
      items: [{ label: 'Compétence à renseigner', placeholder: true }],
    },
    {
      id: 'cybersecurite',
      title: 'Cybersécurité',
      intro: 'Sécurisation des systèmes, des réseaux et des accès.',
      items: [{ label: 'Compétence à renseigner', placeholder: true }],
    },
    {
      id: 'developpement-web',
      title: 'Développement web',
      intro: 'Compétences mises en pratique lors du stage chez Synerdys.',
      items: [
        { label: 'HTML et CSS', detail: 'Structure des pages, mise en forme, cohérence de l’identité visuelle' },
        { label: 'JavaScript', detail: 'Interactions : menus, FAQ dépliable, formulaires' },
        { label: 'Python / Flask', detail: 'Partie dynamique et tableau de bord d’administration' },
        { label: 'Formulaires et envoi d’e-mails', detail: 'Générateur d’audit, contrôle des saisies, tests de plusieurs scénarios' },
        { label: 'Référencement (SEO)', detail: 'Mots-clés, titres, balises, génération de contenus de blog' },
        { label: 'Informations légales d’un site', detail: 'Cookies, droits des utilisateurs, réglementation, copyright' },
      ],
    },
    {
      id: 'methode',
      title: 'Méthode et savoir-être',
      intro: 'Acquis pendant la formation et le stage.',
      items: [
        { label: 'Organisation de projet', detail: 'Découper en fonctionnalités et avancer étape par étape' },
        { label: 'Tests et correction', detail: 'Tester avant de valider, identifier la partie responsable d’une erreur' },
        { label: 'Travail en équipe', detail: 'Relier deux projets, expliquer ses besoins, chercher une solution commune' },
        { label: 'Autonomie', detail: 'Chercher, tester et corriger avant de demander de l’aide' },
        { label: 'Utilisation raisonnée de l’IA', detail: 'S’en servir pour apprendre et accélérer, en vérifiant toujours le résultat' },
      ],
    },
  ],

  /* ── Stage ───────────────────────────────────────────────────────── */
  /**
   * Un stage en entreprise a été réalisé dans le cadre du BTS.
   * Les informations précises seront ajoutées lorsqu'elles seront fournies.
   */
  internship: {
    company: 'Synerdys',
    sector: 'Audit énergétique et ingénierie immobilière',
    location: 'Entzheim',
    period: '1er juin – 3 juillet 2026',
    duration: '5 semaines',
    role: 'Création et amélioration d’un site web et mise en place d’un espace de suivi',
    summary:
      'Stage de première année réalisé chez Synerdys (anciennement Enerdys, renommée pendant le stage), entreprise d’audit énergétique et d’ingénierie immobilière. Ma mission principale a été de participer à la conception et à l’amélioration du site web de l’entreprise : présentation de l’activité et des certifications, générateur d’audit gratuit, FAQ interactive, avis clients, référencement, informations légales, puis mise en place d’un tableau de bord de suivi des visites. Le projet a été mené en parallèle de celui d’un camarade de stage, et les deux ont finalement été reliés.',
    missions: [
      'Concevoir la structure du site et réaliser ses pages : accueil, présentation de l’entreprise, certifications, audit gratuit, FAQ, contact, avis clients.',
      'Développer le générateur d’audit gratuit : formulaire de saisie, contrôle des champs et envoi des résultats par e-mail.',
      'Mettre en place une FAQ interactive (questions dépliables) et un formulaire de question personnalisée avec adresse de réponse.',
      'Travailler le référencement (mots-clés, titres, balises, organisation des contenus) et un système de génération automatique d’articles de blog.',
      'Rédiger et intégrer les informations légales : cookies, droits des utilisateurs, réglementation, copyright.',
      'Créer un tableau de bord d’administration pour suivre les utilisateurs, clics, impressions, pages consultées et trafic, avec un accès réservé aux administrateurs.',
    ],
    achievements: [
      'Site web complet, cohérent avec la nouvelle identité de l’entreprise (passage d’Enerdys à Synerdys pendant le stage).',
      'Générateur d’audit fonctionnel, testé sur plusieurs scénarios de saisie avant validation.',
      'Tableau de bord de suivi opérationnel, puis — sur ma proposition — intégré au SaaS développé par mon camarade pour offrir un espace d’administration unique.',
      'Méthode de travail progressive : découpage en fonctionnalités, tests systématiques, correction ciblée des erreurs.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'SEO'],
    results:
      'Ce stage m’a permis de passer d’exercices scolaires à un projet ayant un objectif réel pour une entreprise, et de comprendre qu’un site professionnel ne se limite pas à quelques pages : navigation, formulaires, contenu, utilisateurs, informations légales et suivi comptent autant. J’ai progressé en développement web, en organisation de projet et en travail en équipe, et gagné en autonomie : chercher, tester, corriger avant de demander de l’aide. J’ai aussi appris à utiliser un assistant IA de manière raisonnée, comme support d’apprentissage, en gardant la responsabilité de comprendre et de vérifier chaque résultat.',
    /** Identifiant de la fiche projet détaillée (fichier dans src/content/projets/) — vide pour ne pas afficher de lien */
    projectId: 'site-web-synerdys',
  },

  /* ── Formation ───────────────────────────────────────────────────── */
  education: <TimelineEntry[]>[
    {
      title: 'BTS SIO — option SISR',
      place: 'Lycée René Cassin',
      location: 'Strasbourg',
      period: '2025 – 2027',
      description:
        'Services Informatiques aux Organisations, option Solutions d’Infrastructure, Systèmes et Réseaux.',
    },
    {
      title: 'Formation antérieure',
      place: 'Établissement',
      location: '',
      period: '',
      description: 'Baccalauréat ou formation précédente : à compléter.',
      placeholder: true,
    },
  ],

  /* ── Poursuite d'études ──────────────────────────────────────────── */
  studies: {
    goal: 'Poursuivre jusqu’à un Bac+5 dans le domaine de l’informatique.',
    interests: ['Systèmes', 'Réseaux', 'Cybersécurité'],
    /** École, master ou spécialisation visés — à préciser ultérieurement. */
    targetSchool: '',
    targetSpecialization: '',
  },

  /* ── Contact ─────────────────────────────────────────────────────── */
  /**
   * N'ajouter que des coordonnées réelles. Un canal dont `value` est vide
   * s'affiche comme « à compléter ». Supprimer la ligne pour la masquer.
   */
  contact: <ContactChannel[]>[
    { label: 'E-mail', value: 'ekizilgoz1@gmail.com', href: 'mailto:ekizilgoz1@gmail.com' },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/ela-kizilgöz',
      href: 'https://www.linkedin.com/in/ela-kizilg%C3%B6z-a9b751349/',
    },
  ],

  /* ── Mentions légales ────────────────────────────────────────────── */
  legal: {
    /** Hébergeur du site — à renseigner une fois la plateforme choisie (voir DEPLOIEMENT.md). */
    host: 'Cloudflare, Inc. — 101 Townsend Street, San Francisco, CA 94107, États-Unis (Cloudflare Pages)',
  },
};

export type Profile = typeof profile;
