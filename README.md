# Lieux de médiation numérique

## À propos

📚 Bibliothèque pour la modélisation des lieux de médiation numérique respectant le standard du [schéma de données des lieux de médiation numériques](https://lamednum.coop/schema-de-donnees-des-lieux-de-mediation-numerique-2/)

Elle porte ce qui doit être **dit une seule fois** pour les trois produits qui la consomment — la cartographie nationale, `mednum-cli` et la coop : le modèle d'un lieu, les règles qui rendent une donnée publiable, les schémas qui la valident, et les comparaisons qui détectent les doublons.

## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🧩 [Modèle](#modèle)
- 🧽 [Nettoyage](#nettoyage)
- ✅ [Validation](#validation)
- 👯 [Déduplication](#déduplication)
- 🔁 [Transfert](#transfert)
- 🤝 [Contribution](#contribution)
- 🏷️ [Gestion des versions](#gestion-des-versions)
- 📝 [Licence](#licence)

## Prérequis

- [Node](https://nodejs.org/) : environnement d'exécution pour JavaScript, en version 20 ou supérieure
- [pnpm](https://pnpm.io/) : gestionnaire de paquets, dont la version attendue est déclarée par le champ `packageManager`

> Node peut être installé via [nvm](https://github.com/nvm-sh/nvm), qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande. pnpm s'active ensuite par `corepack enable`.

## Installation

```bash
pnpm add @gouvfr-anct/lieux-de-mediation-numerique
```

```bash
npm install @gouvfr-anct/lieux-de-mediation-numerique
```

## Modèle

Un modèle n'a qu'une source de vérité : **son schéma [zod](https://zod.dev)**. `defineModel` en tire tout le reste, et une déclaration suffit.

```ts
import { Siret } from '@gouvfr-anct/lieux-de-mediation-numerique';

Siret('435 754 343 00018'); // '43575434300018', de type Siret
Siret('12345678910111'); // lève une ZodError : la clé de contrôle est fausse
```

Chaque modèle expose quatre choses, et leur accord est garanti par construction :

| Porte | Ce qu'elle fait | Quand la prendre |
| --- | --- | --- |
| `Modele(valeur)` | valide, met en forme, et **lève** une `ZodError` | quand une donnée invalide n'a pas de suite possible |
| `Modele.safe(valeur)` | la même chose, mais rend `null` au lieu de lever | aux frontières d'ingestion : un champ facultatif invalide perd sa valeur, le lieu reste |
| `Modele.schema` | le schéma zod, composable | pour bâtir le schéma d'un autre modèle ou d'un assemblage |
| `Model.TypeOf<typeof Modele>` | le type de sortie, **marqué** | pour qu'aucun littéral ne puisse se faire passer pour une valeur validée |

```ts
import { Horaires } from '@gouvfr-anct/lieux-de-mediation-numerique';

// Un horaire illisible ne doit pas faire disparaître un lieu de la carte.
const horaires = Horaires.safe(brut);
const lieu = { ...reste, ...(horaires == null ? {} : { horaires }) };
```

### Des types qui ne mentent pas

Le type de sortie porte la marque zod du modèle. Elle est **fantôme** : elle ne change ni la représentation, ni `Object.keys`, ni ce que `JSON.stringify` écrit — un `Siret` reste une chaîne, une `Adresse` reste l'objet qu'on lit. Elle n'ajoute qu'une chose : l'impossibilité de faire passer une valeur quelconque pour un modèle sans être passé par son constructeur.

```ts
const pivot: Siret = '00000000000000'; // refusé à la compilation
const pivot: Siret = Siret(brut); // la seule voie
```

### Composer plutôt que redire

Un modèle composite imbrique le `.schema` de ses parties, il ne réécrit pas leurs règles. Une adresse fautive sur quatre champs rend donc **quatre erreurs en une passe**, chacune désignée par son chemin — là où un constructeur qui teste champ après champ s'arrête à la première, et fait découvrir les suivantes une par une.

```ts
const resultat = Adresse.schema.safeParse({ voie: '', code_postal: '999', code_insee: '96001', commune: 'Reims!!' });

resultat.error.issues.map((probleme) => probleme.path.join('.'));
// ['voie', 'code_postal', 'code_insee', 'commune']
```

### Déclarer un modèle

```ts
import { defineModel, type Model } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { z } from 'zod';

export const CodePostal = defineModel(z.string().regex(/^\d{5}$/u, { error: 'Le code postal doit être composé de 5 chiffres' }).brand('CodePostal'));

export type CodePostal = Model.TypeOf<typeof CodePostal>;
```

La mise en forme canonique — espaces retirés, doublons écartés, casse ramenée — se pose **dans** le schéma, jamais autour de lui. La raison est structurelle : `.schema` est fait pour être composé, et tout ce qui vivrait à côté serait silencieusement contourné dès l'imbrication. `defineModel` n'accepte donc aucun préprocesseur.

## Nettoyage

Réparer n'est pas valider. Les fonctions de `nettoyage` sont **pures**, sans dépendance à la validation, et rendent une chaîne dont rien ne garantit qu'elle soit valide : c'est ce qui permet de normaliser une adresse pour interroger un géocodeur sans avoir à la valider d'abord.

```ts
import { nettoyerCodePostal, nettoyerTelephone, telephoneCanonique } from '@gouvfr-anct/lieux-de-mediation-numerique';

nettoyerCodePostal('1300'); // '01300' — le zéro initial perdu par un tableur
nettoyerTelephone('97400')('0262 12 34 56'); // le numéro débarrassé de ce qui l'empêche d'être analysé
telephoneCanonique('01 02 03 04 05'); // '+33102030405', ou null si ce n'en est pas un
```

Chaque famille expose ses règles (`REGLES_VOIE`, `REGLES_NOM`, `REGLES_COURRIEL`…) sous forme de `RegleDeNettoyage`, et le moteur `appliquerRegles` les enchaîne. Un consommateur qui a besoin d'une règle de plus compose la sienne sans avoir à réécrire les autres.

## Validation

Les schémas de champ sont ceux des modèles ; un **assemblage** dit ce qu'un usage donné exige d'un lieu entier. `LieuPourLaCartographieSchema` est celui de la cartographie nationale, et n'ajoute que ce qui tient à cet usage — au moins un service.

```ts
import { LieuPourLaCartographieSchema } from '@gouvfr-anct/lieux-de-mediation-numerique';

const resultat = LieuPourLaCartographieSchema.safeParse(lieu);
resultat.success ? publier(resultat.data) : rapporter(resultat.error.issues);
```

Un autre produit compose les mêmes briques dans son propre assemblage, sans avoir à relâcher celui-là.

## Déduplication

Les comparaisons qui décident que deux lieux n'en font qu'un.

```ts
import { comparer, distanceEnMetres, memeCommune, typologiesDepuisNom } from '@gouvfr-anct/lieux-de-mediation-numerique';
```

`normaliserNom` et `normaliserAdresse` fabriquent une **clé de comparaison** destructrice, qui n'est jamais publiée — à ne pas confondre avec les fonctions de nettoyage, qui préservent le sens de la valeur. Les deux familles portent des verbes distincts pour que personne n'ait à deviner laquelle il appelle.

## Transfert

Les conversions depuis et vers les schémas d'échange : le [schéma des lieux de médiation numérique](https://lamednum.coop/schema-de-donnees-des-lieux-de-mediation-numerique-2/) dans sa forme tabulaire, et le [schéma data.inclusion](https://www.data.inclusion.beta.gouv.fr/).

```ts
import { fromSchemaDataInclusion, toSchemaLieuxDeMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
```

## Contribution

Voir le [guide de contribution](./CONTRIBUTING.md) du dépôt.

## Gestion des versions

Afin de maintenir un cycle de publication clair et de favoriser la rétrocompatibilité, la dénomination des versions suit la spécification décrite par la [Gestion sémantique de version](https://semver.org/lang/fr/)

Les versions disponibles ainsi que les journaux décrivant les changements apportés sont disponibles depuis [la page des Releases](https://github.com/anct-cartographie-nationale/lieux-de-mediation-numerique/releases).

## Licence

Voir le fichier [LICENSE.md](./LICENSE.md) du dépôt.
