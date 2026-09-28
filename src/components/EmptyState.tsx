import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = 'bi-inbox', title, message, action }: EmptyStateProps) {
  return (
    <div className="cyber-empty-state">
      <i className={`bi ${icon}`}></i>
      <h4 className="mb-2">{title}</h4>
      {message && <p className="cyber-text-muted mb-3">{message}</p>}
      {action}
    </div>
  );
}
