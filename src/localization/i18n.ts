import en from "./en.json";
import my from "./my.json";

// ─── Language Type ────────────────────────────────────────────────────────────

export type Lang = "en" | "my";

// ─── Translations Type ────────────────────────────────────────────────────────
// Derived directly from en.json — adding a key to en.json will automatically
// cause a TypeScript error if my.json is not updated to match.

export type Translations = typeof en;

// ─── i18n Map ─────────────────────────────────────────────────────────────────

export const i18n: Record<Lang, Translations> = { en, my };
