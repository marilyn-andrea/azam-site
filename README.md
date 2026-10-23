# Marilyn — Édition 20

Site d'anniversaire privé, une seule page, HTML/CSS/JS sans dépendance, sans backend.
Concept : « ÉDITION 20 · TIRAGE N° 01/01 », un magazine tiré à un seul exemplaire.

## Arborescence

```
index.html          page unique (le contenu est rendu par js/main.js)
content.js          TOUS les textes (à modifier ici)
css/style.css       direction artistique
js/main.js          rendu + interactions (seuil, lecteur, vidéos, vœu, tiroir)
images/             cover, archive, robe, rayures, capuche, afro, ombre, rochers, enfance, bleu (.webp + .jpg)
videos/             6 vidéos muettes + posters (restaurant, victoire, miroir, fresque, rose, ambre)
audio/              dossier réservé (voir « Musique »)
fonts/              Fraunces + Manrope, auto-hébergées
robots.txt, vercel.json, _headers   confidentialité (noindex) et cache
```

## Personnaliser (tout se passe dans `content.js`)

| Pour… | Modifie |
|---|---|
| Compléter la phrase de la lettre « Tu as cette façon de … que tout le monde finit par remarquer. » | `lettre.detail` (ex. `"tout rendre plus simple quand ça se complique"`). Laisse `""` : la phrase disparaît. |
| Afficher la section « Ce que tu fais sans t'en rendre compte » | remplis `observations.items` (5 à 10 lignes courtes, un fait observé par ligne). Liste vide = section supprimée, la numérotation 01/08 s'adapte seule. |
| Écrire de vraies légendes de photos | `fragments.items[].text` (date, lieu, souvenir). |
| Remplacer les « liner notes » par de vrais souvenirs | `playlist.tracks[].note`. |
| Changer de morceau | `playlist.tracks[]` : titre, artiste et `youtube` (la partie après `v=` dans l'adresse). |
| Ajouter la pensée de marge de ton choix | `marginalia.afterEdito`, `marginalia.afterFragments`. |
| Changer la signature | `edito.signature` et `lettre.signature` (actuellement « TITONOU »). |

Aucun texte vide ni contenant des crochets `[...]` n'est affiché.

## Remplacer les médias

- **Photos** : dépose un JPG dans `images/` (largeur max 1600 px). Génère aussi la version WebP :
  `cwebp -q 78 images/ma-photo.jpg -o images/ma-photo.webp` (ou ImageMagick : `magick ma-photo.jpg -quality 78 ma-photo.webp`).
  Garde le même nom que dans `content.js` (`name`), ou change `name`, `w`, `h` et `alt`.
- **Vidéos** : `ffmpeg -i source.mp4 -an -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 29 -pix_fmt yuv420p -movflags +faststart videos/nom.mp4`
  puis le poster : `ffmpeg -ss 0.8 -i source.mp4 -frames:v 1 -q:v 4 videos/nom-poster.jpg`.
- La couverture (`images/cover.*`) est affichée en noir et blanc par le CSS.

## Musique

Aucun audio n'est téléchargé ni extrait. Le lecteur utilise les vidéos YouTube officielles (embed `youtube-nocookie`),
chargées **au premier clic** seulement (« Ouvrir avec le son » ou un bouton de lecture). Volume de départ : 40 %.

Bande-son actuelle (6 titres, dans l'ordre) : Stevie Wonder « Happy Birthday », Kool & The Gang « Celebration »,
Bill Withers « Lovely Day », Alicia Keys « Girl on Fire », Louis Armstrong « What a Wonderful World », Ben E. King « Stand by Me ».

Garde-fou : chaque titre a un champ `expect` dans `content.js`. Si le titre de la vidéo chargée ne contient pas ce mot,
le lecteur passe au morceau suivant (cela évite de jouer une mauvaise vidéo si un identifiant est faux).
Si un titre refuse d'être lu en intégré, il passe aussi au suivant et propose « Écouter sur YouTube ».
Sur iPhone, si la musique ne démarre pas toute seule, un appui sur ▶ dans le lecteur en bas suffit.

> **À vérifier avant l'envoi** : ouvre le site avec internet, écoute chacun des 6 titres et contrôle que c'est la bonne version.
> Pour changer un morceau : modifie `youtube` (identifiant après `v=`), `title`, `artist` et `expect` dans `playlist.tracks[]`.

## Déployer

**GitHub Pages** : le workflow `.github/workflows/deploy.yml` publie automatiquement le site à chaque push sur `main`. Dans les paramètres du dépôt, choisis *Pages → Build and deployment → GitHub Actions*. Après le premier déploiement, le site sera disponible à l'adresse `https://<utilisateur>.github.io/azam-site/`.

**Netlify** (le plus simple) : va sur app.netlify.com/drop, glisse le dossier complet, puis dans *Site configuration → Change site name*, donne un nom long et aléatoire (ex. `m20-k7q3x9v2`).

**Vercel** : `npx vercel --prod` depuis ce dossier, ou import d'un dépôt Git. Choisis un nom de projet aléatoire.

`noindex, nofollow` est présent dans la page et, sur Netlify/Vercel, dans les en-têtes HTTP ; aucun sitemap n'existe,
et la carte de partage WhatsApp affiche seulement « Une surprise pour toi » (sans photo, sans nom, sans nom d'entreprise).
Attention : GitHub Pages est public et `noindex` n'empêche pas l'accès au site ; toute personne ayant l'URL peut le consulter.
Pour un partage privé, utilise plutôt une adresse longue et aléatoire sur Netlify ou Vercel.

## Test rapide avant envoi

1. Ouvre le lien sur ton téléphone (Safari iOS ou Chrome Android) : le seuil s'affiche, « Ouvrir avec le son » lance le premier titre.
2. Fais défiler : chaque section se révèle doucement ; les 2 vidéos « Séq. 01-02 » se lancent muettes, les 2 autres au clic.
3. Fais défiler les 14 fragments (photos et vidéos) puis souffle les 4 bougies (au clic, ou en maintenant le doigt sur le gâteau) : confettis dorés une fois, puis « Joyeux anniversaire, Marilyn. ».
4. Ouvre l'astérisque doré du colophon.
5. « Rejouer l'édition » remet tout à zéro.

## Accessibilité et performance

Contraste AA, focus visibles, navigation clavier (bougies incluses), `prefers-reduced-motion` respecté (pas de rideau animé, pas de confettis, vidéos au clic),
images WebP + JPEG, lazy loading, dimensions déclarées (pas de décalage de mise en page), aucune librairie JavaScript.
Poids total d'environ 3 Mo.
