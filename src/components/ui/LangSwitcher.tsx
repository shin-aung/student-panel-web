import { useLang } from "../../context/LangContext";
import type { Lang } from "../../localization/i18n";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LangSwitcherProps {
  variant?: "dark" | "light";
}

interface LangOption {
  code: Lang;
  native: string;
  label: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const langOptions: LangOption[] = [
  { code: "en", native: "EN", label: "English" },
  { code: "my", native: "မြ", label: "Burmese" },
];

export function LangSwitcher({ variant = "dark" }: LangSwitcherProps) {
  const { lang, setLang } = useLang();
  const isLight = variant === "light";

  return (
    <div className={`lang-switcher ${isLight ? "light" : ""}`}>
      {langOptions.map((o) => (
        <button
          key={o.code}
          className={`lang-btn ${isLight ? "light" : ""} ${lang === o.code ? "active" : ""}`}
          onClick={() => setLang(o.code)}
          title={o.label}
        >
          {o.native}
        </button>
      ))}
    </div>
  );
}
