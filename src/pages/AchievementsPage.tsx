import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { AchievementCard } from '@/components/AchievementCard';
import { StatCard } from '@/components/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { achievements } from '@/data/achievements';

export function AchievementsPage() {
  const { user } = useAuth();
  if (!user) return null;

  const unlockedCount = user.unlockedAchievements.length;
  const totalCount = achievements.length;
  const totalXp = achievements
    .filter((a) => user.unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.xp, 0);

  return (
    <DashboardLayout>
      <PageHeader
        title="Achievements"
        subtitle="Unlock badges as you progress through CyberLab"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Achievements' }]}
      />

      <div className="row g-3 mb-4 cyber-stagger">
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-award" label="Unlocked" value={`${unlockedCount}/${totalCount}`} color="primary" />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-star-fill" label="Badge XP" value={totalXp.toLocaleString()} color="warning" />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-percent" label="Completion" value={`${Math.round((unlockedCount / totalCount) * 100)}%`} color="cyan" />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard icon="bi-lock" label="Remaining" value={totalCount - unlockedCount} color="danger" />
        </div>
      </div>

      <div className="row g-4 cyber-stagger">
        {achievements.map((a) => {
          const unlocked = user.unlockedAchievements.includes(a.id);
          return (
            <div key={a.id} className="col-md-6 col-lg-4 col-xl-3">
              <AchievementCard achievement={a} unlocked={unlocked} />
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
