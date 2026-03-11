import { useState } from "react";
import { useLang } from "../context/LangContext";

// ─── Props ────────────────────────────────────────────────────────────────────

interface TokenPageProps {
  token: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function decodeJwtPart(str: string): string {
  try {
    return JSON.stringify(
      JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/"))),
      null, 2
    );
  } catch {
    return str;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TokenPage({ token }: TokenPageProps) {
  const { t } = useLang();
  const [copied, setCopied] = useState<boolean>(false);

  const copy = (): void => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parts: string[] = token?.split(".") ?? [];

  return (
    <div className="card">
      <div className="card-title">{t.jwtTitle}</div>
      <div className="info-box">{t.jwtDesc}</div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6 }}>{t.rawToken}</div>
        <div className="token-info" style={{ marginBottom: 8 }}>{token || t.noToken}</div>
        <button
          className="btn-primary"
          style={{ width: "auto", padding: "8px 20px", marginTop: 8 }}
          onClick={copy}
        >
          {copied ? t.copied : t.copyToken}
        </button>
      </div>

      {parts.length === 3 && (
        <>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6 }}>{t.headerDecoded}</div>
            <div className="token-info">
              <span className="token-label">{t.algorithmType} </span>
              {decodeJwtPart(parts[0])}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6 }}>{t.payloadDecoded}</div>
            <div className="token-info">
              <span className="token-label">{t.claims} </span>
              {decodeJwtPart(parts[1])}
            </div>
          </div>
        </>
      )}
    </div>
  );
}