import { useState } from "react";

const API_BASE = "http://localhost:5131/api"; // Change to your C# API URL

// ─── Types & Interfaces ───────────────────────────────────────────────────────

interface StudentDto {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthResponse {
  token: string;
  student: StudentDto;
}

interface Session {
  token: string;
  student: StudentDto;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  password: string;
  confirmPassword: string;
}

interface NavItem {
  id: string;
  icon: string;
  label: string;
}

interface StatCard {
  icon: string;
  val: string;
  label: string;
}

// ─── Auth Service ─────────────────────────────────────────────────────────────

const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).message || "Login failed");
    return res.json() as Promise<AuthResponse>;
  },

  async register(data: Omit<RegisterData, "confirmPassword">): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || "Registration failed");
    return res.json() as Promise<AuthResponse>;
  },

  logout(): void {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("student");
  },

  getToken(): string | null {
    return localStorage.getItem("jwt_token");
  },

  getStudent(): StudentDto | null {
    return JSON.parse(localStorage.getItem("student") || "null") as StudentDto | null;
  },
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0f1f3d;
    --navy-mid: #1a3260;
    --gold: #c9a84c;
    --gold-light: #f0d080;
    --cream: #faf8f3;
    --text: #1a1a2e;
    --muted: #6b7280;
    --error: #dc2626;
    --success: #16a34a;
    --border: #e5e0d5;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text); }

  .app { min-height: 100vh; display: flex; }

  /* ── Auth Panel ── */
  .auth-wrapper {
    min-height: 100vh; width: 100%; display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) { .auth-wrapper { grid-template-columns: 1fr; } }

  .auth-hero {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 60%, #2a4a8a 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    padding: 60px 40px; position: relative; overflow: hidden;
  }
  .auth-hero::before {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-crest {
    width: 80px; height: 80px; background: var(--gold);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 36px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(201,168,76,0.4);
  }
  .hero-title {
    font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #fff;
    text-align: center; line-height: 1.2; margin-bottom: 12px;
  }
  .hero-subtitle { color: rgba(255,255,255,0.6); text-align: center; font-size: 0.95rem; max-width: 280px; line-height: 1.6; }
  .hero-divider { width: 48px; height: 2px; background: var(--gold); margin: 24px auto; }
  .hero-stats { display: flex; gap: 40px; margin-top: 8px; }
  .stat { text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--gold-light); font-weight: 700; }
  .stat-label { color: rgba(255,255,255,0.5); font-size: 0.78rem; letter-spacing: 0.05em; text-transform: uppercase; }

  /* ── Form Panel ── */
  .auth-form-panel {
    background: var(--cream); display: flex; flex-direction: column;
    justify-content: center; padding: 60px 48px;
  }
  .form-header { margin-bottom: 36px; }
  .form-title { font-family: 'Playfair Display', serif; font-size: 1.9rem; color: var(--navy); margin-bottom: 8px; }
  .form-subtitle { color: var(--muted); font-size: 0.9rem; }

  .tab-row { display: flex; gap: 0; margin-bottom: 32px; border-bottom: 2px solid var(--border); }
  .tab-btn {
    background: none; border: none; padding: 10px 24px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
    color: var(--muted); position: relative; transition: color 0.2s;
  }
  .tab-btn.active { color: var(--navy); }
  .tab-btn.active::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 2px; background: var(--gold);
  }

  .field { margin-bottom: 20px; }
  .field label { display: block; font-size: 0.82rem; font-weight: 500; color: var(--navy); margin-bottom: 6px; letter-spacing: 0.02em; }
  .field input {
    width: 100%; padding: 11px 14px; border: 1.5px solid var(--border);
    border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    background: #fff; color: var(--text); outline: none; transition: border-color 0.2s;
  }
  .field input:focus { border-color: var(--navy); }
  .field input.err { border-color: var(--error); }

  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .btn-primary {
    width: 100%; padding: 13px; background: var(--navy);
    color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: background 0.2s, transform 0.1s;
    margin-top: 8px;
  }
  .btn-primary:hover { background: var(--navy-mid); }
  .btn-primary:active { transform: scale(0.99); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-gold { background: var(--gold); color: var(--navy); }
  .btn-gold:hover { background: var(--gold-light); }

  .alert {
    padding: 10px 14px; border-radius: 8px; font-size: 0.88rem;
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }
  .alert-error { background: #fef2f2; color: var(--error); border: 1px solid #fecaca; }
  .alert-success { background: #f0fdf4; color: var(--success); border: 1px solid #bbf7d0; }

  /* ── Dashboard ── */
  .dashboard { display: flex; min-height: 100vh; }
  .sidebar {
    width: 240px; background: var(--navy); color: #fff;
    display: flex; flex-direction: column; padding: 0; flex-shrink: 0;
  }
  .sidebar-logo {
    padding: 28px 24px; border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; gap: 12px;
  }
  .logo-icon {
    width: 36px; height: 36px; background: var(--gold); border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
  }
  .logo-text { font-family: 'Playfair Display', serif; font-size: 1rem; line-height: 1.2; }
  .logo-sub { font-size: 0.7rem; color: rgba(255,255,255,0.4); font-family: 'DM Sans', sans-serif; }

  .sidebar-nav { flex: 1; padding: 16px 12px; }
  .nav-section { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); padding: 16px 12px 8px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 8px; cursor: pointer; color: rgba(255,255,255,0.65);
    font-size: 0.88rem; transition: all 0.15s; margin-bottom: 2px;
  }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .nav-item.active { background: rgba(201,168,76,0.15); color: var(--gold-light); }
  .nav-icon { font-size: 1rem; width: 20px; text-align: center; }

  .sidebar-footer { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08); }
  .user-card { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; }
  .user-avatar {
    width: 34px; height: 34px; background: var(--gold); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.85rem; color: var(--navy); flex-shrink: 0;
  }
  .user-name { font-size: 0.85rem; font-weight: 500; color: #fff; }
  .user-id { font-size: 0.72rem; color: rgba(255,255,255,0.4); }
  .logout-btn {
    margin-top: 8px; width: 100%; padding: 9px; background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);
    border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem; transition: all 0.15s;
  }
  .logout-btn:hover { background: rgba(220,38,38,0.15); border-color: rgba(220,38,38,0.3); color: #fca5a5; }

  .main-content { flex: 1; background: #f4f2ed; overflow-y: auto; }
  .topbar {
    background: var(--cream); border-bottom: 1px solid var(--border);
    padding: 18px 32px; display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
  }
  .page-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--navy); }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .badge { background: var(--gold); color: var(--navy); padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }

  .content-area { padding: 32px; }

  .welcome-card {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
    border-radius: 16px; padding: 32px; color: #fff; margin-bottom: 28px;
    display: flex; justify-content: space-between; align-items: center;
    position: relative; overflow: hidden;
  }
  .welcome-card::after {
    content: '🎓'; position: absolute; right: 32px; top: 50%; transform: translateY(-50%);
    font-size: 80px; opacity: 0.15;
  }
  .welcome-name { font-family: 'Playfair Display', serif; font-size: 1.6rem; margin-bottom: 6px; }
  .welcome-sub { color: rgba(255,255,255,0.6); font-size: 0.9rem; }
  .welcome-meta { display: flex; gap: 20px; margin-top: 16px; }
  .meta-pill {
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
    padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; color: rgba(255,255,255,0.8);
  }

  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: var(--cream); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px 22px; display: flex; flex-direction: column; gap: 8px;
  }
  .stat-card-icon { font-size: 1.4rem; }
  .stat-card-val { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--navy); font-weight: 700; }
  .stat-card-label { font-size: 0.8rem; color: var(--muted); }

  .card { background: var(--cream); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
  .card-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: var(--navy); margin-bottom: 16px; }

  .token-info {
    background: #1e293b; border-radius: 10px; padding: 16px; font-family: monospace;
    font-size: 0.78rem; color: #94a3b8; word-break: break-all; line-height: 1.8;
  }
  .token-label { color: var(--gold-light); font-weight: 600; }

  .spinner {
    width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite; display: inline-block; margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .info-box {
    background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;
    padding: 16px 18px; font-size: 0.85rem; color: #1e40af; line-height: 1.7;
    margin-bottom: 20px;
  }
  .info-box strong { color: #1e3a8a; }

  code {
    background: #e2e8f0; padding: 2px 6px; border-radius: 4px;
    font-family: monospace; font-size: 0.85em; color: #1e293b;
  }
`;

// ─── Login Form ───────────────────────────────────────────────────────────────

interface LoginFormProps {
  onSuccess: (session: Session) => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });
  const [regData, setRegData] = useState<RegisterData>({
    firstName: "", lastName: "", email: "", studentId: "", password: "", confirmPassword: "",
  });

  const handleLogin = async (): Promise<void> => {
    setError(""); setLoading(true);
    try {
      const result = await authService.login(loginData.email, loginData.password);
      localStorage.setItem("jwt_token", result.token);
      localStorage.setItem("student", JSON.stringify(result.student));
      onSuccess(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    }
    setLoading(false);
  };

  const handleRegister = async (): Promise<void> => {
    setError(""); setSuccess("");
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
        <div className="hero-title">University<br />Student Portal</div>
        <div className="hero-divider" />
        <div className="hero-subtitle">Your academic journey, unified in one place. Access courses, grades, and more.</div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">12k+</div><div className="stat-label">Students</div></div>
          <div className="stat"><div className="stat-num">400+</div><div className="stat-label">Courses</div></div>
          <div className="stat"><div className="stat-num">98%</div><div className="stat-label">Uptime</div></div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="form-header">
          <div className="form-title">{tab === "login" ? "Welcome back" : "Create account"}</div>
          <div className="form-subtitle">{tab === "login" ? "Sign in to your student account" : "Register with your university email"}</div>
        </div>

        <div className="tab-row">
          <button className={`tab-btn ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>Sign In</button>
          <button className={`tab-btn ${tab === "register" ? "active" : ""}`} onClick={() => switchTab("register")}>Register</button>
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
                  setLoginData({ ...loginData, email: e.target.value })}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && handleLogin()}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginData({ ...loginData, password: e.target.value })}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && handleLogin()}
              />
            </div>
            <button className="btn-primary" onClick={handleLogin} disabled={loading}>
              {loading ? <><span className="spinner" />Signing in...</> : "Sign In"}
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
                    setRegData({ ...regData, firstName: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input
                  placeholder="Doe"
                  value={regData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, lastName: e.target.value })}
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
                  setRegData({ ...regData, email: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Student ID</label>
              <input
                placeholder="e.g. STU-2024-001"
                value={regData.studentId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegData({ ...regData, studentId: e.target.value })}
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
                    setRegData({ ...regData, password: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRegData({ ...regData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
            <button className="btn-primary btn-gold" onClick={handleRegister} disabled={loading}>
              {loading ? <><span className="spinner" />Creating account...</> : "Create Account"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

interface DashboardProps {
  student: StudentDto;
  token: string;
  onLogout: () => void;
}

function Dashboard({ student, token, onLogout }: DashboardProps) {
  const [active, setActive] = useState<string>("overview");
  const initials = `${student?.firstName?.[0] ?? "S"}${student?.lastName?.[0] ?? ""}`;

  const navItems: NavItem[] = [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "courses",  icon: "📚", label: "My Courses" },
    { id: "schedule", icon: "📅", label: "Schedule" },
    { id: "grades",   icon: "📊", label: "Grades" },
    { id: "token",    icon: "🔐", label: "Auth Token" },
  ];

  const activeLabel = navItems.find((n) => n.id === active)?.label ?? "";

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🎓</div>
          <div>
            <div className="logo-text">UniPortal</div>
            <div className="logo-sub">Student Panel</div>
          </div>
        </div>
        <div className="sidebar-nav">
          <div className="nav-section">Main</div>
          {navItems.map((n) => (
            <div
              key={n.id}
              className={`nav-item ${active === n.id ? "active" : ""}`}
              onClick={() => setActive(n.id)}
            >
              <span className="nav-icon">{n.icon}</span> {n.label}
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">{initials}</div>
            <div>
              <div className="user-name">{student?.firstName} {student?.lastName}</div>
              <div className="user-id">{student?.studentId ?? "Student"}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>← Sign Out</button>
        </div>
      </div>

      <div className="main-content">
        <div className="topbar">
          <div className="page-title">{activeLabel}</div>
          <div className="topbar-right">
            <span className="badge">Spring 2025</span>
          </div>
        </div>
        <div className="content-area">
          {active === "overview" && <OverviewPage student={student} />}
          {active === "token"    && <TokenPage token={token} />}
          {active === "courses"  && <PlaceholderPage icon="📚" title="Courses"  desc="Course enrollment module — connect to your C# API endpoint GET /api/courses/my-courses" />}
          {active === "schedule" && <PlaceholderPage icon="📅" title="Schedule" desc="Timetable module — connect to GET /api/schedule/student/{id}" />}
          {active === "grades"   && <PlaceholderPage icon="📊" title="Grades"   desc="Grades module — connect to GET /api/grades/student/{id}" />}
        </div>
      </div>
    </div>
  );
}

// ─── Overview Page ────────────────────────────────────────────────────────────

interface OverviewPageProps {
  student: StudentDto;
}

function OverviewPage({ student }: OverviewPageProps) {
  const statCards: StatCard[] = [
    { icon: "📚", val: "6",   label: "Enrolled Courses" },
    { icon: "⭐", val: "3.7", label: "Current GPA" },
    { icon: "✅", val: "92%", label: "Attendance" },
    { icon: "💳", val: "$0",  label: "Outstanding Fees" },
  ];

  return (
    <>
      <div className="welcome-card">
        <div>
          <div className="welcome-name">Good day, {student?.firstName ?? "Student"}! 👋</div>
          <div className="welcome-sub">Here's your academic overview for this semester.</div>
          <div className="welcome-meta">
            <span className="meta-pill">📧 {student?.email ?? "student@uni.edu"}</span>
            <span className="meta-pill">🪪 {student?.studentId ?? "STU-0000"}</span>
          </div>
        </div>
      </div>
      <div className="stats-grid">
        {statCards.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-icon">{s.icon}</div>
            <div className="stat-card-val">{s.val}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="info-box">
        <strong>🚀 Getting Started:</strong> This dashboard is connected to your C# JWT backend. Use the sidebar to explore modules.
        Check the <strong>Auth Token</strong> tab to inspect your JWT. Each API request automatically includes your token in the{" "}
        <code>Authorization: Bearer &lt;token&gt;</code> header.
      </div>
    </>
  );
}

// ─── Token Page ───────────────────────────────────────────────────────────────

interface TokenPageProps {
  token: string;
}

function TokenPage({ token }: TokenPageProps) {
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

// ─── Placeholder Page ─────────────────────────────────────────────────────────

interface PlaceholderPageProps {
  icon: string;
  title: string;
  desc: string;
}

function PlaceholderPage({ icon, title, desc }: PlaceholderPageProps) {
  return (
    <div className="card" style={{ textAlign: "center", padding: "60px 32px" }}>
      <div style={{ fontSize: "3rem", marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--navy)", marginBottom: 12 }}>{title}</div>
      <div style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 400, margin: "0 auto" }}>{desc}</div>
    </div>
  );
}

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
    <>
      <style>{styles}</style>
      <div className="app">
        {session
          ? <Dashboard student={session.student} token={session.token} onLogout={handleLogout} />
          : <LoginForm onSuccess={setSession} />
        }
      </div>
    </>
  );
}