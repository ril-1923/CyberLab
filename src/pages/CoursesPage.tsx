import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { CourseCard } from '@/components/CourseCard';
import { EmptyState } from '@/components/EmptyState';
import { courses } from '@/data/courses';
import { useAuth } from '@/contexts/AuthContext';
import { getCourseProgressPercent } from '@/data/courses';

const categories = ['All', 'Cybersecurity Fundamentals', 'Ethical Hacking', 'Network Security', 'Web Security', 'Cryptography', 'Cloud Security', 'Digital Forensics', 'Malware Analysis'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'progress', label: 'Progress' },
];

export function CoursesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [progressFilter, setProgressFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && c.category !== category) return false;
      if (difficulty !== 'All' && c.difficulty !== difficulty) return false;
      if (user) {
        const p = getCourseProgressPercent(c.id, user.completedLessons);
        if (progressFilter === 'In Progress' && (p === 0 || p === 100)) return false;
        if (progressFilter === 'Completed' && p !== 100) return false;
        if (progressFilter === 'Not Started' && p > 0) return false;
      }
      return true;
    });

    switch (sort) {
      case 'popular':
        result = [...result].sort((a, b) => b.enrolled - a.enrolled);
        break;
      case 'difficulty':
        const order = { Beginner: 0, Intermediate: 1, Advanced: 2, Expert: 3 };
        result = [...result].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
        break;
      case 'progress':
        if (user) {
          result = [...result].sort((a, b) => getCourseProgressPercent(b.id, user.completedLessons) - getCourseProgressPercent(a.id, user.completedLessons));
        }
        break;
      default:
        result = [...result].reverse();
    }
    return result;
  }, [search, category, difficulty, progressFilter, sort, user]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Course Catalog"
        subtitle="Browse and enroll in cybersecurity courses"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Courses' }]}
      />

      {/* Search & Filters */}
      <div className="cyber-card p-3 p-md-4 mb-4 cyber-fade-in">
        <div className="row g-3">
          <div className="col-lg-4">
            <div className="cyber-search-wrapper">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="cyber-search-input"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
            </select>
          </div>
          <div className="col-6 col-lg-2">
            <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {difficulties.map((d) => <option key={d} value={d}>{d === 'All' ? 'All Levels' : d}</option>)}
            </select>
          </div>
          <div className="col-6 col-lg-2">
            <select className="form-select" value={progressFilter} onChange={(e) => setProgressFilter(e.target.value)}>
              <option value="All">All Progress</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="col-6 col-lg-2">
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</span>
      </div>

      {filtered.length > 0 ? (
        <div className="row g-4 cyber-stagger">
          {filtered.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <CourseCard course={c} />
            </div>
          ))}
        </div>
      ) : (
        <div className="cyber-card p-3">
          <EmptyState
            icon="bi-search"
            title="No courses found"
            message="Try adjusting your filters or search terms."
          />
        </div>
      )}
    </DashboardLayout>
  );
}
