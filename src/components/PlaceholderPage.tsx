interface PlaceholderPageProps {
  icon: string;
  title: string;
  desc: string;
}

export default function PlaceholderPage({ icon, title, desc }: PlaceholderPageProps) {
  return (
    <div className="card" style={{ textAlign: "center", padding: "60px 32px" }}>
      <div style={{ fontSize: "3rem", marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--navy)", marginBottom: 12 }}>{title}</div>
      <div style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 400, margin: "0 auto" }}>{desc}</div>
    </div>
  );
}