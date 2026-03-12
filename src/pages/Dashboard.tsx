import { useState } from "react";
import { useLang } from "../context/LangContext";
import { LangSwitcher } from "../components/ui/LangSwitcher";
import { OverviewPage } from "./OverviewPage";
import { TokenPage } from "./TokenPage";
import { PlaceholderPage } from "./PlaceholderPage";
import type { StudentDto, NavItem } from "../types";

interface DashboardProps {
  student: StudentDto;
  token: string;
  onLogout: () => void;
}

export function Dashboard({ student, token, onLogout }: DashboardProps) {
  const { t } = useLang();
  const [active, setActive] = useState<string>("overview");

  const initials = `${student?.firstName?.[0] ?? "S"}${student?.lastName?.[0] ?? ""}`;

  const navItems: NavItem[] = [
    { id: "overview", icon: "🏠", label: t.dashboard.overview },
    { id: "courses", icon: "📚", label: t.dashboard.myCourses },
    { id: "schedule", icon: "📅", label: t.dashboard.schedule },
    { id: "grades", icon: "📊", label: t.dashboard.grades },
    { id: "token", icon: "🔐", label: t.dashboard.authToken },
  ];

  const activeLabel = navItems.find((n) => n.id === active)?.label ?? "";

  return (
    <div className="dashboard">
      {/* ── Sidebar ── */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🎓</div>
          <div>
            <div className="logo-text">UniPortal</div>
            <div className="logo-sub">{t.dashboard.studentPanel}</div>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="nav-section">{t.dashboard.mainNav}</div>
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
              <div className="user-name">
                {student?.firstName} {student?.lastName}
              </div>
              <div className="user-id">{student?.studentId ?? "Student"}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            {t.global.signOut}
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="main-content">
        <div className="topbar">
          <div className="page-title">{activeLabel}</div>
          <div className="topbar-right">
            <LangSwitcher variant="light" />
            <span className="badge">{t.global.semester}</span>
          </div>
        </div>

        <div className="content-area">
          {active === "overview" && <OverviewPage student={student} />}
          {active === "token" && <TokenPage token={token} />}
          {active === "courses" && (
            <PlaceholderPage
              icon="📚"
              title={t.dashboard.myCourses}
              desc={t.placeholder.coursesDesc}
            />
          )}
          {active === "schedule" && (
            <PlaceholderPage
              icon="📅"
              title={t.dashboard.schedule}
              desc={t.placeholder.scheduleDesc}
            />
          )}
          {active === "grades" && (
            <PlaceholderPage
              icon="📊"
              title={t.dashboard.grades}
              desc={t.placeholder.gradesDesc}
            />
          )}
        </div>
      </div>
    </div>
  );
}
