import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { EmptyState } from '@/components/EmptyState';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { getCourseById, getCourseProgressPercent } from '@/data/courses';
import { achievements } from '@/data/achievements';
import type { Lesson } from '@/types';

export function LearningPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const course = id ? getCourseById(id) : undefined;
  const { user, completeLesson, unlockAchievement } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const allLessons = useMemo(() => course?.modules.flatMap((m) => m.lessons) ?? [], [course]);
  const initialLessonId = searchParams.get('lesson') || allLessons[0]?.id || '';
  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);

  useEffect(() => {
    if (course && allLessons.length > 0 && !allLessons.find((l) => l.id === currentLessonId)) {
      setCurrentLessonId(allLessons[0].id);
    }
  }, [course, allLessons, currentLessonId]);

  if (!course || allLessons.length === 0) {
    return (
      <DashboardLayout>
        <EmptyState icon="bi-exclamation-circle" title="Course not found" message="This course does not exist."
          action={<Link to="/courses" className="btn btn-primary">Back to Courses</Link>} />
      </DashboardLayout>
    );
  }

  const currentLesson: Lesson = allLessons.find((l) => l.id === currentLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isCompleted = user ? user.completedLessons.includes(currentLesson.id) : false;
  const progress = user ? getCourseProgressPercent(course.id, user.completedLessons) : 0;

  function handleComplete() {
    if (!user || isCompleted) return;
    completeLesson(currentLesson.id, 50);
    showToast(`Lesson completed! +50 XP`, 'success', 'bi-star-fill');

    if (!user.unlockedAchievements.includes('a2')) {
      unlockAchievement('a2');
      showToast('Achievement: First Course!', 'success', 'bi-award');
    }

    const newCompleted = [...user.completedLessons, currentLesson.id];
    const allDone = course!.modules.every((m) => m.lessons.every((l) => newCompleted.includes(l.id)));
    if (allDone) {
      unlockAchievement('a11');
      showToast('Achievement: Course Completer!', 'success', 'bi-mortarboard');
      if (course!.id === 'c1') {
        unlockAchievement('a7');
        showToast('Achievement: Cyber Defender!', 'success', 'bi-shield-check');
      }
      if (course!.id === 'c3') {
        unlockAchievement('a8');
        showToast('Achievement: Network Guardian!', 'success', 'bi-hdd-network');
      }
      if (course!.id === 'c4') {
        unlockAchievement('a9');
        showToast('Achievement: Web Security Specialist!', 'success', 'bi-globe');
      }
    }
  }

  function handleNext() {
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id);
      navigate(`/learning/${course!.id}?lesson=${nextLesson.id}`, { replace: true });
    }
  }

  function handlePrev() {
    if (prevLesson) {
      setCurrentLessonId(prevLesson.id);
      navigate(`/learning/${course!.id}?lesson=${prevLesson.id}`, { replace: true });
    }
  }

  return (
    <DashboardLayout>
      <div className="d-flex align-items-center gap-2 mb-3">
        <Link to="/courses" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>
          <i className="bi bi-arrow-left me-1"></i>Back to Courses
        </Link>
        <span className="cyber-text-muted">/</span>
        <Link to={`/courses/${course.id}`} className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>{course.title}</Link>
      </div>

      <div className="row g-4">
        {/* Sidebar: modules and lessons */}
        <div className="col-lg-3">
          <div className="cyber-card p-3" style={{ position: 'sticky', top: '80px' }}>
            <h6 className="fw-bold mb-2">{course.title}</h6>
            <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.78rem' }}>
              <span className="cyber-text-muted">Progress</span>
              <span className="cyber-text-primary fw-bold">{progress}%</span>
            </div>
            <div className="progress mb-3" style={{ height: '5px' }}>
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {course.modules.map((m) => (
                <div key={m.id} className="mb-3">
                  <div className="cyber-module-title">{m.title}</div>
                  {m.lessons.map((l) => {
                    const done = user?.completedLessons.includes(l.id) ?? false;
                    const active = l.id === currentLesson.id;
                    return (
                      <div
                        key={l.id}
                        className={`cyber-lesson-item ${active ? 'active' : ''} ${done ? 'completed' : ''}`}
                        onClick={() => {
                          setCurrentLessonId(l.id);
                          navigate(`/learning/${course.id}?lesson=${l.id}`, { replace: true });
                        }}
                      >
                        <span className="cyber-lesson-check">
                          {done && <i className="bi bi-check"></i>}
                        </span>
                        <i className={`bi ${l.icon} cyber-text-muted`}></i>
                        <span className="flex-grow-1" style={{ fontSize: '0.82rem' }}>{l.title}</span>
                        <span className="cyber-text-muted" style={{ fontSize: '0.72rem' }}>{l.duration}m</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-lg-9">
          <div className="cyber-card p-4 p-md-5 cyber-fade-in">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="cyber-icon-box" style={{ width: 40, height: 40, fontSize: '1.1rem' }}>
                <i className={`bi ${currentLesson.icon}`}></i>
              </div>
              <div>
                <h4 className="fw-bold mb-0">{currentLesson.title}</h4>
                <span className="cyber-text-muted" style={{ fontSize: '0.82rem' }}>{currentLesson.duration} minutes</span>
              </div>
            </div>

            <hr style={{ borderColor: 'var(--cyber-border)' }} />

            <div style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
              {currentLesson.content.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'mb-1' : 'mb-3'}>{line}</p>
              ))}
            </div>

            {currentLesson.codeExample && (
              <div className="mt-4">
                <h6 className="fw-bold mb-2"><i className="bi bi-code-slash me-2 cyber-text-primary"></i>Code Example</h6>
                <pre className="cyber-code-block">{currentLesson.codeExample}</pre>
              </div>
            )}

            {currentLesson.note && (
              <div className="cyber-note mt-4">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Note:</strong> {currentLesson.note}
              </div>
            )}

            {currentLesson.tip && (
              <div className="cyber-tip mt-3">
                <i className="bi bi-lightbulb me-2"></i>
                <strong>Tip:</strong> {currentLesson.tip}
              </div>
            )}

            <hr className="my-4" style={{ borderColor: 'var(--cyber-border)' }} />

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={handlePrev} disabled={!prevLesson}>
                  <i className="bi bi-arrow-left me-1"></i>Previous
                </button>
                <button className="btn btn-outline-primary" onClick={handleNext} disabled={!nextLesson}>
                  Next<i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
              <button
                className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
                onClick={handleComplete}
                disabled={isCompleted}
              >
                {isCompleted ? (
                  <><i className="bi bi-check-circle me-2"></i>Completed</>
                ) : (
                  <><i className="bi bi-check2 me-2"></i>Mark as Complete (+50 XP)</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
