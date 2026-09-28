import type { Achievement } from '@/types';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
}

export function AchievementCard({ achievement, unlocked }: AchievementCardProps) {
  return (
    <div className={`cyber-achievement-card ${unlocked ? 'unlocked' : 'locked'}`}>
      <div className={`cyber-badge-icon ${unlocked ? 'unlocked' : 'locked'}`}>
        <i className={`bi ${unlocked ? achievement.icon : 'bi-lock'}`}></i>
      </div>
      <h6 className="fw-bold mt-3 mb-1">{achievement.name}</h6>
      <p className="cyber-text-muted mb-2" style={{ fontSize: '0.8rem', minHeight: '2.4em' }}>{achievement.description}</p>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <span className="cyber-text-primary fw-bold" style={{ fontSize: '0.8rem' }}>
          <i className="bi bi-star-fill me-1"></i>{achievement.xp} XP
        </span>
        {unlocked ? (
          <span className="badge text-bg-success">Unlocked</span>
        ) : (
          <span className="badge text-bg-secondary">Locked</span>
        )}
      </div>
    </div>
  );
}
