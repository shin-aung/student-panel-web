import { useState, useCallback } from "react";
import { LangProvider } from "./context/LangContext";
import { authService } from "./services/authService";
import { Dashboard } from "./pages/Dashboard";
import { LoginForm } from "./pages/LoginForm";
import styles from "./styles/global";
import type { Session } from "./types";
import type { Lang } from "./localization/i18n";

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [session, setSession] = useState<Session | null>(() => {
    const token = authService.getToken();
    const student = authService.getStudent();
    return token && student ? { token, student } : null;
  });

  const handleLogout = (): void => {
    authService.logout();
    setSession(null);
  };

  return (
    <LangProvider>
      <style>{styles}</style>
      <div className="app">
        {session
          ? <Dashboard student={session.student} token={session.token} onLogout={handleLogout} />
          : <LoginForm onSuccess={setSession} />
        }
      </div>
    </LangProvider>
  );
}