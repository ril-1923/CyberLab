import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { labs, getLabById } from '@/data/labs';
import type { Lab } from '@/types';
import { Link } from 'react-router-dom';

export function LabsPage() {
  const { user, addXp, addActivity, unlockAchievement } = useAuth();
  const { showToast } = useToast();
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  function handleStartLab(lab: Lab) {
    if (!user) return;
    addXp(lab.xp);
    addActivity({ type: 'lab', title: `Started "${lab.title}"`, detail: `Earned ${lab.xp} XP`, xp: lab.xp });
    showToast(`Lab started! +${lab.xp} XP`, 'success', 'bi-hdd-network');
    setSelectedLab(null);
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Cyber Labs"
        subtitle="Practice in safe, simulated cybersecurity environments"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Labs' }]}
      />

      <div className="row g-4 cyber-stagger">
        {labs.map((lab) => (
          <div key={lab.id} className="col-md-6 col-lg-4">
            <div className="cyber-lab-card h-100">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="cyber-icon-box">
                  <i className={`bi ${lab.icon}`}></i>
                </div>
                <span className={`badge text-bg-${lab.difficulty === 'Beginner' ? 'success' : lab.difficulty === 'Intermediate' ? 'warning' : 'danger'}`}>
                  {lab.difficulty}
                </span>
              </div>
              <h5 className="fw-bold mb-2">{lab.title}</h5>
              <p className="cyber-text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{lab.description}</p>

              <div className="d-flex flex-wrap gap-2 mb-3" style={{ fontSize: '0.78rem' }}>
                <span className="cyber-text-muted"><i className="bi bi-clock me-1"></i>{lab.estimatedTime} min</span>
                <span className="cyber-text-muted"><i className="bi bi-star-fill me-1"></i>{lab.xp} XP</span>
              </div>

              <div className="mb-3">
                <div className="d-flex flex-wrap gap-1">
                  {lab.skills.map((s, i) => (
                    <span key={i} className="badge text-bg-secondary" style={{ fontSize: '0.72rem' }}>{s}</span>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary w-100" onClick={() => setSelectedLab(lab)}>
                <i className="bi bi-play-fill me-2"></i>Start Lab
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Modal */}
      {selectedLab && (
        <>
          <div className="cyber-sidebar-overlay show" onClick={() => setSelectedLab(null)} />
          <div className="modal show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    <i className={`bi ${selectedLab.icon} me-2 cyber-text-primary`}></i>
                    {selectedLab.title}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedLab(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="cyber-note mb-3">
                    <i className="bi bi-info-circle me-2"></i>{selectedLab.scenario}
                  </div>
                  <h6 className="fw-bold mb-2">Tasks</h6>
                  <ol className="d-flex flex-column gap-2 mb-3">
                    {selectedLab.tasks.map((t, i) => (
                      <li key={i} style={{ fontSize: '0.88rem' }}>{t}</li>
                    ))}
                  </ol>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge text-bg-warning"><i className="bi bi-clock me-1"></i>{selectedLab.estimatedTime} min</span>
                    <span className="badge text-bg-success"><i className="bi bi-star-fill me-1"></i>{selectedLab.xp} XP</span>
                    <span className="badge text-bg-info"><i className="bi bi-bar-chart me-1"></i>{selectedLab.difficulty}</span>
                  </div>
                  <div className="cyber-surface p-3" style={{ borderRadius: '8px', border: '1px solid var(--cyber-border)' }}>
                    <div className="cyber-status-indicator mb-2">
                      <span className="cyber-status-dot"></span>
                      <span className="cyber-text-primary" style={{ fontSize: '0.82rem' }}>SIMULATED ENVIRONMENT</span>
                    </div>
                    <p className="cyber-text-muted mb-0" style={{ fontSize: '0.82rem' }}>
                      This lab runs in a safe, simulated environment. No real systems are involved. Completing the lab awards XP instantly.
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" onClick={() => setSelectedLab(null)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => handleStartLab(selectedLab)}>
                    <i className="bi bi-play-fill me-2"></i>Start Lab (+{selectedLab.xp} XP)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
