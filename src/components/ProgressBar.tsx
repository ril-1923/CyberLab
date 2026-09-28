interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  height?: string;
}

export function ProgressBar({ value, max = 100, label, showPercent = true, height = '8px' }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {(label || showPercent) && (
        <div className="d-flex justify-content-between mb-1">
          {label && <span className="cyber-text-muted" style={{ fontSize: '0.82rem' }}>{label}</span>}
          {showPercent && <span className="cyber-text-primary" style={{ fontSize: '0.82rem', fontWeight: 600 }}>{percent}%</span>}
        </div>
      )}
      <div className="progress" style={{ height }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
}
