import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { useAuth } from '@/contexts/AuthContext';
import { leaderboardUsers } from '@/data/leaderboard';

type Period = 'Weekly' | 'Monthly' | 'All Time';

export function LeaderboardPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<Period>('All Time');

  const users = [...leaderboardUsers];

  if (user) {
    const userEntry: typeof leaderboardUsers[0] = {
      rank: 0,
      username: user.username,
      level: user.level,
      xp: user.xp,
      challenges: user.challengesSolved,
      badges: user.unlockedAchievements.length,
      isCurrentUser: true,
    };
    users.push(userEntry);
  }

  users.sort((a, b) => b.xp - a.xp);
  users.forEach((u, i) => { u.rank = i + 1; });

  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  function getRankClass(rank: number): string {
    if (rank === 1) return 'cyber-rank-1';
    if (rank === 2) return 'cyber-rank-2';
    if (rank === 3) return 'cyber-rank-3';
    return 'cyber-rank-default';
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Leaderboard"
        subtitle="Compete with cyber defenders worldwide (simulated rankings)"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Leaderboard' }]}
      />

      {/* Period filter */}
      <div className="d-flex gap-2 mb-4">
        {(['Weekly', 'Monthly', 'All Time'] as Period[]).map((p) => (
          <button
            key={p}
            className={`btn btn-sm ${period === p ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setPeriod(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Top 3 */}
      <div className="row g-3 mb-4 cyber-stagger">
        {topThree.map((u, i) => (
          <div key={u.username} className="col-md-4">
            <div className={`cyber-card p-4 text-center ${u.isCurrentUser ? 'cyber-card-glow' : ''}`}>
              <div className={`cyber-rank-badge mx-auto mb-3 ${getRankClass(u.rank)}`} style={{ width: 56, height: 56, fontSize: '1.2rem' }}>
                {u.rank}
              </div>
              <div className="cyber-avatar mx-auto mb-2" style={{ width: 48, height: 48, fontSize: '1rem', background: i === 0 ? '#ffd700' : i === 1 ? '#c0c0c0' : '#cd7f32' }}>
                {u.username.substring(0, 2).toUpperCase()}
              </div>
              <h6 className="fw-bold mb-1">
                {u.username}
                {u.isCurrentUser && <span className="badge text-bg-success ms-2" style={{ fontSize: '0.68rem' }}>You</span>}
              </h6>
              <div className="cyber-text-muted mb-2" style={{ fontSize: '0.82rem' }}>Level {u.level}</div>
              <div className="cyber-stat-number" style={{ fontSize: '1.5rem' }}>{u.xp.toLocaleString()}</div>
              <div className="cyber-stat-label">XP</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="cyber-card cyber-fade-in overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Rank</th>
                <th>Username</th>
                <th className="text-center">Level</th>
                <th className="text-end">XP</th>
                <th className="text-center d-none d-md-table-cell">Challenges</th>
                <th className="text-center d-none d-md-table-cell">Badges</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((u) => (
                <tr key={u.username} className={`cyber-leaderboard-row ${u.isCurrentUser ? 'current-user' : ''}`}>
                  <td>
                    <div className={`cyber-rank-badge ${getRankClass(u.rank)}`} style={{ width: 32, height: 32, fontSize: '0.78rem' }}>
                      {u.rank}
                    </div>
                  </td>
                  <td>
                    <span className="fw-bold">{u.username}</span>
                    {u.isCurrentUser && <span className="badge text-bg-success ms-2" style={{ fontSize: '0.68rem' }}>You</span>}
                  </td>
                  <td className="text-center">{u.level}</td>
                  <td className="text-end cyber-text-primary fw-bold">{u.xp.toLocaleString()}</td>
                  <td className="text-center d-none d-md-table-cell">{u.challenges}</td>
                  <td className="text-center d-none d-md-table-cell">{u.badges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="cyber-text-muted text-center mt-3" style={{ fontSize: '0.82rem' }}>
        <i className="bi bi-info-circle me-1"></i>These are simulated users for demonstration purposes only.
      </p>
    </DashboardLayout>
  );
}
