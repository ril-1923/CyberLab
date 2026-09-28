import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useToast } from '@/components/Toast';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const { showToast } = useToast();
  const { user } = useAuth();
  const [dailyGoal, setDailyGoal] = useState(settings.learningPreferences.dailyGoal);

  function handleNotificationChange(key: keyof typeof settings.notifications, value: boolean) {
    updateSettings({
      notifications: { ...settings.notifications, [key]: value },
    });
    showToast('Settings saved', 'success', 'bi-check-circle');
  }

  function handleDailyGoalSave() {
    updateSettings({
      learningPreferences: { ...settings.learningPreferences, dailyGoal },
    });
    showToast('Daily goal updated!', 'success', 'bi-check-circle');
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Settings"
        subtitle="Manage your CyberLab preferences"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Settings' }]}
      />

      <div className="row g-4">
        {/* Appearance */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 cyber-fade-in">
            <h5 className="fw-bold mb-3"><i className="bi bi-palette me-2 cyber-text-primary"></i>Appearance</h5>
            <div className="d-flex gap-3">
              <button
                className={`cyber-card p-3 text-center flex-grow-1 ${theme === 'dark' ? 'cyber-card-glow' : ''}`}
                onClick={() => { setTheme('dark'); showToast('Dark mode enabled', 'info', 'bi-moon'); }}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-moon-stars" style={{ fontSize: '2rem', color: theme === 'dark' ? 'var(--cyber-primary)' : 'var(--cyber-text-muted)' }}></i>
                <div className="fw-bold mt-2" style={{ fontSize: '0.88rem' }}>Dark Mode</div>
                <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>Easy on the eyes</div>
              </button>
              <button
                className={`cyber-card p-3 text-center flex-grow-1 ${theme === 'light' ? 'cyber-card-glow' : ''}`}
                onClick={() => { setTheme('light'); showToast('Light mode enabled', 'info', 'bi-sun'); }}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-sun" style={{ fontSize: '2rem', color: theme === 'light' ? 'var(--cyber-primary)' : 'var(--cyber-text-muted)' }}></i>
                <div className="fw-bold mt-2" style={{ fontSize: '0.88rem' }}>Light Mode</div>
                <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>Bright and clear</div>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 cyber-fade-in">
            <h5 className="fw-bold mb-3"><i className="bi bi-bell me-2 cyber-text-primary"></i>Notifications</h5>
            <div className="d-flex flex-column gap-3">
              <div className="form-check form-switch d-flex align-items-center justify-content-between">
                <div>
                  <label className="form-check-label fw-bold" style={{ fontSize: '0.9rem' }}>Course Reminders</label>
                  <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>Get reminded about your courses</div>
                </div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={settings.notifications.courseReminders}
                  onChange={(e) => handleNotificationChange('courseReminders', e.target.checked)}
                  style={{ width: '2.5em', height: '1.25em' }}
                />
              </div>
              <div className="form-check form-switch d-flex align-items-center justify-content-between">
                <div>
                  <label className="form-check-label fw-bold" style={{ fontSize: '0.9rem' }}>Challenge Notifications</label>
                  <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>New challenges and updates</div>
                </div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={settings.notifications.challengeNotifications}
                  onChange={(e) => handleNotificationChange('challengeNotifications', e.target.checked)}
                  style={{ width: '2.5em', height: '1.25em' }}
                />
              </div>
              <div className="form-check form-switch d-flex align-items-center justify-content-between">
                <div>
                  <label className="form-check-label fw-bold" style={{ fontSize: '0.9rem' }}>Achievement Notifications</label>
                  <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>When you unlock badges</div>
                </div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={settings.notifications.achievementNotifications}
                  onChange={(e) => handleNotificationChange('achievementNotifications', e.target.checked)}
                  style={{ width: '2.5em', height: '1.25em' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Learning Preferences */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 cyber-fade-in">
            <h5 className="fw-bold mb-3"><i className="bi bi-mortarboard me-2 cyber-text-primary"></i>Learning Preferences</h5>
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ fontSize: '0.88rem' }}>Daily XP Goal</label>
              <div className="cyber-text-muted mb-2" style={{ fontSize: '0.78rem' }}>Set a target for daily learning activity</div>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  min={10}
                  max={1000}
                  step={10}
                />
                <span className="input-group-text">XP</span>
                <button className="btn btn-primary" onClick={handleDailyGoalSave}>Save</button>
              </div>
            </div>
            <div>
              <label className="form-label fw-bold" style={{ fontSize: '0.88rem' }}>Preferred Categories</label>
              <div className="cyber-text-muted mb-2" style={{ fontSize: '0.78rem' }}>Categories you are most interested in</div>
              <div className="d-flex flex-wrap gap-2">
                {['Web Security', 'Network Security', 'Cryptography', 'Ethical Hacking', 'Forensics', 'Cloud Security'].map((cat) => {
                  const selected = settings.learningPreferences.preferredCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      className={`badge ${selected ? 'text-bg-primary' : 'text-bg-secondary'}`}
                      style={{ fontSize: '0.78rem', cursor: 'pointer', padding: '6px 12px' }}
                      onClick={() => {
                        const current = settings.learningPreferences.preferredCategories;
                        const updated = selected ? current.filter((c) => c !== cat) : [...current, cat];
                        updateSettings({
                          learningPreferences: { ...settings.learningPreferences, preferredCategories: updated },
                        });
                      }}
                    >
                      {selected && <i className="bi bi-check me-1"></i>}{cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Account */}
        <div className="col-lg-6">
          <div className="cyber-card p-4 cyber-fade-in">
            <h5 className="fw-bold mb-3"><i className="bi bi-person-gear me-2 cyber-text-primary"></i>Account</h5>
            <div className="d-flex flex-column gap-3" style={{ fontSize: '0.88rem' }}>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-envelope me-2"></i>Email</span>
                <span className="fw-bold">{user?.email}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-person-badge me-2"></i>Username</span>
                <span className="fw-bold">@{user?.username}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-calendar me-2"></i>Joined</span>
                <span className="fw-bold">{user ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-shield me-2"></i>Account Type</span>
                <span className="fw-bold">{user?.isDemo ? 'Demo Account' : 'Standard Account'}</span>
              </div>
            </div>
            <hr style={{ borderColor: 'var(--cyber-border)' }} />
            <div className="cyber-text-muted" style={{ fontSize: '0.82rem' }}>
              <i className="bi bi-info-circle me-2"></i>
              Your data is stored locally in your browser. No information is sent to any server.
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
