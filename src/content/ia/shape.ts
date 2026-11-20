/**
 * Le contrat de types entre les langues. Les fichiers français sont écrits
 * en `as const` : leurs types sont des littéraux (« Fiduciaires », 3 entrées,
 * etc.). `Widen` les élargit (string, number, boolean, tableaux) pour qu'une
 * traduction ait la même forme sans avoir les mêmes mots. Les modules déjà
 * typés explicitement (métiers, ressources) gardent leur type.
 */
export type Widen<T> = [T] extends [boolean]
  ? boolean
  : [T] extends [string]
    ? string
    : [T] extends [number]
      ? number
      : [T] extends [(...args: never[]) => unknown]
        ? T
        : [T] extends [ReadonlyArray<infer U>]
          ? ReadonlyArray<Widen<U>>
          : [T] extends [object]
            ? { readonly [K in keyof T]: Widen<T[K]> }
            : T;

export type SiteContent = Widen<typeof import("./site.ts")>;
export type HomeContent = Widen<typeof import("./home.ts")>;
export type SecuriteContent = Widen<typeof import("./securite.ts")>;
export type UiContent = Widen<typeof import("./ui.ts")>;
export type MetiersContent = typeof import("./metiers.ts");
export type RessourcesContent = typeof import("./ressources.ts");

/** Tout le contenu d'une langue, module par module. */
export type Content = {
  site: SiteContent;
  home: HomeContent;
  securite: SecuriteContent;
  ui: UiContent;
  metiers: MetiersContent;
  ressources: RessourcesContent;
};
