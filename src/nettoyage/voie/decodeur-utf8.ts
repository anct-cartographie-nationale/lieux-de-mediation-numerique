declare const TextDecoder: {
  new (label?: string): { decode(entree?: Uint8Array): string };
};

export const relireCommeUtf8 = (abimee: string): string =>
  new TextDecoder('utf-8').decode(Uint8Array.from(abimee, (caractere: string): number => caractere.charCodeAt(0)));
