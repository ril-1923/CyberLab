import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNavigation } from './MobileNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { xpToNextLevel, getInitials } from '@/utils/helpers';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const xpInfo = xpToNextLevel(user.xp);

  return (
    <div className="cyber-grid-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="cyber-main-content">
        <header className="cyber-topbar">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-sm btn-outline-secondary d-lg-none"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <i className="bi bi-list"></i>
            </button>
            <div className="cyber-status-indicator d-none d-md-flex">
              <span className="cyber-status-dot"></span>
              <span className="cyber-text-muted">System Online</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-md-flex align-items-center gap-2">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                  <span className="cyber-text-primary">{user.xp.toLocaleString()}</span> XP
                </div>
                <div className="cyber-text-muted" style={{ fontSize: '0.72rem' }}>Level {user.level}</div>
              </div>
              <div style={{ width: 60 }}>
                <div className="progress" style={{ height: '5px' }}>
                  <div className="progress-bar" style={{ width: `${xpInfo.percent}%` }}></div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => navigate('/achievements')}
              aria-label="Achievements"
            >
              <i className="bi bi-trophy"></i>
            </button>
            <button
              className="cyber-avatar"
              style={{ width: 36, height: 36, fontSize: '0.8rem', background: user.avatarColor, border: 'none' }}
              onClick={() => navigate('/profile')}
              aria-label="Profile"
            >
              {getInitials(user.fullName)}
            </button>
          </div>
        </header>

        <main className="p-3 p-md-4 p-lg-5">
          {children}
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}
