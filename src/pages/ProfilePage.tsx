import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ProgressBar } from '@/components/ProgressBar';
import { AchievementCard } from '@/components/AchievementCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { courses, getCourseProgressPercent } from '@/data/courses';
import { achievements } from '@/data/achievements';
import { xpToNextLevel, timeAgo, getInitials } from '@/utils/helpers';

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');

  if (!user) return null;

  const xpInfo = xpToNextLevel(user.xp);
  const userAchievements = achievements.filter((a) => user.unlockedAchievements.includes(a.id));
  const inProgressCourses = courses.filter((c) => {
    const p = getCourseProgressPercent(c.id, user.completedLessons);
    return p > 0;
  });

  function handleSave() {
    updateUser({ fullName, username, bio });
    setEditing(false);
    showToast('Profile updated successfully!', 'success', 'bi-check-circle');
  }

  function handleCancel() {
    setFullName(user!.fullName);
    setUsername(user!.username);
    setBio(user!.bio);
    setEditing(false);
  }

  const activityIcon = (type: string) => {
    switch (type) {
      case 'course': return 'bi-book';
      case 'challenge': return 'bi-flag';
      case 'quiz': return 'bi-patch-question';
      case 'achievement': return 'bi-award';
      case 'lab': return 'bi-hdd-network';
      default: return 'bi-activity';
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Profile"
        subtitle="View and manage your CyberLab profile"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Profile' }]}
        actions={
          !editing ? (
            <button className="btn btn-outline-primary" onClick={() => setEditing(true)}>
              <i className="bi bi-pencil me-2"></i>Edit Profile
            </button>
          ) : (
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>
                <i className="bi bi-check2 me-2"></i>Save
              </button>
            </div>
          )
        }
      />

      <div className="row g-4">
        {/* Profile card */}
        <div className="col-lg-4">
          <div className="cyber-card p-4 text-center mb-4 cyber-fade-in">
            <div className="cyber-avatar mx-auto mb-3" style={{ width: 96, height: 96, fontSize: '2rem', background: user.avatarColor }}>
              {getInitials(user.fullName)}
            </div>
            {!editing ? (
              <>
                <h4 className="fw-bold mb-1">{user.fullName}</h4>
                <p className="cyber-text-muted mb-2" style={{ fontSize: '0.88rem' }}>@{user.username}</p>
                <span className="badge text-bg-primary mb-3">Level {user.level}</span>
                <p className="cyber-text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{user.bio}</p>
              </>
            ) : (
              <div className="text-start">
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: '0.82rem' }}>Full Name</label>
                  <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: '0.82rem' }}>Username</label>
                  <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: '0.82rem' }}>Bio</label>
                  <textarea className="form-control" rows={3} value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center gap-4 mt-3">
              <div>
                <div className="cyber-stat-number" style={{ fontSize: '1.5rem' }}>{user.xp.toLocaleString()}</div>
                <div className="cyber-stat-label">XP</div>
              </div>
              <div>
                <div className="cyber-stat-number" style={{ fontSize: '1.5rem' }}>{user.streak}</div>
                <div className="cyber-stat-label">Streak</div>
              </div>
              <div>
                <div className="cyber-stat-number" style={{ fontSize: '1.5rem' }}>{user.unlockedAchievements.length}</div>
                <div className="cyber-stat-label">Badges</div>
              </div>
            </div>
          </div>

          {/* Level progress */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <h6 className="fw-bold mb-3">Level Progress</h6>
            <ProgressBar value={xpInfo.current} max={xpInfo.needed} label={`Level ${user.level} → ${user.level + 1}`} />
          </div>

          {/* Stats */}
          <div className="row g-3">
            <div className="col-6">
              <StatCard icon="bi-mortarboard" label="Courses Done" value={user.coursesCompleted} color="cyan" />
            </div>
            <div className="col-6">
              <StatCard icon="bi-flag" label="Solved" value={user.challengesSolved} color="warning" />
            </div>
            <div className="col-6">
              <StatCard icon="bi-book" label="Lessons" value={user.completedLessons.length} color="primary" />
            </div>
            <div className="col-6">
              <StatCard icon="bi-calendar" label="Joined" value={new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} color="danger" />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-8">
          {/* Learning progress */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <h5 className="fw-bold mb-3">Learning Progress</h5>
            {inProgressCourses.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {inProgressCourses.map((c) => {
                  const p = getCourseProgressPercent(c.id, user.completedLessons);
                  return (
                    <div key={c.id}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <i className={`bi ${c.icon} cyber-text-primary`}></i>
                        <span className="fw-bold" style={{ fontSize: '0.88rem' }}>{c.title}</span>
                        <span className="cyber-text-primary ms-auto fw-bold" style={{ fontSize: '0.82rem' }}>{p}%</span>
                      </div>
                      <ProgressBar value={p} showPercent={false} height="6px" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="cyber-text-muted" style={{ fontSize: '0.88rem' }}>No courses in progress yet.</p>
            )}
          </div>

          {/* Recent activity */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <h5 className="fw-bold mb-3">Recent Activity</h5>
            <div className="d-flex flex-column gap-3">
              {user.activityLog.slice(0, 8).map((a) => (
                <div key={a.id} className="d-flex align-items-start gap-3">
                  <div className="cyber-icon-box" style={{ width: 36, height: 36, fontSize: '0.9rem', flexShrink: 0 }}>
                    <i className={`bi ${activityIcon(a.type)}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{a.title}</div>
                    <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>{a.detail}</div>
                    <div className="cyber-text-muted" style={{ fontSize: '0.72rem' }}>{timeAgo(a.timestamp)}</div>
                  </div>
                  {a.xp && <span className="cyber-text-primary fw-bold" style={{ fontSize: '0.78rem' }}>+{a.xp}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="cyber-card p-4 cyber-fade-in">
            <h5 className="fw-bold mb-3">Badges ({userAchievements.length})</h5>
            {userAchievements.length > 0 ? (
              <div className="row g-3">
                {userAchievements.map((a) => (
                  <div key={a.id} className="col-md-6 col-lg-4">
                    <AchievementCard achievement={a} unlocked={true} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="cyber-text-muted" style={{ fontSize: '0.88rem' }}>No badges unlocked yet. Start learning to earn achievements!</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
