import { NavLink } from 'react-router-dom';

const bottomNavItems = [
  { to: '/dashboard', label: 'Home', icon: 'bi-house' },
  { to: '/courses', label: 'Courses', icon: 'bi-book' },
  { to: '/challenges', label: 'Challenges', icon: 'bi-flag' },
  { to: '/leaderboard', label: 'Ranks', icon: 'bi-trophy' },
  { to: '/profile', label: 'Profile', icon: 'bi-person' },
];

export function MobileNavigation() {
  return (
    <nav className="cyber-bottom-nav">
      <div className="container-fluid">
        <div className="row text-center">
          {bottomNavItems.map((item) => (
            <div key={item.to} className="col">
              <NavLink
                to={item.to}
                className={({ isActive }) => `cyber-bottom-nav-item w-100 ${isActive ? 'active' : ''}`}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
