import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { ProgressBar } from '@/components/ProgressBar';
import { EmptyState } from '@/components/EmptyState';
import { CourseCard } from '@/components/CourseCard';
import { ChallengeCard } from '@/components/ChallengeCard';
import { useAuth } from '@/contexts/AuthContext';
import { courses, getCourseProgressPercent } from '@/data/courses';
import { challenges } from '@/data/challenges';
import { xpToNextLevel, timeAgo } from '@/utils/helpers';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const weeklyData = [
  { day: 'Mon', xp: 120, challenges: 1 },
  { day: 'Tue', xp: 200, challenges: 2 },
  { day: 'Wed', xp: 80, challenges: 0 },
  { day: 'Thu', xp: 300, challenges: 3 },
  { day: 'Fri', xp: 150, challenges: 1 },
  { day: 'Sat', xp: 250, challenges: 2 },
  { day: 'Sun', xp: 180, challenges: 1 },
];

const progressCourses = [
  { id: 'c1', title: 'Cybersecurity Fundamentals', icon: 'bi-shield-check' },
  { id: 'c3', title: 'Network Security Mastery', icon: 'bi-hdd-network' },
  { id: 'c4', title: 'Web Application Security', icon: 'bi-globe' },
  { id: 'c2', title: 'Ethical Hacking Essentials', icon: 'bi-bug' },
];

export function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  const xpInfo = xpToNextLevel(user.xp);
  const inProgressCourses = courses.filter((c) => {
    const p = getCourseProgressPercent(c.id, user.completedLessons);
    return p > 0 && p < 100;
  });
  const recommendedChallenges = challenges.filter((c) => !user.completedChallenges.includes(c.id)).slice(0, 4);
  const recentActivity = user.activityLog.slice(0, 6);

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
        title={`Welcome back, ${user.fullName.split(' ')[0]}.`}
        subtitle="Here is your cybersecurity training overview."
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {/* Stats */}
      <div className="row g-3 mb-4 cyber-stagger">
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-star-fill" label="Total XP" value={user.xp.toLocaleString()} color="primary" subtitle={`Level ${user.level}`} />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-mortarboard" label="Courses Done" value={user.coursesCompleted} color="cyan" />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-flag" label="Challenges Solved" value={user.challengesSolved} color="warning" />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-fire" label="Day Streak" value={user.streak} color="danger" />
        </div>
      </div>

      <div className="row g-4">
        {/* Left column */}
        <div className="col-lg-8">
          {/* Level progress */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-bold mb-0">Level {user.level} Progress</h5>
                <span className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>{xpInfo.current} / {xpInfo.needed} XP to Level {user.level + 1}</span>
              </div>
              <div className="cyber-icon-box"><i className="bi bi-graph-up"></i></div>
            </div>
            <ProgressBar value={xpInfo.current} max={xpInfo.needed} showPercent={false} height="12px" />
          </div>

          {/* Weekly Activity Chart */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Weekly Activity</h5>
              <span className="cyber-text-muted" style={{ fontSize: '0.82rem' }}>XP earned per day</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d2b" />
                <XAxis dataKey="day" stroke="#7a8c89" fontSize={12} />
                <YAxis stroke="#7a8c89" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#131a19', border: '1px solid #1f2d2b', borderRadius: '8px', color: '#e8f0ee' }}
                  labelStyle={{ color: '#00ff9d' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#00ff9d" strokeWidth={2} fill="url(#xpGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Continue Learning */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Continue Learning</h5>
              <Link to="/courses" className="cyber-text-primary" style={{ fontSize: '0.85rem' }}>View all</Link>
            </div>
            {inProgressCourses.length > 0 ? (
              <div className="row g-3">
                {inProgressCourses.slice(0, 2).map((c) => (
                  <div key={c.id} className="col-md-6">
                    <CourseCard course={c} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="cyber-card p-3">
                <EmptyState
                  icon="bi-book"
                  title="No courses in progress"
                  message="Start a course to see it here."
                  action={<Link to="/courses" className="btn btn-primary btn-sm">Browse Courses</Link>}
                />
              </div>
            )}
          </div>

          {/* Recommended Challenges */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recommended Challenges</h5>
              <Link to="/challenges" className="cyber-text-primary" style={{ fontSize: '0.85rem' }}>View all</Link>
            </div>
            <div className="row g-3">
              {recommendedChallenges.map((c) => (
                <div key={c.id} className="col-md-6">
                  <ChallengeCard challenge={c} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-4">
          {/* Learning Progress */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <h5 className="fw-bold mb-3">Learning Progress</h5>
            <div className="d-flex flex-column gap-3">
              {progressCourses.map((pc) => {
                const progress = getCourseProgressPercent(pc.id, user.completedLessons);
                return (
                  <Link key={pc.id} to={`/courses/${pc.id}`} className="cyber-link-card">
                    <div className="cyber-progress-card">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className={`bi ${pc.icon} cyber-text-primary`}></i>
                        <span className="fw-bold" style={{ fontSize: '0.85rem' }}>{pc.title}</span>
                      </div>
                      <ProgressBar value={progress} height="6px" showPercent={true} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="cyber-card p-4 cyber-fade-in">
            <h5 className="fw-bold mb-3">Recent Activity</h5>
            {recentActivity.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {recentActivity.map((a) => (
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
            ) : (
              <EmptyState icon="bi-activity" title="No activity yet" message="Start learning to see activity here." />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
