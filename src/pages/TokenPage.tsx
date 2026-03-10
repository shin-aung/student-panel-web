import { useState } from "react";

interface TokenPageProps {
  token: string;
}

export default function TokenPage({ token }: TokenPageProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = (): void => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parts: string[] = token?.split(".") ?? [];

  const decode = (str: string): string => {
    try {
      return JSON.stringify(
        JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/"))),
        null, 2
      );
    } catch {
      return str;
    }
  };

  return (
    <div className="card">
      <div className="card-title">🔐 Your JWT Authentication Token</div>
      <div className="info-box">
        Your JWT token is stored in <code>localStorage</code> and sent with every API request.
        It contains your identity and expires based on your backend settings.
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6 }}>RAW TOKEN</div>
        <div className="token-info" style={{ marginBottom: 8 }}>{token || "No token found"}</div>
        <button
          className="btn-primary"
          style={{ width: "auto", padding: "8px 20px", marginTop: 8 }}
          onClick={copy}
        >
          {copied ? "✓ Copied!" : "Copy Token"}
        </button>
      </div>
      {parts.length === 3 && (
        <>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6 }}>HEADER (decoded)</div>
            <div className="token-info"><span className="token-label">Algorithm &amp; Type: </span>{decode(parts[0])}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6 }}>PAYLOAD (decoded)</div>
            <div className="token-info"><span className="token-label">Claims: </span>{decode(parts[1])}</div>
          </div>
        </>
      )}
    </div>
  );
}