const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&family=Noto+Sans+Myanmar:wght@300;400;500;700&display=swap');

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

  body { font-family: 'DM Sans', 'Noto Sans Myanmar', sans-serif; background: var(--cream); color: var(--text); }

  .app { min-height: 100vh; display: flex; }

  /* ── Auth Panel ── */
  .auth-wrapper { min-height: 100vh; width: 100%; display: grid; grid-template-columns: 1fr 1fr; }
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
    width: 80px; height: 80px; background: var(--gold); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 36px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(201,168,76,0.4);
  }
  .hero-title {
    font-family: 'Playfair Display', 'Noto Sans Myanmar', serif; font-size: 2.2rem; color: #fff;
    text-align: center; line-height: 1.5; margin-bottom: 12px; white-space: pre-line;
  }
  .hero-subtitle { color: rgba(255,255,255,0.6); text-align: center; font-size: 0.95rem; max-width: 280px; line-height: 1.9; }
  .hero-divider { width: 48px; height: 2px; background: var(--gold); margin: 24px auto; }
  .hero-stats { display: flex; gap: 40px; margin-top: 8px; }
  .stat { text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--gold-light); font-weight: 700; }
  .stat-label { color: rgba(255,255,255,0.5); font-size: 0.78rem; letter-spacing: 0.03em; }

  /* ── Form Panel ── */
  .auth-form-panel {
    background: var(--cream); display: flex; flex-direction: column;
    justify-content: center; padding: 60px 48px;
  }
  .auth-lang-row { display: flex; justify-content: flex-end; margin-bottom: 20px; }
  .form-header { margin-bottom: 36px; }
  .form-title { font-family: 'Playfair Display', 'Noto Sans Myanmar', serif; font-size: 1.9rem; color: var(--navy); margin-bottom: 8px; }
  .form-subtitle { color: var(--muted); font-size: 0.9rem; }

  .tab-row { display: flex; gap: 0; margin-bottom: 32px; border-bottom: 2px solid var(--border); }
  .tab-btn {
    background: none; border: none; padding: 10px 24px; cursor: pointer;
    font-family: 'DM Sans', 'Noto Sans Myanmar', sans-serif; font-size: 0.9rem; font-weight: 500;
    color: var(--muted); position: relative; transition: color 0.2s;
  }
  .tab-btn.active { color: var(--navy); }
  .tab-btn.active::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
    height: 2px; background: var(--gold);
  }

  .field { margin-bottom: 20px; }
  .field label { display: block; font-size: 0.82rem; font-weight: 500; color: var(--navy); margin-bottom: 6px; }
  .field input {
    width: 100%; padding: 11px 14px; border: 1.5px solid var(--border);
    border-radius: 8px; font-family: 'DM Sans', 'Noto Sans Myanmar', sans-serif; font-size: 0.95rem;
    background: #fff; color: var(--text); outline: none; transition: border-color 0.2s;
  }
  .field input:focus { border-color: var(--navy); }

  .row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .btn-primary {
    width: 100%; padding: 13px; background: var(--navy); color: #fff; border: none;
    border-radius: 8px; font-family: 'DM Sans', 'Noto Sans Myanmar', sans-serif;
    font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: background 0.2s, transform 0.1s; margin-top: 8px;
  }
  .btn-primary:hover { background: var(--navy-mid); }
  .btn-primary:active { transform: scale(0.99); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-gold { background: var(--gold); color: var(--navy); }
  .btn-gold:hover { background: var(--gold-light); }

  .alert { padding: 10px 14px; border-radius: 8px; font-size: 0.88rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .alert-error { background: #fef2f2; color: var(--error); border: 1px solid #fecaca; }
  .alert-success { background: #f0fdf4; color: var(--success); border: 1px solid #bbf7d0; }

  /* ── Language Switcher ── */
  .lang-switcher {
    display: flex; align-items: center; gap: 4px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 20px; padding: 3px 5px;
  }
  .lang-switcher.light { background: rgba(15,31,61,0.05); border: 1px solid var(--border); }
  .lang-btn {
    background: none; border: none; padding: 4px 12px; border-radius: 14px;
    font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s;
    color: rgba(255,255,255,0.5); font-family: 'Noto Sans Myanmar', 'DM Sans', sans-serif;
  }
  .lang-btn.light { color: var(--muted); }
  .lang-btn.active { background: var(--gold); color: var(--navy); }
  .lang-btn:not(.active):hover { color: #fff; }
  .lang-btn.light:not(.active):hover { color: var(--navy); }

  /* ── Dashboard ── */
  .dashboard { display: flex; min-height: 100vh; }
  .sidebar { width: 240px; background: var(--navy); color: #fff; display: flex; flex-direction: column; padding: 0; flex-shrink: 0; }
  .sidebar-logo { padding: 28px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 12px; }
  .logo-icon { width: 36px; height: 36px; background: var(--gold); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .logo-text { font-family: 'Playfair Display', 'Noto Sans Myanmar', serif; font-size: 1rem; line-height: 1.2; }
  .logo-sub { font-size: 0.7rem; color: rgba(255,255,255,0.4); font-family: 'DM Sans', 'Noto Sans Myanmar', sans-serif; }
  .sidebar-nav { flex: 1; padding: 16px 12px; }
  .nav-section { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); padding: 16px 12px 8px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px;
    cursor: pointer; color: rgba(255,255,255,0.65); font-size: 0.88rem; transition: all 0.15s; margin-bottom: 2px;
    font-family: 'DM Sans', 'Noto Sans Myanmar', sans-serif;
  }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .nav-item.active { background: rgba(201,168,76,0.15); color: var(--gold-light); }
  .nav-icon { font-size: 1rem; width: 20px; text-align: center; }
  .sidebar-footer { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08); }
  .user-card { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; }
  .user-avatar { width: 34px; height: 34px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: var(--navy); flex-shrink: 0; }
  .user-name { font-size: 0.85rem; font-weight: 500; color: #fff; }
  .user-id { font-size: 0.72rem; color: rgba(255,255,255,0.4); }
  .logout-btn {
    margin-top: 8px; width: 100%; padding: 9px; background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); border-radius: 8px;
    cursor: pointer; font-family: 'DM Sans', 'Noto Sans Myanmar', sans-serif; font-size: 0.85rem; transition: all 0.15s;
  }
  .logout-btn:hover { background: rgba(220,38,38,0.15); border-color: rgba(220,38,38,0.3); color: #fca5a5; }

  .main-content { flex: 1; background: #f4f2ed; overflow-y: auto; }
  .topbar {
    background: var(--cream); border-bottom: 1px solid var(--border);
    padding: 18px 32px; display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 10;
  }
  .page-title { font-family: 'Playfair Display', 'Noto Sans Myanmar', serif; font-size: 1.4rem; color: var(--navy); }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .badge { background: var(--gold); color: var(--navy); padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }

  .content-area { padding: 32px; }

  .welcome-card {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
    border-radius: 16px; padding: 32px; color: #fff; margin-bottom: 28px;
    position: relative; overflow: hidden;
  }
  .welcome-card::after { content: '🎓'; position: absolute; right: 32px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.15; }
  .welcome-name { font-family: 'Playfair Display', 'Noto Sans Myanmar', serif; font-size: 1.6rem; margin-bottom: 6px; }
  .welcome-sub { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.7; }
  .welcome-meta { display: flex; gap: 20px; margin-top: 16px; flex-wrap: wrap; }
  .meta-pill { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; color: rgba(255,255,255,0.8); }

  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: var(--cream); border: 1px solid var(--border); border-radius: 12px; padding: 20px 22px; display: flex; flex-direction: column; gap: 8px; }
  .stat-card-icon { font-size: 1.4rem; }
  .stat-card-val { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--navy); font-weight: 700; }
  .stat-card-label { font-size: 0.8rem; color: var(--muted); }

  .card { background: var(--cream); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
  .card-title { font-family: 'Playfair Display', 'Noto Sans Myanmar', serif; font-size: 1.05rem; color: var(--navy); margin-bottom: 16px; }

  .token-info { background: #1e293b; border-radius: 10px; padding: 16px; font-family: monospace; font-size: 0.78rem; color: #94a3b8; word-break: break-all; line-height: 1.8; }
  .token-label { color: var(--gold-light); font-weight: 600; }

  .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; margin-right: 8px; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .info-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 16px 18px; font-size: 0.85rem; color: #1e40af; line-height: 1.9; margin-bottom: 20px; }
  .info-box strong { color: #1e3a8a; }

  code { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.85em; color: #1e293b; }
`;

export default styles;