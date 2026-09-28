import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { CyberBrand } from './CyberBrand';
import { xpToNextLevel } from '@/utils/helpers';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
  { to: '/courses', label: 'Courses', icon: 'bi-book' },
  { to: '/challenges', label: 'Challenges', icon: 'bi-flag' },
  { to: '/labs', label: 'Labs', icon: 'bi-hdd-network' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'bi-trophy' },
  { to: '/achievements', label: 'Achievements', icon: 'bi-award' },
  { to: '/profile', label: 'Profile', icon: 'bi-person' },
  { to: '/settings', label: 'Settings', icon: 'bi-gear' },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  if (!user) return null;

  const xpInfo = xpToNextLevel(user.xp);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <div className={`cyber-sidebar-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cyber-sidebar ${open ? 'open' : ''}`}>
        <div className="p-3 border-bottom" style={{ borderColor: 'var(--cyber-border)' }}>
          <CyberBrand />
        </div>

        <div className="px-3 py-3 border-bottom" style={{ borderColor: 'var(--cyber-border)' }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="cyber-avatar" style={{ width: 40, height: 40, fontSize: '0.9rem', background: user.avatarColor }}>
              {user.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <div className="fw-bold text-truncate" style={{ fontSize: '0.88rem' }}>{user.fullName}</div>
              <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>Level {user.level}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.72rem' }}>
            <span className="cyber-text-muted">XP {xpInfo.current}/{xpInfo.needed}</span>
            <span className="cyber-text-primary">{xpInfo.percent}%</span>
          </div>
          <div className="progress" style={{ height: '5px' }}>
            <div className="progress-bar" style={{ width: `${xpInfo.percent}%` }}></div>
          </div>
        </div>

        <nav className="flex-grow-1 py-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `cyber-sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-top" style={{ borderColor: 'var(--cyber-border)' }}>
          <div className="d-flex align-items-center justify-content-between">
            <button className="cyber-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'}`}></i>
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
