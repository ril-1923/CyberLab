import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { PageHeader } from '@/components/PageHeader';
import { ChallengeCard } from '@/components/ChallengeCard';
import { EmptyState } from '@/components/EmptyState';
import { challenges } from '@/data/challenges';
import { useAuth } from '@/contexts/AuthContext';

const categories = ['All', 'Web Security', 'Cryptography', 'Networking', 'Forensics', 'OSINT', 'Authentication', 'Linux', 'Security Fundamentals'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'xp', label: 'Highest XP' },
  { value: 'solves', label: 'Most Solved' },
  { value: 'difficulty', label: 'Difficulty' },
];

export function ChallengesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let result = challenges.filter((c) => {
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'All' && c.category !== category) return false;
      if (difficulty !== 'All' && c.difficulty !== difficulty) return false;
      if (user) {
        const done = user.completedChallenges.includes(c.id);
        if (status === 'Solved' && !done) return false;
        if (status === 'Unsolved' && done) return false;
      }
      return true;
    });

    switch (sort) {
      case 'xp':
        result = [...result].sort((a, b) => b.xp - a.xp);
        break;
      case 'solves':
        result = [...result].sort((a, b) => b.solves - a.solves);
        break;
      case 'difficulty':
        const order = { Easy: 0, Medium: 1, Hard: 2, Expert: 3 };
        result = [...result].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
        break;
      default:
        result = [...result].reverse();
    }
    return result;
  }, [search, category, difficulty, status, sort, user]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Cybersecurity Challenges"
        subtitle="Test your skills with realistic security challenges"
        breadcrumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Challenges' }]}
      />

      <div className="cyber-card p-3 p-md-4 mb-4 cyber-fade-in">
        <div className="row g-3">
          <div className="col-lg-3">
            <div className="cyber-search-wrapper">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="cyber-search-input"
                placeholder="Search challenges..."
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
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Unsolved">Unsolved</option>
              <option value="Solved">Solved</option>
            </select>
          </div>
          <div className="col-6 col-lg-3">
            <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>{filtered.length} challenge{filtered.length !== 1 ? 's' : ''} found</span>
      </div>

      {filtered.length > 0 ? (
        <div className="row g-4 cyber-stagger">
          {filtered.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4 col-xl-3">
              <ChallengeCard challenge={c} />
            </div>
          ))}
        </div>
      ) : (
        <div className="cyber-card p-3">
          <EmptyState icon="bi-search" title="No challenges found" message="Try adjusting your filters or search terms." />
        </div>
      )}
    </DashboardLayout>
  );
}
