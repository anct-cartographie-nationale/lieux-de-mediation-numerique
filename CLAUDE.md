# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Ce qu'est ce dépôt

`@gouvfr-anct/lieux-de-mediation-numerique` : une **bibliothèque** publiée sur npm, sans exécutable ni
application. Elle porte ce qui doit être dit une seule fois pour ses trois consommateurs — la cartographie
nationale, `mednum-cli` et la coop : le modèle d'un lieu, les règles qui rendent une donnée publiable, les
schémas qui la valident, les comparaisons qui détectent les doublons, les conversions depuis et vers les
schémas d'échange.

Le code, les identifiants, les commentaires et les messages d'erreur sont **en français** ; le vocabulaire
suit celui du [schéma de données](https://lamednum.coop/schema-de-donnees-des-lieux-de-mediation-numerique-2/)
(`pivot`, `frais_a_charge`, `modalites_acces`…). S'y tenir plutôt que traduire.

## Commandes

| Commande                                         | Ce qu'elle fait                                                                                         |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `pnpm test`                                      | Vitest — surveillance en local, passe unique en CI                                                      |
| `pnpm vitest run src/models/siret/siret.spec.ts` | un seul fichier de test                                                                                 |
| `pnpm vitest run -t 'refuse un siret'`           | un seul cas, par son intitulé                                                                           |
| `pnpm lint` / `pnpm lint.fix`                    | Biome (analyse + mise en forme)                                                                         |
| `pnpm lint.architecture`                         | cloisonnement des modules (dependency-cruiser)                                                          |
| `pnpm ts.check`                                  | types, **tests compris** — la construction ne type que ce qui part dans le paquet                       |
| `pnpm build`                                     | tsdown → `lib/` (ESM + CJS + déclarations)                                                              |
| `pnpm lint.publish`                              | le paquet tel que npm le recevra (`publint`, `@arethetypeswrong/cli`) ; exige un `pnpm build` préalable |
| `pnpm lint.commit`                               | messages de commit depuis `origin/main` (Commits Conventionnels)                                        |

Le hook `pre-commit` passe `lint-staged` puis `lint.architecture` ; `commit-msg` passe commitlint. La CI
(`.github/workflows/validate.yml`) rejoue tout, et les tests sur Node 22 **et** 24.

## Architecture

Cinq modules sous `src/`, chacun avec un `index.ts` qui réexporte, et `src/index.ts` qui réexporte les cinq.

- **`models`** — le socle. Un dossier par modèle, `defineModel` pour chacun. Ne dépend d'aucun autre module.
- **`nettoyage`** — fonctions pures qui réparent une valeur abîmée. Ne dépend **que** de `models`. Le résultat
  n'est pas garanti valide : c'est ce qui permet de normaliser une adresse pour interroger un géocodeur sans
  rien exiger d'elle.
- **`validation`** — les *assemblages* : ce qu'un usage donné exige d'un lieu entier
  (`LieuPourLaCartographieSchema`). Ils composent les `.schema` des modèles et n'ajoutent que ce qui tient à
  l'usage, jamais une règle de champ.
- **`deduplication`** — les comparaisons qui décident que deux lieux n'en font qu'un.
- **`transfer`** — conversions depuis/vers le schéma tabulaire des lieux de médiation numérique et le schéma
  data·inclusion. Dernier maillon : personne ne dépend de lui.

Ce cloisonnement n'est pas une convention orale, il est vérifié par `.dependency-cruiser.cjs` :
`models` → rien, `nettoyage` → `models` seul, `validation`/`deduplication` → pas de `transfer`.
`scripts/lint-architecture.mjs` enveloppe `depcruise` parce que celui-ci **sort en 0 quand il n'a lu aucun
module** ; le script échoue en dessous de 100 modules analysés. Ne pas appeler `depcruise` directement.

### Le contrat d'un modèle

`defineModel(schema)` rend un objet appelable exposant quatre portes : `Modele(v)` qui lève une `ZodError`,
`Modele.safe(v)` qui rend `null`, `Modele.schema` qui se compose, et `Model.TypeOf<typeof Modele>` pour le
type de sortie marqué (`.brand(...)`).

Deux règles en découlent, et elles sont structurelles :

1. **Toute mise en forme canonique vit dans le schéma** (`.transform`, méthodes zod), jamais dans le
   constructeur. `defineModel` n'accepte délibérément aucun préprocesseur : ce qui vivrait à côté du schéma
   serait silencieusement contourné dès que `.schema` est imbriqué ailleurs.
2. **Un modèle composite imbrique les `.schema` de ses parties**, il ne réécrit pas leurs règles — c'est ce
   qui rend toutes les erreurs d'une adresse en une passe, chacune avec son chemin.

### L'ordre d'une liste n'est pas une information

Toute liste publiée est **dédoublonnée et ordonnée** par `sansDoublons` puis `triee` (`models/liste.ts`),
avec la collation française — `Étudiants` se range auprès de `Femmes`, pas après le z. Cela vaut pour les dix
vocabulaires fermés comme pour `courriels` et `site_web`.

Sans cela, deux lieux identiques publiés dans un ordre de saisie différent produisent des chaînes différentes,
et toute comparaison de versions signale un changement qui n'en est pas un. Sur le jeu national, trois quarts
des lieux portaient au moins une liste non ordonnée.

Le prix est que **l'ordre cesse de porter une intention** : le premier courriel n'est plus le contact
principal. Un consommateur qui a besoin de cette distinction doit la demander par un champ, pas par une place
dans une liste. Corollaire à ne pas défaire : aucune conversion ne doit lire `.at(0)` d'une liste pour en tirer
une valeur unique — c'est le défaut que `fraisFromConditionAcces` portait, et qui faisait sortir « gratuit »
d'un lieu déclaré « payant » dès que le tri changeait l'ordre.

Nettoyer, valider et normaliser sont trois choses distinctes, et les verbes les séparent : `nettoyer*`
(`nettoyage`) préserve le sens et rend une valeur publiable ; `normaliser*` (`deduplication`) fabrique une clé
de comparaison destructrice qui n'est **jamais** publiée ; un modèle valide et met en forme.

## Conventions

- Un dossier par sujet, fichier du même nom, `index.ts` qui réexporte, `*.spec.ts` **à côté** de la source.
- `exactOptionalPropertyTypes` est actif : un champ facultatif s'écrit `champ?: T | undefined`, sinon la
  sortie d'un `.optional()` zod n'est pas assignable. `src/validation/validation.spec.ts` garde l'accord
  entre `LieuMediationNumerique` et les assemblages, et échoue sous `pnpm ts.check`.
- Biome : pas d'export par défaut dans `src`, pas de `console`, `import type` obligatoire, guillemets
  simples, pas de virgule finale, 128 colonnes. Les types de retour et de paramètres sont annotés
  explicitement partout, y compris dans les callbacks — suivre le style environnant.
- Tests : `describe`/`it` de Vitest, sans configuration dédiée (les valeurs par défaut suffisent).

## Pièges

- `biome` et `tsdown` sont **épinglés exactement** : ne pas les faire flotter, un correctif change la mise en
  forme ou la sortie et fait rougir une CI sur du code qu'on n'a pas touché.
- `pnpm-workspace.yaml` porte `minimumReleaseAge: 14400` (dix jours) : une version publiée récemment ne
  s'installe pas. Garde-fou de chaîne d'approvisionnement délibéré, à ne pas contourner.
- `version` vaut `0.0.0-development` : c'est semantic-release qui écrit la vraie version à la publication.
- Une branche de travail doit être préfixée (`feat/`, `fix/`, `refactor/`…) et ses commits signés ; la
  publication npm se déclenche à la fusion sur `main`.
