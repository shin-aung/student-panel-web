import { useState } from "react";
import { useLang } from "../context/LangContext";
import { authService } from "../services/authService";
import { LangSwitcher } from "../components/ui/LangSwitcher";
import type { Session, LoginData, RegisterData } from "../types";

interface LoginFormProps {
  onSuccess: (session: Session) => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { t } = useLang();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [regData, setRegData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (): Promise<void> => {
    setError("");
    setLoading(true);
    try {
      const result = await authService.login(
        loginData.email,
        loginData.password,
      );
      localStorage.setItem("jwt_token", result.token);
      localStorage.setItem("student", JSON.stringify(result.student));
      onSuccess(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    }
    setLoading(false);
  };

  const handleRegister = async (): Promise<void> => {
    setError("");
    setSuccess("");
    if (regData.password !== regData.confirmPassword) {
      setError(t.auth.passwordMismatch);
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = regData;
      await authService.register(payload);
      setSuccess("Account created! You can now log in.");
      setTab("login");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed");
    }
    setLoading(false);
  };

  const switchTab = (newTab: "login" | "register"): void => {
    setTab(newTab);
    setError("");
    setSuccess("");
  };

  return (
    <div className="auth-wrapper">
      {/* ── Hero Side ── */}
      <div className="auth-hero">
        <div className="hero-crest">🎓</div>
        <div className="hero-title">{t.hero.portalTitle}</div>
        <div className="hero-divider" />
        <div className="hero-subtitle">{t.hero.portalSubtitle}</div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">12k+</div>
            <div className="stat-label">{t.hero.students}</div>
          </div>
          <div className="stat">
            <div className="stat-num">400+</div>
            <div className="stat-label">{t.hero.courses}</div>
          </div>
          <div className="stat">
            <div className="stat-num">98%</div>
            <div className="stat-label">{t.hero.uptime}</div>
          </div>
        </div>
      </div>

      {/* ── Form Side ── */}
      <div className="auth-form-panel">
        <div className="auth-lang-row">
          <LangSwitcher variant="light" />
        </div>
        <div className="form-header">
          <div className="form-title">
            {tab === "login" ? t.auth.welcomeBack : t.auth.createAccount}
          </div>
          <div className="form-subtitle">
            {tab === "login" ? t.auth.signInSubtitle : t.auth.registerSubtitle}
          </div>
        </div>
        <div className="tab-row">
          <button
            className={`tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => switchTab("login")}
          >
            {t.global.signIn}
          </button>
          <button
            className={`tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => switchTab("register")}
          >
            {t.global.register}
          </button>
        </div>

        {error && <div className="alert alert-error">⚠️ {error}</div>}
        {success && <div className="alert alert-success">✓ {success}</div>}

        {tab === "login" ? (
          <>
            <div className="field">
              <label>{t.auth.universityEmail}</label>
              <input
                type="email"
                placeholder={t.auth.emailPlaceholder}
                value={loginData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && handleLogin()
                }
              />
            </div>
            <div className="field">
              <label>{t.auth.password}</label>
              <input
                type="password"
                placeholder={t.auth.passwordPlaceholder}
                value={loginData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && handleLogin()
                }
              />
            </div>
            <button
              className="btn-primary"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  {t.auth.signingIn}
                </>
              ) : (
                t.global.signIn
              )}
            </button>
          </>
        ) : (
          <>
            <div className="row-2">
              <div className="field">
                <label>{t.auth.firstName}</label>
                <input
                  placeholder="John"
                  value={regData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label>{t.auth.lastName}</label>
                <input
                  placeholder="Doe"
                  value={regData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label>{t.auth.universityEmail}</label>
              <input
                type="email"
                placeholder={t.auth.emailPlaceholder}
                value={regData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegData({ ...regData, email: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>{t.auth.studentId}</label>
              <input
                placeholder={t.auth.studentIdPlaceholder}
                value={regData.studentId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegData({ ...regData, studentId: e.target.value })
                }
              />
            </div>
            <div className="row-2">
              <div className="field">
                <label>{t.auth.password}</label>
                <input
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  value={regData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, password: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label>{t.auth.confirmPassword}</label>
                <input
                  type="password"
                  placeholder={t.auth.passwordPlaceholder}
                  value={regData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              className="btn-primary btn-gold"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  {t.auth.creatingAccount}
                </>
              ) : (
                t.global.register
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
