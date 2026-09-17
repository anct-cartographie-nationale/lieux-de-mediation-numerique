/**
 * `TextDecoder` est un global standard, présent dans les navigateurs comme dans Node depuis la
 * version 11. La configuration de la bibliothèque déclare `lib: ["es2022"]` sans `dom` : on
 * déclare donc précisément ce dont on dépend, plutôt que de tirer tout `lib.dom` dans un paquet
 * qui n'a rien d'un document.
 */
declare const TextDecoder: {
  new (label?: string): { decode(entree?: Uint8Array): string };
};

/**
 * Relit une chaîne dont les octets UTF-8 avaient été pris pour du latin-1 : « Ã© » redevient
 * « é ». Une séquence qui n'a pas de sens devient U+FFFD plutôt que de lever — le nettoyage ne
 * lève jamais.
 */
export const relireCommeUtf8 = (abimee: string): string =>
  new TextDecoder('utf-8').decode(Uint8Array.from(abimee, (caractere: string): number => caractere.charCodeAt(0)));
