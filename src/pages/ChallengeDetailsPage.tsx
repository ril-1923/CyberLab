import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { Terminal } from '@/components/Terminal';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { getChallengeById } from '@/data/challenges';
import { achievements } from '@/data/achievements';

export function ChallengeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const challenge = id ? getChallengeById(id) : undefined;
  const { user, completeChallenge, unlockAchievement } = useAuth();
  const { showToast } = useToast();
  const [answer, setAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [terminalRunning, setTerminalRunning] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setSolved(user?.completedChallenges.includes(challenge?.id || '') ?? false);
  }, [user, challenge]);

  if (!challenge) {
    return (
      <DashboardLayout>
        <EmptyState icon="bi-exclamation-circle" title="Challenge not found" message="This challenge does not exist."
          action={<Link to="/challenges" className="btn btn-primary">Back to Challenges</Link>} />
      </DashboardLayout>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    if (answer.trim().toLowerCase() === challenge!.flag.toLowerCase()) {
      if (!solved) {
        completeChallenge(challenge!.id, challenge!.xp);
        setSolved(true);
        showToast(`Challenge solved! +${challenge!.xp} XP`, 'success', 'bi-trophy');

        if (!user.unlockedAchievements.includes('a3')) {
          unlockAchievement('a3');
          showToast('Achievement: First Challenge!', 'success', 'bi-flag');
        }

        const solvedCount = user.completedChallenges.length + 1;
        if (solvedCount >= 10 && !user.unlockedAchievements.includes('a4')) {
          unlockAchievement('a4');
          showToast('Achievement: 10 Challenges!', 'success', 'bi-trophy');
        }

        if (challenge!.difficulty === 'Expert') {
          const expertSolved = user.completedChallenges
            .map((cid) => getChallengeById(cid))
            .filter((c) => c?.difficulty === 'Expert').length + 1;
          if (expertSolved >= 5 && !user.unlockedAchievements.includes('a10')) {
            unlockAchievement('a10');
            showToast('Achievement: Elite Hacker!', 'success', 'bi-lightning-charge');
          }
        }
      } else {
        showToast('You already solved this challenge.', 'info');
      }
    } else {
      showToast('Incorrect flag. Try again!', 'error', 'bi-x-circle');
    }
  }

  function runTerminal() {
    setTerminalRunning(true);
    setTimeout(() => setTerminalRunning(false), 2000);
  }

  const diffBadgeClass = `cyber-diff-badge-${challenge.difficulty.toLowerCase()}`;

  return (
    <DashboardLayout>
      <PageHeader
        title={challenge.title}
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Challenges', to: '/challenges' }, { label: challenge.title }]}
        actions={
          solved ? (
            <span className="badge text-bg-success py-2 px-3">
              <i className="bi bi-check-circle me-1"></i>Solved
            </span>
          ) : null
        }
      />

      <div className="row g-4">
        <div className="col-lg-8">
          {/* Challenge info */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className={`badge ${diffBadgeClass}`}>{challenge.difficulty}</span>
              <span className="badge text-bg-secondary">{challenge.category}</span>
              <span className="badge text-bg-warning"><i className="bi bi-star-fill me-1"></i>{challenge.xp} XP</span>
              <span className="badge text-bg-info"><i className="bi bi-people me-1"></i>{challenge.solves.toLocaleString()} solves</span>
            </div>
            <h5 className="fw-bold mb-2">Description</h5>
            <p className="cyber-text-muted mb-4" style={{ lineHeight: 1.7 }}>{challenge.description}</p>

            <h6 className="fw-bold mb-2">Scenario</h6>
            <div className="cyber-note mb-4">
              <i className="bi bi-info-circle me-2"></i>{challenge.scenario}
            </div>

            <h6 className="fw-bold mb-2">Objectives</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
              {challenge.objectives.map((o, i) => (
                <li key={i} className="d-flex align-items-start gap-2">
                  <i className="bi bi-arrow-right-short cyber-text-primary" style={{ fontSize: '1.2rem' }}></i>
                  <span style={{ fontSize: '0.9rem' }}>{o}</span>
                </li>
              ))}
            </ul>

            {/* Terminal */}
            <h6 className="fw-bold mb-2"><i className="bi bi-terminal me-2 cyber-text-primary"></i>Simulated Terminal</h6>
            <Terminal lines={challenge.terminalCommands} autoPlay={terminalRunning ? false : true} speed={60} />
            <button className="btn btn-outline-secondary btn-sm mt-2" onClick={runTerminal}>
              <i className="bi bi-arrow-clockwise me-1"></i>Re-run Simulation
            </button>
          </div>

          {/* Answer submission */}
          <div className="cyber-card p-4 cyber-fade-in">
            <h5 className="fw-bold mb-3"><i className="bi bi-flag me-2 cyber-text-primary"></i>Submit Flag</h5>
            {solved && (
              <div className="alert alert-success py-2 mb-3" style={{ fontSize: '0.85rem' }}>
                <i className="bi bi-check-circle me-2"></i>You have already solved this challenge. Well done!
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-key"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the flag (e.g., flag{...})"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button className="btn btn-primary" type="submit" disabled={solved && !answer}>
                  Submit <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </form>

            {/* Hints */}
            <div className="mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setShowHints(!showHints)}
              >
                <i className="bi bi-lightbulb me-1"></i>
                {showHints ? 'Hide' : 'Show'} Hints
              </button>
              {showHints && (
                <div className="mt-3 d-flex flex-column gap-2">
                  {challenge.hints.map((h, i) => (
                    <div key={i} className="cyber-surface p-3" style={{ borderRadius: '8px', border: '1px solid var(--cyber-border)' }}>
                      <div className="d-flex align-items-start gap-2">
                        <i className="bi bi-lightbulb-fill text-warning mt-1"></i>
                        <div>
                          <span className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>Hint {i + 1}</span>
                          <p className="mb-0" style={{ fontSize: '0.88rem' }}>{h}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <h6 className="fw-bold mb-3">Challenge Info</h6>
            <div className="d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-tag me-2"></i>Category</span>
                <span className="fw-bold">{challenge.category}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-bar-chart me-2"></i>Difficulty</span>
                <span className="fw-bold">{challenge.difficulty}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-people me-2"></i>Solves</span>
                <span className="fw-bold">{challenge.solves.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-star-fill me-2"></i>XP Reward</span>
                <span className="cyber-text-primary fw-bold">{challenge.xp} XP</span>
              </div>
            </div>
          </div>

          <div className="cyber-card p-4 cyber-fade-in">
            <h6 className="fw-bold mb-2"><i className="bi bi-shield-exclamation me-2 cyber-text-primary"></i>Safety Notice</h6>
            <p className="cyber-text-muted mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.6 }}>
              This is a simulated educational challenge. All scenarios are fictional and safe. No real systems are targeted.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
