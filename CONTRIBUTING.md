# Guide de contribution

## Table des matières

- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)
- 🏗️ [Construit avec](#construit-avec)

## Prérequis

- [Git](https://git-scm.com/) : Système de contrôle de versions distribué d'un ensemble de fichiers
- [Node](https://nodejs.org/) : Environnement d'exécution pour Javascript, en version 20 ou supérieure
- [pnpm](https://pnpm.io/) : Gestionnaire de paquets, dont la version attendue est déclarée par le champ `packageManager`

> Node peut être installé via [nvm](https://github.com/nvm-sh/nvm) qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande. pnpm s'active ensuite par `corepack enable`.

## Installation

### Mise en place des sources et des dépendances

Cloner le dépôt en local

```bash
git clone git@github.com:anct-cartographie-nationale/lieux-de-mediation-numerique.git
```

Aller dans le dossier du projet pour installer les dépendances

```bash
cd lieux-de-mediation-numerique
pnpm install
```

### Hooks git

[Husky](https://typicode.github.io/husky) installe les hooks git du dépôt. Le script `prepare`
s'en charge à l'installation des dépendances ; il n'y a rien de plus à faire.

- `pre-commit` passe Biome sur les fichiers indexés puis vérifie le cloisonnement des modules ;
- `commit-msg` vérifie que le message suit les Commits Conventionnels.

## Utilisation

Ces commandes servent dans un contexte de développement de l'application.

| Commande                 | Ce qu'elle fait                                                                                                               |
|--------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `pnpm build`             | construit la bibliothèque avec tsdown ; le résultat est dans `lib/`                                                           |
| `pnpm test`              | lance Vitest — en mode surveillance en local, en passe unique en CI                                                           |
| `pnpm lint`              | analyse statique et mise en forme, par Biome                                                                                  |
| `pnpm lint.fix`          | la même chose, en corrigeant ce qui peut l'être                                                                               |
| `pnpm lint.architecture` | vérifie le cloisonnement des modules, par dependency-cruiser                                                                  |
| `pnpm ts.check`          | vérifie les types, **tests compris** — ce que la construction ne fait pas, puisqu'elle ne type que ce qui part dans le paquet |
| `pnpm lint.commit`       | valide les messages de commit depuis la dernière version commune avec `main`                                                  |
| `pnpm lint.publish`      | vérifie le paquet tel que npm le recevra, par `publint` et `@arethetypeswrong/cli`                                            |

> Les dépendances de développement sont alignées sur celles de mednum-cli, et Biome comme tsdown
> y sont **épinglés exactement** : un correctif de linter ou de constructeur change la mise en
> forme ou la sortie sans prévenir, et fait rougir une CI sur du code qu'on n'a pas touché.
>
> `pnpm-workspace.yaml` porte `minimumReleaseAge: 14400` — dix jours. Une version publiée
> récemment ne s'installe pas ; c'est un garde-fou de chaîne d'approvisionnement délibéré, à ne
> pas contourner.

> Le champ `version` de `package.json` vaut `0.0.0-development` : c'est semantic-release qui
> écrit la vraie version au moment de publier. Sans lui, `npm pack` refuse de travailler et
> `pnpm lint.publish` ne peut pas s'exécuter.

## Contribution

### Nommage des branches

- Avant de créer une nouvelle branche de travail, récupérer les dernières modifications disponibles sur la branche `main`
- La nouvelle branche de travail doit ête préfixée par `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` ou `test/` en fonction du type de modification prévu, pour plus de détails à ce sujet, consulter [Conventional Commits cheat sheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)

### Commits

#### Convention

Les commits de ce repository doivent respecter la syntaxe décrite par la spécification des [Commits Conventionnels](https://www.conventionalcommits.org/fr)

#### Signature

La branche `main`, ainsi que l'ensemble des branches de travail avec un préfixe valide requièrent que les commits soient signés :

- La documentation de GitHub indique comment [configurer la signature des commits](https://docs.github.com/en/enterprise-server@3.5/authentication/managing-commit-signature-verification/about-commit-signature-verification)
- Les utilisateurs de [keybase](https://keybase.io/) peuvent [signer leurs commits avec leur clé GPG sur Keybase](https://stephenreescarter.net/signing-git-commits-with-a-keybase-gpg-key/)

### Contribuer sur la branche principale

- La branche principale est `main`, il n'est pas possible de publier en faisant un `push` depuis un dépôt local
- Il faut forcément créer une nouvelle branche de travail avec l'un préfixe autorisé
- À chaque publication sur une branche de travail, le workflow `validate` sur [github actions](https://github.com/anct-cartographie-nationale/lieux-de-mediation-numerique/actions) vérifie
  - Que la mise en forme et les règles de [Biome](https://biomejs.dev/) sont respectées
  - Que le cloisonnement des modules tient
  - Que les types sont justes, tests compris
  - Que les messages des commits suivent le standard établi par [Conventional Commits](https://www.conventionalcommits.org/fr)
  - Que les tests passent
  - Qu'il est possible de créer un build sans erreur
  - Que le paquet est correct tel que npm le recevra
- Une fois les développements terminés, il faut créer une [pull request](https://github.com/anct-cartographie-nationale/lieux-de-mediation-numerique/pulls) avec la banche de travail comme origin et la branche `main` comme destination.
- La pull request ne peut être fusionné que si :
  - Les étapes du workflow `validate` sont valides
  - Les fichiers modifiés ont été revus par au moins une personne
  - Les commits ajoutés sont signés
- La branche de travail est supprimée automatiquement une fois qu'elle a été fusionnée

### Publier la bibliothèque

La fusion sur la branche principale entraîne automatiquement la publication d'une nouvelle version du paquet sur le registre NPM.

## Construit avec

### langages & Frameworks

- [TypeScript](https://www.typescriptlang.org/) est un langage open source construit à partir de JavaScript

### Outils

#### CLI

- [Vitest](https://vitest.dev/) est une boîte à outils pour écrire des tests automatisés en JavaScript
- [Biome](https://biomejs.dev/) est un analyseur statique et un formateur, qui tient le rôle qu'ESLint et Prettier tenaient à deux
- [tsdown](https://tsdown.dev/) construit le paquet et ses déclarations de types, en CommonJS et en ESM
- [publint](https://publint.dev/) et [@arethetypeswrong/cli](https://arethetypeswrong.github.io/) vérifient le paquet tel qu'un consommateur le recevra
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) vérifie mécaniquement le cloisonnement des modules
- [Zod](https://zod.dev/) porte les schémas dont chaque modèle est tiré
- [Husky](https://typicode.github.io/husky/#/) est un outil qui permet d'effectuer des vérifications automatiques avant de publier des contributions.
- [Commitlint](https://github.com/conventional-changelog/commitlint) est un outil de vérification des commits suivant le [format des Commits Conventionnels](https://www.conventionalcommits.org/fr/v1.0.0/).
- [Lint-staged](https://github.com/okonet/lint-staged) est un outil qui permet d'effectuer un ensemble de vérifications à l'aide d'autres outils sur un ensemble de fichiers qui viennent d'être modifiés.

#### CI/CD

- [Github Actions](https://docs.github.com/en/actions) est l'outil d'intégration et de déploiement continu intégré à GitHub
  - L'historique des déploiements est disponible [sous l'onglet Actions](https://github.com/anct-cartographie-nationale/lieux-de-mediation-numerique/actions/)
- Secrets du dépôt :
  - `NODE_AUTH_TOKEN` : Clé d'accès NPM pour publier sur l'organisation [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)

#### Déploiement

- [npm](https://www.npmjs.com/) est le registre de référence pour les paquets Node.
  - Organisation : [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)
  - Paquet : [@gouvfr-anct/mediation-numerique](https://www.npmjs.com/package/@gouvfr-anct/lieux-de-mediation-numerique)
