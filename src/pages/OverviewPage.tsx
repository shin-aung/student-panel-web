import type { StatCard, StudentDto } from "../types/types";

interface OverviewPageProps {
  student: StudentDto;
}

export default function OverviewPage({ student }: OverviewPageProps) {
  const statCards: StatCard[] = [
    { icon: "📚", val: "6", label: "Enrolled Courses" },
    { icon: "⭐", val: "3.7", label: "Current GPA" },
    { icon: "✅", val: "92%", label: "Attendance" },
    { icon: "💳", val: "$0", label: "Outstanding Fees" },
  ];

  return (
    <>
      <div className="welcome-card">
        <div>
          <div className="welcome-name">
            Good day, {student?.firstName ?? "Student"}! 👋
          </div>
          <div className="welcome-sub">
            Here's your academic overview for this semester.
          </div>
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
        <strong>🚀 Getting Started:</strong> This dashboard is connected to your
        C# JWT backend. Use the sidebar to explore modules. Check the{" "}
        <strong>Auth Token</strong> tab to inspect your JWT. Each API request
        automatically includes your token in the{" "}
        <code>Authorization: Bearer &lt;token&gt;</code> header.
      </div>
    </>
  );
}
