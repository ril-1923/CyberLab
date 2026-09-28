import { Link } from 'react-router-dom';
import type { Challenge, ChallengeDifficulty } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface ChallengeCardProps {
  challenge: Challenge;
}

function getDiffBadgeClass(diff: ChallengeDifficulty): string {
  switch (diff) {
    case 'Easy': return 'cyber-diff-badge-easy';
    case 'Medium': return 'cyber-diff-badge-medium';
    case 'Hard': return 'cyber-diff-badge-hard';
    case 'Expert': return 'cyber-diff-badge-expert';
    default: return 'cyber-diff-badge-easy';
  }
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { user } = useAuth();
  const completed = user?.completedChallenges.includes(challenge.id) ?? false;

  return (
    <Link to={`/challenges/${challenge.id}`} className="cyber-link-card">
      <div className={`cyber-challenge-card h-100 ${completed ? 'completed' : ''}`}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span className={`badge ${getDiffBadgeClass(challenge.difficulty)}`}>{challenge.difficulty}</span>
          {completed && (
            <span className="badge text-bg-success">
              <i className="bi bi-check-circle me-1"></i>Solved
            </span>
          )}
        </div>
        <h5 className="fw-bold mb-2">{challenge.title}</h5>
        <p className="cyber-text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{challenge.description}</p>
        <div className="d-flex flex-wrap gap-2 mb-3" style={{ fontSize: '0.78rem' }}>
          <span className="cyber-text-muted"><i className="bi bi-tag me-1"></i>{challenge.category}</span>
          <span className="cyber-text-muted"><i className="bi bi-people me-1"></i>{challenge.solves.toLocaleString()} solves</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="cyber-text-primary fw-bold" style={{ fontSize: '0.85rem' }}>
            <i className="bi bi-star-fill me-1"></i>{challenge.xp} XP
          </span>
          <span className="btn btn-sm btn-outline-primary">
            {completed ? 'Review' : 'Solve'} <i className="bi bi-arrow-right ms-1"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}
