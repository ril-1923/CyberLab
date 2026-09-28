import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/contexts/AuthContext';
import { quizzes } from '@/data/quizzes';
import { Link } from 'react-router-dom';

export function QuizListPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <PageHeader
        title="Quizzes"
        subtitle="Test your knowledge with cybersecurity quizzes"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Quizzes' }]}
      />

      <div className="row g-4 cyber-stagger">
        {quizzes.map((quiz) => {
          const result = user?.completedQuizzes[quiz.id];
          const completed = !!result;
          return (
            <div key={quiz.id} className="col-md-6 col-lg-4">
              <Link to={`/quiz/${quiz.id}`} className="cyber-link-card">
                <div className="cyber-card p-4 h-100">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="cyber-icon-box">
                      <i className="bi bi-patch-question"></i>
                    </div>
                    {completed && (
                      <span className="badge text-bg-success">
                        <i className="bi bi-check-circle me-1"></i>{result.score}%
                      </span>
                    )}
                  </div>
                  <h5 className="fw-bold mb-2">{quiz.title}</h5>
                  <p className="cyber-text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{quiz.description}</p>
                  <div className="d-flex flex-wrap gap-2 mb-3" style={{ fontSize: '0.78rem' }}>
                    <span className="cyber-text-muted"><i className="bi bi-tag me-1"></i>{quiz.category}</span>
                    <span className="cyber-text-muted"><i className="bi bi-question-circle me-1"></i>{quiz.questions.length} questions</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="cyber-text-primary fw-bold" style={{ fontSize: '0.85rem' }}>
                      <i className="bi bi-star-fill me-1"></i>{quiz.xpReward} XP
                    </span>
                    <span className="btn btn-sm btn-outline-primary">
                      {completed ? 'Retry' : 'Start'} <i className="bi bi-arrow-right ms-1"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
