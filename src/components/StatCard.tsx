interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: 'primary' | 'cyan' | 'warning' | 'danger';
  subtitle?: string;
}

export function StatCard({ icon, label, value, color = 'primary', subtitle }: StatCardProps) {
  const iconClass = color === 'cyan' ? 'cyan' : color === 'warning' ? 'warning' : color === 'danger' ? 'danger' : '';
  return (
    <div className="cyber-stat-card cyber-fade-in">
      <div className={`cyber-stat-card-icon ${iconClass}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="cyber-stat-number" style={{ fontSize: '1.75rem' }}>{value}</div>
      <div className="cyber-stat-label">{label}</div>
      {subtitle && <div className="cyber-text-muted mt-1" style={{ fontSize: '0.78rem' }}>{subtitle}</div>}
    </div>
  );
}
