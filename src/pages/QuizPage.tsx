import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { ProgressBar } from '@/components/ProgressBar';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { getQuizById } from '@/data/quizzes';
import type { QuizResult } from '@/types';

export function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const quiz = id ? getQuizById(id) : undefined;
  const { user, completeQuiz, unlockAchievement } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!quiz) {
    return (
      <DashboardLayout>
        <EmptyState icon="bi-exclamation-circle" title="Quiz not found" message="This quiz does not exist."
          action={<Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>} />
      </DashboardLayout>
    );
  }

  const question = quiz.questions[currentQ];
  const progress = ((currentQ) / quiz.questions.length) * 100;
  const correctCount = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length;
  const incorrectCount = quiz.questions.length - correctCount;

  function handleSelect(idx: number) {
    if (showExplanation) return;
    setSelected(idx);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQ < quiz!.questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setShowExplanation(false);
      } else {
        finishQuiz(newAnswers);
      }
    }, 2000);
  }

  function finishQuiz(finalAnswers: number[]) {
    const correct = finalAnswers.filter((a, i) => a === quiz!.questions[i].correctIndex).length;
    const incorrect = quiz!.questions.length - correct;
    const score = Math.round((correct / quiz!.questions.length) * 100);
    const xpEarned = Math.round((score / 100) * quiz!.xpReward);

    const result: QuizResult = {
      quizId: quiz!.id,
      score,
      correct,
      incorrect,
      total: quiz!.questions.length,
      xpEarned,
      completedAt: new Date().toISOString(),
    };

    if (user) {
      completeQuiz(result);
      if (!user.unlockedAchievements.includes('a5')) {
        unlockAchievement('a5');
        showToast('Achievement: Quiz Master!', 'success', 'bi-patch-question');
      }
    }

    setShowResult(true);
  }

  function handleRetry() {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setShowExplanation(false);
  }

  if (showResult) {
    return (
      <DashboardLayout>
        <PageHeader title="Quiz Results" breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Quiz Results' }]} />
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="cyber-card p-4 p-md-5 text-center cyber-fade-in">
              <div className="cyber-icon-box mx-auto mb-3" style={{ width: 72, height: 72, fontSize: '2rem' }}>
                <i className={`bi ${correctCount >= incorrectCount ? 'bi-trophy-fill' : 'bi-patch-question'}`}></i>
              </div>
              <h3 className="fw-bold mb-1">{quiz.title}</h3>
              <p className="cyber-text-muted mb-4">Here is how you did</p>

              <div className="row g-3 mb-4">
                <div className="col-4">
                  <div className="cyber-stat-card">
                    <div className="cyber-stat-number" style={{ color: 'var(--cyber-primary)' }}>{correctCount}</div>
                    <div className="cyber-stat-label">Correct</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="cyber-stat-card">
                    <div className="cyber-stat-number" style={{ color: 'var(--cyber-danger)' }}>{incorrectCount}</div>
                    <div className="cyber-stat-label">Incorrect</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="cyber-stat-card">
                    <div className="cyber-stat-number" style={{ color: 'var(--cyber-warning)' }}>{Math.round((correctCount / quiz.questions.length) * 100)}%</div>
                    <div className="cyber-stat-label">Score</div>
                  </div>
                </div>
              </div>

              <div className="cyber-note mb-4">
                <i className="bi bi-star-fill me-2 cyber-text-primary"></i>
                <span className="fw-bold">XP Earned: +{Math.round((correctCount / quiz.questions.length) * 100 / 100 * quiz.xpReward)}</span>
              </div>

              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-outline-primary" onClick={handleRetry}>
                  <i className="bi bi-arrow-repeat me-2"></i>Retry
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                  <i className="bi bi-grid-1x2 me-2"></i>Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title={quiz.title}
        subtitle={quiz.description}
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Quiz' }]}
      />

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="cyber-card p-4 p-md-5 cyber-fade-in">
            {/* Progress */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>
                Question {currentQ + 1} / {quiz.questions.length}
              </span>
              <span className="cyber-text-primary fw-bold" style={{ fontSize: '0.85rem' }}>
                {Math.round(progress)}% Complete
              </span>
            </div>
            <ProgressBar value={currentQ} max={quiz.questions.length} showPercent={false} height="6px" />

            <h4 className="fw-bold mt-4 mb-4">{question.question}</h4>

            <div className="d-flex flex-column gap-3">
              {question.options.map((opt, i) => {
                let className = 'cyber-quiz-option';
                if (showExplanation) {
                  if (i === question.correctIndex) className += ' correct';
                  else if (i === selected) className += ' incorrect';
                } else if (i === selected) {
                  className += ' selected';
                }
                return (
                  <div key={i} className={className} onClick={() => handleSelect(i)}>
                    <span className="cyber-quiz-option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ fontSize: '0.92rem' }}>{opt}</span>
                    {showExplanation && i === question.correctIndex && (
                      <i className="bi bi-check-circle-fill ms-auto cyber-text-primary"></i>
                    )}
                    {showExplanation && i === selected && i !== question.correctIndex && (
                      <i className="bi bi-x-circle-fill ms-auto text-danger"></i>
                    )}
                  </div>
                );
              })}
            </div>

            {showExplanation && (
              <div className="cyber-tip mt-4">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Explanation:</strong> {question.explanation}
              </div>
            )}

            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={selected === null || showExplanation}
              >
                {currentQ < quiz.questions.length - 1 ? 'Next' : 'Finish'}
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
