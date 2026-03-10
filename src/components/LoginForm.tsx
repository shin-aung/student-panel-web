import { useState } from "react";
import type { LoginData, RegisterData, Session } from "../types/types";
import { authService } from "../services/authService";

interface LoginFormProps {
  onSuccess: (session: Session) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
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
      setError("Passwords do not match.");
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
      <div className="auth-hero">
        <div className="hero-crest">🎓</div>
        <div className="hero-title">
          University
          <br />
          Student Portal
        </div>
        <div className="hero-divider" />
        <div className="hero-subtitle">
          Your academic journey, unified in one place. Access courses, grades,
          and more.
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">12k+</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat">
            <div className="stat-num">400+</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat">
            <div className="stat-num">98%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="form-header">
          <div className="form-title">
            {tab === "login" ? "Welcome back" : "Create account"}
          </div>
          <div className="form-subtitle">
            {tab === "login"
              ? "Sign in to your student account"
              : "Register with your university email"}
          </div>
        </div>

        <div className="tab-row">
          <button
            className={`tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => switchTab("login")}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => switchTab("register")}
          >
            Register
          </button>
        </div>

        {error && <div className="alert alert-error">⚠️ {error}</div>}
        {success && <div className="alert alert-success">✓ {success}</div>}

        {tab === "login" ? (
          <>
            <div className="field">
              <label>University Email</label>
              <input
                type="email"
                placeholder="student@university.edu"
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
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
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
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </>
        ) : (
          <>
            <div className="row-2">
              <div className="field">
                <label>First Name</label>
                <input
                  placeholder="John"
                  value={regData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label>Last Name</label>
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
              <label>University Email</label>
              <input
                type="email"
                placeholder="student@university.edu"
                value={regData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegData({ ...regData, email: e.target.value })
                }
              />
            </div>
            <div className="field">
              <label>Student ID</label>
              <input
                placeholder="e.g. STU-2024-001"
                value={regData.studentId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegData({ ...regData, studentId: e.target.value })
                }
              />
            </div>
            <div className="row-2">
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, password: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}