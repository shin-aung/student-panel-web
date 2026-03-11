import en from "./en.json";
import my from "./my.json";

// ─── Language Type ────────────────────────────────────────────────────────────

export type Lang = "en" | "my";

// ─── Translations Type ────────────────────────────────────────────────────────
// Derived directly from en.json so the type always stays in sync
// with the source file — no need to maintain a separate interface.

export type Translations = typeof en;

// ─── i18n Map ─────────────────────────────────────────────────────────────────

export const i18n: Record<Lang, Translations> = { en, my };