import type { z } from 'zod';

/**
 * Un modèle : un schéma, et les quatre portes qui y mènent.
 *
 * L'appel direct **lève** — c'est la forme partielle, celle qu'on prend quand une donnée
 * invalide n'a pas de suite possible. `.safe` rend `null` au lieu de lever — c'est la forme
 * totale, celle des frontières d'ingestion, où un champ facultatif invalide perd sa valeur
 * sans emporter le lieu (D21). `.schema` s'imbrique dans le schéma d'un autre modèle. Et le
 * type de sortie porte la marque de zod, qu'aucun littéral ne peut fabriquer.
 */
export interface Model<S extends z.ZodType> {
  (input: z.input<S>): z.output<S>;
  readonly schema: S;
  safe(input: z.input<S>): z.output<S> | null;
}

export namespace Model {
  export type TypeOf<M> = M extends Model<infer S> ? z.output<S> : never;
  export type InputOf<M> = M extends Model<infer S> ? z.input<S> : never;
}

/**
 * Un modèle n'a qu'une source de vérité : son schéma. La mise en forme canonique — espaces
 * retirés, doublons écartés, casse ramenée — se pose **dans** le schéma, par `.transform(…)`
 * ou par les méthodes de zod, et jamais autour de lui.
 *
 * La raison est structurelle : `.schema` est fait pour être composé dans le schéma d'un autre
 * modèle — `Adresse` imbrique `CodePostal.schema` et `CodeInsee.schema`. Tout ce qui vivrait
 * à côté du schéma, dans le constructeur, serait alors silencieusement contourné : la valeur
 * passerait par la validation sans passer par la mise en forme. C'est l'écart qu'on avait
 * déjà — `Siret()` retirait les espaces, `SiretSchema` les refusait. `defineModel` n'accepte
 * donc délibérément aucun préprocesseur : il n'existe qu'une seule façon de faire, et elle
 * survit à la composition.
 *
 * À ne pas confondre avec le **nettoyage** (`src/nettoyage`), qui reste dehors : réparer une
 * donnée abîmée — `Rue de la  paix,` — est un traitement qu'on doit pouvoir appliquer sans
 * rien valider, et dont le résultat n'est pas garanti valide (D1).
 */
export const defineModel = <S extends z.ZodType>(schema: S): Model<S> => {
  const safe = (input: z.input<S>): z.output<S> | null => {
    const result: z.ZodSafeParseResult<z.output<S>> = schema.safeParse(input);
    return result.success ? result.data : null;
  };

  return Object.assign((input: z.input<S>): z.output<S> => schema.parse(input), { schema, safe });
};
