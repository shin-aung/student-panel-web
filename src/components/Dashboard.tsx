import { useState } from "react";
import OverviewPage from "../pages/OverviewPage";
import TokenPage from "../pages/TokenPage";
import type { NavItem, StudentDto } from "../types/types";
import PlaceholderPage from "./PlaceHolderPage";

interface DashboardProps {
  student: StudentDto;
  token: string;
  onLogout: () => void;
}

export default function Dashboard({ student, token, onLogout }: DashboardProps) {
  const [active, setActive] = useState<string>("overview");
  const initials = `${student?.firstName?.[0] ?? "S"}${student?.lastName?.[0] ?? ""}`;

  const navItems: NavItem[] = [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "courses", icon: "📚", label: "My Courses" },
    { id: "schedule", icon: "📅", label: "Schedule" },
    { id: "grades", icon: "📊", label: "Grades" },
    { id: "token", icon: "🔐", label: "Auth Token" },
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
              <div className="user-name">
                {student?.firstName} {student?.lastName}
              </div>
              <div className="user-id">{student?.studentId ?? "Student"}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            ← Sign Out
          </button>
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
          {active === "token" && <TokenPage token={token} />}
          {active === "courses" && (
            <PlaceholderPage
              icon="📚"
              title="Courses"
              desc="Course enrollment module — connect to your C# API endpoint GET /api/courses/my-courses"
            />
          )}
          {active === "schedule" && (
            <PlaceholderPage
              icon="📅"
              title="Schedule"
              desc="Timetable module — connect to GET /api/schedule/student/{id}"
            />
          )}
          {active === "grades" && (
            <PlaceholderPage
              icon="📊"
              title="Grades"
              desc="Grades module — connect to GET /api/grades/student/{id}"
            />
          )}
        </div>
      </div>
    </div>
  );
}
