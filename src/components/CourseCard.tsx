import { Link } from 'react-router-dom';
import type { Course } from '@/types';
import { getCourseProgressPercent } from '@/data/courses';
import { getDifficultyColor } from '@/utils/helpers';
import { useAuth } from '@/contexts/AuthContext';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { user } = useAuth();
  const progress = user ? getCourseProgressPercent(course.id, user.completedLessons) : 0;
  const started = progress > 0;
  const diffColor = getDifficultyColor(course.difficulty);

  return (
    <Link to={`/courses/${course.id}`} className="cyber-link-card">
      <div className="cyber-card h-100 p-3">
        <div className="d-flex align-items-start gap-3 mb-3">
          <div className="cyber-icon-box">
            <i className={`bi ${course.icon}`}></i>
          </div>
          <div className="flex-grow-1">
            <span className={`badge text-bg-${diffColor} mb-1`}>{course.difficulty}</span>
            <div className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>
              <i className="bi bi-clock me-1"></i>{course.duration}h
              <span className="mx-2">|</span>
              <i className="bi bi-collection me-1"></i>{course.lessonsCount} lessons
            </div>
          </div>
        </div>
        <h5 className="fw-bold mb-2">{course.title}</h5>
        <p className="cyber-text-muted mb-3" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>{course.description}</p>
        <div className="d-flex align-items-center gap-2 mb-3" style={{ fontSize: '0.82rem' }}>
          <span className="cyber-avatar" style={{ width: 24, height: 24, fontSize: '0.65rem', background: course.instructorAvatarColor }}>
            {course.instructor.split(' ').map(n => n[0]).join('')}
          </span>
          <span className="cyber-text-muted">{course.instructor}</span>
        </div>
        {started && (
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="cyber-text-muted" style={{ fontSize: '0.78rem' }}>Progress</span>
              <span className="cyber-text-primary" style={{ fontSize: '0.78rem', fontWeight: 600 }}>{progress}%</span>
            </div>
            <div className="progress" style={{ height: '5px' }}>
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <span className="cyber-text-primary fw-bold" style={{ fontSize: '0.85rem' }}>
            <i className="bi bi-star-fill me-1"></i>{course.xpReward} XP
          </span>
          <span className="btn btn-sm btn-outline-primary">
            {started ? 'Continue' : 'Start'} <i className="bi bi-arrow-right ms-1"></i>
          </span>
        </div>
      </div>
    </Link>
  );
}
