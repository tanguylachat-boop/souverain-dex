Je propose de repenser le hero pour que la 3D ressemble à une vraie scène produit premium, pas à des cartes posées en diagonale.

Plan d’implémentation :

1. Recomposer le hero en layout plus équilibré
- Garder le texte à gauche, mais réduire légèrement la largeur du titre pour éviter l’effet massif.
- Donner à la zone visuelle une vraie présence centrée à droite, avec une scène 3D contenue dans son espace.
- Éviter que les éléments flottants débordent trop ou paraissent mal alignés.

2. Remplacer la 3D actuelle par une scène “premium product deck”
- Créer un socle visuel sobre avec profondeur, ombre douce et perspective contrôlée.
- Utiliser l’image hardware comme panneau principal, plus grand et mieux cadré.
- Superposer le mockup produit comme interface secondaire, alignée proprement, avec une rotation plus subtile.
- Ajouter 2–3 micro-éléments premium utiles : badge “On-premise”, indicateur “nLPD”, mini-flux document → classement → relance.

3. Nettoyer le style 2026
- Réduire les blobs trop visibles et la grille qui donne un effet générique.
- Ajouter une lumière directionnelle plus élégante, des ombres plus réalistes et une hiérarchie plus suisse/premium.
- Garder une palette sobre : blanc, anthracite, bleu LX Studio, sans effet trop flashy.

4. Optimiser responsive
- Sur desktop : scène 3D à droite, stable, avec profondeur.
- Sur tablette : scène moins inclinée et mieux centrée.
- Sur mobile : empilement propre, sans éléments absolus qui se chevauchent.

Fichiers concernés :
- `src/components/landing/Hero.tsx`
- `src/styles.css` si besoin pour ajouter/remplacer les utilitaires 3D premium