# Guide de contribution

## Table des matières

- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)
- 🏗️ [Construit avec](#construit-avec)

## Prérequis

- [Git](https://git-scm.com/) : Système de contrôle de versions distribué d'un ensemble de fichiers
- [Node](https://nodejs.org/) : Environnement d'exécution pour Javascript
- [Yarn](https://yarnpkg.com/) : Gestionnaire de paquets pour les produits développés dans des environnements Node

> Node et Yarn peuvent être installés via [nvm](https://github.com/nvm-sh/nvm) qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande.

## Installation

### Mise en place des sources et des dépendances

Cloner le dépôt en local

```bash
git clone git@github.com:anct-cartographie-nationale/lieux-de-mediation-numerique.git
```

Aller dans le dossier du projet pour installer les dépendances

```bash
cd lieux-de-mediation-numerique
yarn
```

### Installer Husky

[Husky](https://typicode.github.io/husky) est un outil de gestion des hooks git pour effectuer des tâches automatiques

```bash
yarn husky install
```

Rendre exécutable les fichiers qui contiennent les hooks :

```bash
chmod a+x .husky/commit-msg
chmod a+x .husky/pre-commit
```

## Utilisation

Ces commandes servent dans un contexte de développement de l'application.

### Construction de la bibliothèque

Exécuter `yarn build`, le résultat esy disponible dans le dossier `lib/`.

### Test

Exécuter `yarn test` pour tester le projet.

### ESLint

Exécuter `yarn lint.es` pour une analyse statique des fichiers `.ts` du projet.

### Commit lint

Exécuter `yarn lint.commit` pour valider la syntaxe de l'ensemble des commits réalisés depuis la dernière version commune avec la branche `main`.

### Prettier

Exécuter `yarn prettier` pour mettre à niveau la syntaxe de l'ensemble des fichiers du projet.

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
  - Qu'il est possible de créer un build sans erreur
  - Que la syntaxe correspond bien à ce qui est [défini par Prettier](https://github.com/anct-cartographie-nationale/client-base/blob/main/.prettierrc.json)
  - Que le code écrit en TypeScript respecte les conventions décrites par les [règles ESLint](https://github.com/anct-cartographie-nationale/client-base/blob/main/.eslintrc.json)
  - Que les messages des commits suivent le standard établi par [Conventional Commits](https://www.conventionalcommits.org/fr)
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

- [Jest](https://jestjs.io/) est une boîte à outils pour écrire des tests automatisés en JavaScript
- [Eslint](https://eslint.org/) est un analyseur statique de JavaScript
- [Prettier](https://prettier.io/) est un magnificateur de code source en JavaScript
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
