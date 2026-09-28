import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  breadcrumbs?: { label: string; to?: string }[];
  actions?: ReactNode;
}

import { Link } from 'react-router-dom';

export function PageHeader({ title, subtitle, icon, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="cyber-page-header cyber-fade-in">
      {breadcrumbs && (
        <nav className="cyber-breadcrumb" aria-label="breadcrumb">
          {breadcrumbs.map((bc, i) => (
            <span key={i} className="d-flex align-items-center gap-2">
              {i > 0 && <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem' }} />}
              {bc.to ? <Link to={bc.to}>{bc.label}</Link> : <span className="active">{bc.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3">
          {icon && (
            <div className="cyber-icon-box">
              <i className={`bi ${icon}`}></i>
            </div>
          )}
          <div>
            <h1 className="cyber-section-title mb-0">{title}</h1>
            {subtitle && <p className="cyber-section-subtitle mb-0 mt-1">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="d-flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}
