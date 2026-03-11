import { useLang } from "../context/LangContext";
import type { StudentDto, StatCard } from "../types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface OverviewPageProps {
  student: StudentDto;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function OverviewPage({ student }: OverviewPageProps) {
  const { t } = useLang();

  const statCards: StatCard[] = [
    { icon: "📚", val: "6",   label: t.enrolledCourses },
    { icon: "⭐", val: "3.7", label: t.currentGpa },
    { icon: "✅", val: "92%", label: t.attendance },
    { icon: "💳", val: "$0",  label: t.outstandingFees },
  ];

  return (
    <>
      <div className="welcome-card">
        <div>
          <div className="welcome-name">{t.goodDay}, {student?.firstName ?? "Student"}! 👋</div>
          <div className="welcome-sub">{t.overviewSubtitle}</div>
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
        <strong>{t.gettingStarted}</strong> {t.gettingStartedDesc}{" "}
        <code>Authorization: Bearer &lt;token&gt;</code>
      </div>
    </>
  );
}