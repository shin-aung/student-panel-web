import { createContext, useContext, useCallback, useState } from "react";
import { i18n, type Lang, type Translations } from "../localization/i18n";

// ─── Context Shape ────────────────────────────────────────────────────────────

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: i18n.en,
});

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useLang = () => useContext(LangContext);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface LangProviderProps {
  children: React.ReactNode;
}

export function LangProvider({ children }: LangProviderProps) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("app_lang") as Lang) ?? "en";
  });

  const setLang = useCallback((l: Lang): void => {
    setLangState(l);
    localStorage.setItem("app_lang", l);
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: i18n[lang] }}>
      {children}
    </LangContext.Provider>
  );
}
