/* ============================================================
   content.js — TOUS les textes du site sont ici.
   Modifie les valeurs entre guillemets, enregistre, recharge.
   Règle d'or : rien de vide ou entre crochets ne s'affiche.
   ============================================================ */
window.CONTENT = {

  meta: {
    title: "Une surprise pour toi",
    description: "Ouvre quand tu veux."
  },

  /* 00 — SEUIL */
  gate: {
    monogram: "Marilyn",
    edition: "ÉDITION 20 · TIRAGE N° 01/01",
    withSound: "Ouvrir avec le son",
    silent: "Entrer sans son",
    note: "Une édition privée, pour une seule lectrice."
  },

  /* 01 — COUVERTURE */
  cover: {
    label: "ÉDITION 20 · N° 01/01",
    title: "Joyeux anniversaire, Marilyn.",
    subtitle: "20 ans · 23 octobre 2026",
    scroll: "Feuilleter",
    alt: "Portrait en noir et blanc de Marilyn, au milieu de grands rochers, le regard direct."
  },

  /* 02 — ÉDITO */
  edito: {
    label: "Édito",
    title: "Édito",
    paragraphs: [
      "Il y a des personnes qu'on rencontre en deuxième année de licence et qui, sans faire de bruit, rendent les journées plus légères. Depuis 2025, tu fais partie de celles-là.",
      "Entre les cours, les doutes, les deadlines et les journées de stage au CRIHD, une chose est devenue évidente : tu es de ces personnes qu'on est content de retrouver.",
      "Cette page n'a été tirée qu'à un seul exemplaire. Il était évident qu'il te reviendrait."
    ],
    signature: "CITRON"
  },

  /* Pensées de marge (une ou deux, pas plus). Laisse "" pour en retirer une. */
  marginalia: {
    afterEdito: "Ce n'est pas tous les jours qu'on rencontre quelqu'un qui rend les lundis supportables.",
    afterFragments: "Il n'existe qu'un seul exemplaire de cette page. De la même façon, il n'y a qu'une seule Marilyn."
  },

  /* 03 — ARCHIVES */
  archives: {
    label: "Archives",
    title: "Avant tout ça.",
    caption: "Avant la L2, avant le CRIHD, avant les fous rires : il y avait déjà cette petite fille.",
    image: { name: "archive", w: 720, h: 1280, alt: "Photo d'enfance de Marilyn, toute petite, en robe à fleurs, le regard sérieux et les yeux grands ouverts." }
  },

  /* 04 — FRAGMENTS
     Chaque élément : "fig" = repère, "text" = la légende.
     "layout" = emplacement dans la page :
       a, b, c, d  → portraits (deux par rangée : a+b, puis c+d)
       wa, wb      → formats larges, pleine rangée (wa à gauche, wb à droite)
     L'ordre de la liste = l'ordre de lecture. */
  fragments: {
    label: "Fragments",
    title: "Fragments",
    items: [
      { id: "robe",       kind: "image", name: "robe",    w: 1020, h: 1280, layout: "a",  alt: "Marilyn en robe aux motifs de flammes orange, appuyée contre une porte en bois, près d'un grand miroir rond.", fig: "Fig. 01", text: "Orange, bois, lumière douce." },
      { id: "rayures",    kind: "image", name: "rayures", w: 960,  h: 1280, layout: "b",  alt: "Marilyn en chemise rayée bleu et blanc, la tête posée sur la main, le regard tranquille.", fig: "Fig. 02", text: "Le calme avant la blague." },
      { id: "ombre",      kind: "image", name: "ombre",   w: 1280, h: 960,  layout: "wa", alt: "Autoportrait en noir et blanc : Marilyn, la main dans ses longues tresses, devant une ouverture lumineuse.", fig: "Fig. 03", text: "En noir et blanc, rien d'autre que le regard." },
      { id: "capuche",    kind: "image", name: "capuche", w: 720,  h: 1280, layout: "c",  alt: "Marilyn en sweat à capuche bleu marine, qui fait la grimace face à la caméra, un poing levé.", fig: "Fig. 04", text: "Sans commentaire." },
      { id: "restaurant", kind: "video", name: "v-restaurant", w: 464, h: 624, autoplay: true, layout: "d", alt: "Marilyn de profil devant des affiches rétro, dans un restaurant, qui sourit.", fig: "Séq. 01", text: "Une pause, un grand sourire." },
      { id: "miroir",     kind: "video", name: "v-miroir", w: 1024, h: 576, autoplay: false, layout: "wb", alt: "Marilyn se filme dans un miroir, téléphone à la main.", fig: "Séq. 02", text: "Dans le miroir." },
      { id: "rochers",    kind: "image", name: "rochers", w: 960,  h: 1280, layout: "a",  alt: "Marilyn assise sur des rochers face à la mer, sous un ciel nuageux.", fig: "Fig. 05", text: "Face à la mer, comme chez elle." },
      { id: "victoire",   kind: "video", name: "v-victoire", w: 576, h: 1024, autoplay: true, layout: "b", alt: "Marilyn fait le signe de la paix avec la main et une petite moue.", fig: "Séq. 03", text: "Deux doigts levés." },
      { id: "rose",       kind: "video", name: "v-rose",  w: 812,  h: 528,  autoplay: true, layout: "wa", alt: "Marilyn se filme de près, en haut rose, le regard calme.", fig: "Séq. 04", text: "Un instant, sans filtre." },
      { id: "enfance",    kind: "image", name: "enfance", w: 492,  h: 790,  layout: "c",  alt: "Marilyn enfant, en haut rose et jean, les mains tendues, des tresses ornées de perles.", fig: "Fig. 06", text: "Déjà cette assurance." },
      { id: "afro",       kind: "image", name: "afro",    w: 720,  h: 960,  layout: "d",  alt: "Marilyn enfant, sourire éclatant et mains sur les hanches, avec une grande coiffure naturelle.", fig: "Fig. 07", text: "Déjà ce sourire-là." },
      { id: "ambre",      kind: "video", name: "v-ambre", w: 880,  h: 576,  autoplay: false, layout: "wb", alt: "Marilyn en haut jaune pâle, dans la lumière chaude d'une soirée.", fig: "Séq. 05", text: "Lumière chaude." },
      { id: "bleu",       kind: "image", name: "bleu",    w: 1280, h: 720,  layout: "wa", alt: "Marilyn dans une lumière bleue, le regard à la caméra, la tête légèrement inclinée.", fig: "Fig. 08", text: "Heure bleue." },
      { id: "fresque",    kind: "video", name: "v-fresque", w: 1024, h: 576, autoplay: false, layout: "wb", alt: "Marilyn devant une fresque colorée, le regard au loin.", fig: "Séq. 06", text: "Même endroit, autre angle." }
    ],
    play: "Lire la vidéo",
    pause: "Mettre la vidéo en pause"
  },

  /* 05 — PLAYLIST
     "src"     = fichier audio local, à déposer dans le dossier audio/ (lecture fiable, recommandé).
                 Si le fichier est absent, le lecteur essaie YouTube.
     "youtube" = identifiant de la vidéo (la partie après v= dans l'adresse).
     "expect"  = mot(s) attendu(s) dans le titre de la vidéo. Si le titre ne correspond pas,
                 le lecteur passe au morceau suivant (protège d'un mauvais identifiant).
     "note"    = la phrase sous le titre. */
  playlist: {
    label: "Playlist",
    title: "Bande-son",
    intro: "Six morceaux, choisis pour toi. Dans l'ordre.",
    tracks: [
      { title: "Happy Birthday", src: "audio/Happy_Birthday_-_Bebi_Philip___Clip_Officiel__(256k).mp3",        artist: "Bebi philip",       youtube: "ZBkIne1z52w", expect: ["birthday"],        note: "Pour ouvrir l'édition comme il se doit." },
      { title: "Celebration", src: "audio/Kool___The_Gang_-_Celebration(256k).mp3",           artist: "Kool & The Gang",     youtube: "3GwjfUFyY6M", expect: ["celebration"],     note: "Aujourd'hui, la fête, c'est toi." },
      { title: "Lovely Day", src: "audio/Bill_Withers_-_Lovely_Day__Official_Audio_(256k).mp3",            artist: "Bill Withers",        youtube: "bEeaS6fuUoA", expect: ["lovely day"],      note: "Une journée plus belle quand tu es là. C'est simple." },
      { title: "Girl on Fire", src: "audio/Alicia_Keys_-_Girl_on_Fire__Official_Video_(256k).mp3",          artist: "Alicia Keys",         youtube: "J91ti_MpdHA", expect: ["girl on fire"],    note: "Parce que certaines personnes éclairent sans le savoir." },
      { title: "Dis Moi", src: "audio/Fally_Ipupa_-_Dis-moi__Clip_non_officiel_(48k).mp3", artist: "Falli ipupa",    youtube: "Nm8cAZbxO1M", expect: ["Dis moi"], note: "Le monde est un peu plus beau avec des gens comme toi dedans." },
      { title: "Stand by Me", src: "audio/Ben_E._King_-_Stand_By_Me__Audio_(256k).mp3",           artist: "Ben E. King",         youtube: "hwZNL7QVJjE", expect: ["stand by me"],     note: "Une promesse simple : tu peux compter sur moi." }
    ],
    credits: "Lecture via les fichiers audio de cette édition ; YouTube prend le relais si un fichier est indisponible.",
    nowPlaying: "En lecture",
    paused: "En pause",
    prev: "Morceau précédent",
    next: "Morceau suivant",
    play: "Lecture",
    pause: "Pause",
    listen: "Écouter sur YouTube",
    unavailable: "Ce titre ne peut pas être lu ici."
  },

  /* 06 — CE QUE TU FAIS SANS T'EN RENDRE COMPTE
     Une ligne = un fait observé. Entre 5 et 10 lignes.
     Tant que la liste est vide, la section n'apparaît pas. */
  observations: {
    label: "Index",
    title: "Ce que tu fais sans t'en rendre compte",
    items: [
      "Tu dis « deux minutes » et la pause en dure vingt.",
      "Tu restes calme, puis tu lâches la phrase qui fait rire tout le monde.",
      "Tu fais la grimace exprès, juste pour qu'on rie.",
      "Tu es là au bon moment, sans qu'on ait eu besoin de demander.",
      "Tu rends les lundis un peu plus faciles.",
      "Tu as un sourire qui change l'ambiance d'une pièce.",
      "Tu es encore plus drôle quand tu essaies de rester sérieuse.",
      "Tu fais sentir aux gens qu'ils comptent, sans en faire une affaire.",
      "Tu gardes ton calme quand tout s'accélère.",
      "Tu laisses, partout où tu passes, quelque chose de plus léger."
    ]
  },

  /* 07 — LETTRE
     "detail" : complète la phrase « Tu as cette façon de … que tout le monde finit par remarquer. »
     Laisse "" pour supprimer la phrase entière. */
  lettre: {
    label: "Lettre",
    title: "Une lettre, pour toi.",
    greeting: "Marilyn,",
    detail: "être là au bon moment, sans en faire une histoire,",
    before: [
      "Au stage, on partage surtout des tâches, des mails et des delais qu'on trouve très petits. Avec toi, c'est aussi des pauses qui durent un peu trop longtemps, des fous rires pour rien, et des journées qui passent plus vite. Je ne sais pas si tu t'en rends compte, mais tu rends les choses plus simples quand tu es là.",
      "Il y a des gens qu'on apprécie, et d'autres, plus rares, dont on remarque la présence autant que l'absence. Tu fais partie des deuxièmes."
    ],
    after: [
      "Il y a des choses qu'on ne dit pas toujours, mais ça ne les rend pas moins vraies : tu comptes. Plus que tu ne le crois.",
      "Aujourd'hui, tu as 20 ans. Je te souhaite de garder cette légèreté et cette force, de croire en ce que tu construis, et de ne jamais douter de la place que tu mérites.",
      "Merci d'être toi, tout simplement. J'ai hâte de voir ce que cette année va te réserver."
    ],
    signature: "CITRON",
    ps: "P.S. — Les personnes comme toi ne devraient jamais douter de la trace qu'elles laissent."
  },

  /* 08 — LE VŒU */
  voeu: {
    label: "Le vœu",
    title: "Fais un vœu. Celui-là, on ne le dit pas.",
    hint: "Touche une bougie pour la souffler, ou maintiens le gâteau.",
    candles: 4,
    candleLabel: "Souffler la bougie",
    done: "Joyeux anniversaire, Marilyn.",
    after: "Que celui-là se réalise.",
    replay: "Rejouer l'édition"
  },

  /* 09 — COLOPHON */
  colophon: {
    label: "Colophon",
    date: "23 octobre 2026",
    text: "Édition privée — non indexée — tirée à un seul exemplaire. Aucune réimpression prévue.",
    drawerButton: "Un dernier mot",
    drawer: "Merci d'exister. Et ne change rien."
  }
};
