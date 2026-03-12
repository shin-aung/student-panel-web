import { useLang } from "../context/LangContext";
import type { StudentDto, StatCard } from "../types";

interface OverviewPageProps {
  student: StudentDto;
}

export function OverviewPage({ student }: OverviewPageProps) {
  const { t } = useLang();

  const statCards: StatCard[] = [
    { icon: "📚", val: "6", label: t.overview.enrolledCourses },
    { icon: "⭐", val: "3.7", label: t.overview.currentGpa },
    { icon: "✅", val: "92%", label: t.overview.attendance },
    { icon: "💳", val: "$0", label: t.overview.outstandingFees },
  ];

  return (
    <>
      <div className="welcome-card">
        <div>
          <div className="welcome-name">
            {t.overview.goodDay}, {student?.firstName ?? "Student"}! 👋
          </div>
          <div className="welcome-sub">{t.overview.subtitle}</div>
          <div className="welcome-meta">
            <span className="meta-pill">
              📧 {student?.email ?? "student@uni.edu"}
            </span>
            <span className="meta-pill">
              🪪 {student?.studentId ?? "STU-0000"}
            </span>
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
        <strong>{t.overview.gettingStarted}</strong>{" "}
        {t.overview.gettingStartedDesc}{" "}
        <code>Authorization: Bearer &lt;token&gt;</code>
      </div>
    </>
  );
}
