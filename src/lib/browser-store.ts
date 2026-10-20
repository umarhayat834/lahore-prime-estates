/**
 * Browser-local storage read as an external store, so components can render
 * straight from it with `useSyncExternalStore` instead of copying it into state
 * from an effect (which would double-render and mismatch during hydration).
 */

const CHANGE_EVENT = "lpe:local-store";
export const FAVOURITES_KEY = "lpe-favourites";
export const LOCALE_KEY = "lpe-locale";

function read(key: string, fallback: string): string {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    // Private browsing or storage blocked — the feature still works for this visit.
    return fallback;
  }
}

/** `storage` only fires in other tabs, so same-tab writes broadcast this event. */
function broadcast() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToStore(onStoreChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function getFavourites(): string {
  return read(FAVOURITES_KEY, "");
}

export function getLocale(): string {
  return read(LOCALE_KEY, "en");
}

export function serverValue(): string {
  return "";
}

export function serverLocale(): string {
  return "en";
}

export function isFavourite(raw: string, id: string): boolean {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.includes(id);
  } catch {
    return false;
  }
}

export function toggleFavourite(id: string, next: boolean): void {
  let list: string[] = [];
  try {
    const parsed: unknown = JSON.parse(read(FAVOURITES_KEY, "[]"));
    if (Array.isArray(parsed)) list = parsed.filter((entry): entry is string => typeof entry === "string");
  } catch {
    list = [];
  }
  const merged = next ? [...new Set([...list, id])] : list.filter((entry) => entry !== id);
  try {
    window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(merged));
  } catch {
    /* storage unavailable */
  }
  broadcast();
}

export function setLocale(value: string): void {
  try {
    window.localStorage.setItem(LOCALE_KEY, value);
  } catch {
    /* storage unavailable */
  }
  broadcast();
}
