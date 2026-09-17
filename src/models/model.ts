import type { z } from 'zod';

export interface Model<S extends z.ZodType> {
  (input: z.input<S>): z.output<S>;
  readonly schema: S;
  safe(input: z.input<S>): z.output<S> | null;
}

export namespace Model {
  export type TypeOf<M> = M extends Model<infer S> ? z.output<S> : never;
  export type InputOf<M> = M extends Model<infer S> ? z.input<S> : never;
}

export const defineModel = <S extends z.ZodType>(schema: S): Model<S> => {
  const safe = (input: z.input<S>): z.output<S> | null => {
    const result: z.ZodSafeParseResult<z.output<S>> = schema.safeParse(input);
    return result.success ? result.data : null;
  };

  return Object.assign((input: z.input<S>): z.output<S> => schema.parse(input), { schema, safe });
};
