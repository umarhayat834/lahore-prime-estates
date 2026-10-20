"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { copy, dirFor, type CopyGroup, type Locale } from "@/lib/i18n";
import { getLocale, serverLocale, setLocale as persistLocale, subscribeToStore } from "@/lib/browser-store";

interface LocaleValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: <G extends CopyGroup>(group: G) => (typeof copy)[G][Locale];
}

const LocaleContext = createContext<LocaleValue | null>(null);

/**
 * English / Urdu toggle for the nav, hero and call to action. The choice is
 * remembered per browser; Urdu flips the wrapped subtree to right-to-left.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const stored = useSyncExternalStore(subscribeToStore, getLocale, serverLocale);
  const locale: Locale = stored === "ur" ? "ur" : "en";

  // Flipping `dir` after mount keeps the server and client markup identical.
  useEffect(() => {
    document.documentElement.dir = dirFor(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    persistLocale(next);
  }, []);

  const t = <G extends CopyGroup>(group: G): (typeof copy)[G][Locale] => copy[group][locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
