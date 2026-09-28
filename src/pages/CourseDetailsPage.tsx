import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { ProgressBar } from '@/components/ProgressBar';
import { EmptyState } from '@/components/EmptyState';
import { getCourseById, getCourseProgressPercent } from '@/data/courses';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { getDifficultyColor } from '@/utils/helpers';

export function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourseById(id) : undefined;
  const { user, unlockAchievement } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) {
    return (
      <DashboardLayout>
        <EmptyState icon="bi-exclamation-circle" title="Course not found" message="This course does not exist."
          action={<Link to="/courses" className="btn btn-primary">Back to Courses</Link>} />
      </DashboardLayout>
    );
  }

  const progress = user ? getCourseProgressPercent(course.id, user.completedLessons) : 0;
  const started = progress > 0;
  const completedLessons = user ? user.completedLessons : [];
  const diffColor = getDifficultyColor(course.difficulty);

  function handleStart() {
    if (!user) return;
    if (!user.unlockedAchievements.includes('a2')) {
      unlockAchievement('a2');
      showToast('Achievement unlocked: First Course!', 'success', 'bi-award');
    }
    navigate(`/learning/${course!.id}`);
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'bi-info-circle' },
    { id: 'curriculum', label: 'Curriculum', icon: 'bi-list-task' },
    { id: 'requirements', label: 'Requirements', icon: 'bi-check2-all' },
    { id: 'instructor', label: 'Instructor', icon: 'bi-person' },
    { id: 'reviews', label: 'Reviews', icon: 'bi-chat-quote' },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title={course.title}
        subtitle={course.description}
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Courses', to: '/courses' }, { label: course.title }]}
        actions={
          <button className="btn btn-primary" onClick={handleStart}>
            <i className={`bi ${started ? 'bi-play-fill' : 'bi-arrow-right'} me-2`}></i>
            {started ? 'Continue' : 'Start Course'}
          </button>
        }
      />

      <div className="row g-4">
        <div className="col-lg-8">
          {/* Course info banner */}
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="cyber-icon-box" style={{ width: 56, height: 56, fontSize: '1.5rem' }}>
                <i className={`bi ${course.icon}`}></i>
              </div>
              <div>
                <span className={`badge text-bg-${diffColor} mb-1`}>{course.difficulty}</span>
                <div className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>
                  <i className="bi bi-clock me-1"></i>{course.duration}h
                  <span className="mx-2">|</span>
                  <i className="bi bi-collection me-1"></i>{course.lessonsCount} lessons
                  <span className="mx-2">|</span>
                  <i className="bi bi-star-fill me-1"></i>{course.rating} ({course.reviewsCount})
                </div>
              </div>
            </div>
            {started && (
              <div className="mt-3">
                <ProgressBar value={progress} label="Your progress" />
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="cyber-card cyber-fade-in">
            <div className="cyber-nav-tabs d-flex flex-wrap px-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={`nav-link ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  <i className={`bi ${t.icon} me-1`}></i>{t.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === 'overview' && (
                <div>
                  <h5 className="fw-bold mb-3">Course Overview</h5>
                  <p className="cyber-text-muted mb-4" style={{ lineHeight: 1.7 }}>{course.longDescription}</p>
                  <h6 className="fw-bold mb-3">Learning Objectives</h6>
                  <ul className="list-unstyled d-flex flex-column gap-2">
                    {course.objectives.map((o, i) => (
                      <li key={i} className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill cyber-text-primary mt-1"></i>
                        <span style={{ fontSize: '0.9rem' }}>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div>
                  <h5 className="fw-bold mb-3">Course Curriculum</h5>
                  <div className="accordion" id="curriculumAccordion">
                    {course.modules.map((m, mi) => (
                      <div key={m.id} className="accordion-item mb-2">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${mi !== 0 ? 'collapsed' : ''}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#module-${m.id}`}
                          >
                            <span className="fw-bold">{m.title}</span>
                            <span className="cyber-text-muted ms-2" style={{ fontSize: '0.82rem' }}>
                              ({m.lessons.length} lessons)
                            </span>
                          </button>
                        </h2>
                        <div id={`module-${m.id}`} className={`accordion-collapse collapse ${mi === 0 ? 'show' : ''}`}>
                          <div className="accordion-body p-0">
                            {m.lessons.map((l) => {
                              const done = completedLessons.includes(l.id);
                              return (
                                <Link key={l.id} to={`/learning/${course.id}?lesson=${l.id}`} className="cyber-lesson-item">
                                  <span className={`cyber-lesson-check ${done ? 'completed' : ''}`}>
                                    {done && <i className="bi bi-check"></i>}
                                  </span>
                                  <i className={`bi ${l.icon} cyber-text-muted`}></i>
                                  <span className="flex-grow-1" style={{ fontSize: '0.88rem' }}>{l.title}</span>
                                  <span className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>{l.duration}m</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div>
                  <h5 className="fw-bold mb-3">Requirements</h5>
                  <ul className="list-unstyled d-flex flex-column gap-2">
                    {course.requirements.map((r, i) => (
                      <li key={i} className="d-flex align-items-start gap-2">
                        <i className="bi bi-arrow-right-short cyber-text-primary" style={{ fontSize: '1.2rem' }}></i>
                        <span style={{ fontSize: '0.9rem' }}>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div>
                  <h5 className="fw-bold mb-3">Instructor</h5>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="cyber-avatar" style={{ width: 56, height: 56, fontSize: '1.1rem', background: course.instructorAvatarColor }}>
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="fw-bold">{course.instructor}</div>
                      <div className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Instructor</div>
                    </div>
                  </div>
                  <p className="cyber-text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{course.instructorBio}</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h5 className="fw-bold mb-3">Reviews ({course.reviews.length})</h5>
                  <div className="d-flex flex-column gap-3">
                    {course.reviews.map((r) => (
                      <div key={r.id} className="cyber-surface p-3" style={{ borderRadius: '8px', border: '1px solid var(--cyber-border)' }}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <div className="cyber-avatar" style={{ width: 32, height: 32, fontSize: '0.7rem', background: 'var(--cyber-primary)' }}>
                              {r.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="fw-bold" style={{ fontSize: '0.88rem' }}>{r.author}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            {[1,2,3,4,5].map((s) => (
                              <i key={s} className={`bi bi-star${s <= r.rating ? '-fill' : ''} ${s <= r.rating ? 'cyber-text-primary' : 'cyber-text-muted'}`} style={{ fontSize: '0.8rem' }}></i>
                            ))}
                          </div>
                        </div>
                        <p className="cyber-text-muted mb-0" style={{ fontSize: '0.85rem' }}>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="cyber-card p-4 mb-4 cyber-fade-in">
            <h6 className="fw-bold mb-3">Course Details</h6>
            <div className="d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-bar-chart me-2"></i>Difficulty</span>
                <span className="fw-bold">{course.difficulty}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-clock me-2"></i>Duration</span>
                <span className="fw-bold">{course.duration} hours</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-collection me-2"></i>Lessons</span>
                <span className="fw-bold">{course.lessonsCount}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-people me-2"></i>Enrolled</span>
                <span className="fw-bold">{course.enrolled.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-star-fill me-2"></i>Rating</span>
                <span className="fw-bold">{course.rating}/5</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="cyber-text-muted"><i className="bi bi-trophy me-2"></i>XP Reward</span>
                <span className="cyber-text-primary fw-bold">{course.xpReward} XP</span>
              </div>
            </div>
            <button className="btn btn-primary w-100 mt-3" onClick={handleStart}>
              <i className={`bi ${started ? 'bi-play-fill' : 'bi-arrow-right'} me-2`}></i>
              {started ? 'Continue Learning' : 'Start Course'}
            </button>
          </div>

          <div className="cyber-card p-4 cyber-fade-in">
            <h6 className="fw-bold mb-3">Skills You Will Learn</h6>
            <div className="d-flex flex-wrap gap-2">
              {course.objectives.slice(0, 5).map((o, i) => (
                <span key={i} className="badge text-bg-secondary" style={{ fontSize: '0.78rem' }}>{o.split(' ').slice(0, 3).join(' ')}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
