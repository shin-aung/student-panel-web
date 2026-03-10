import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { authService } from "./services/authService";
import type { Session } from "./types/types";
import { styles } from "./styles/globalStyles";

export default function App() {

  const [session, setSession] = useState<Session | null>(() => {
    const token = authService.getToken();
    const student = authService.getStudent();

    return token && student ? { token, student } : null;
  });

  const handleLogout = () => {
    authService.logout();
    setSession(null);
  };

  return (
    <>
      <style>{styles}</style>

      {session
        ? <Dashboard student={session.student} token={session.token} onLogout={handleLogout} />
        : <LoginForm onSuccess={setSession} />
      }
    </>
  );
}