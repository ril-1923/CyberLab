import { Link } from 'react-router-dom';
import { CyberBrand } from '@/components/CyberBrand';
import { Terminal } from '@/components/Terminal';
import { Reveal } from '@/components/Reveal';

const stats = [
  { value: '10K+', label: 'Learners' },
  { value: '50+', label: 'Courses' },
  { value: '150+', label: 'Challenges' },
  { value: '25+', label: 'Security Labs' },
];

const values = [
  { icon: 'bi-shield-check', title: 'Education First', desc: 'We believe the best defense is knowledge. Every course is designed to build real understanding.' },
  { icon: 'bi-hdd-network', title: 'Safe Simulation', desc: 'All labs and challenges run in completely isolated, simulated environments. No real systems are ever targeted.' },
  { icon: 'bi-people', title: 'Community Driven', desc: 'Learn alongside thousands of cyber defenders. Share progress, compete on leaderboards, and grow together.' },
  { icon: 'bi-arrow-up', title: 'Continuous Growth', desc: 'Cybersecurity never stands still. Neither do we. New content is added regularly to keep you ahead.' },
];

export function AboutPage() {
  return (
    <div className="cyber-grid-bg">
      <nav className="sticky-top" style={{ background: 'rgba(10,14,13,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--cyber-border)', zIndex: 1030 }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <CyberBrand />
            <Link to="/register" className="btn btn-primary btn-sm">
              <i className="bi bi-person-plus me-1"></i>Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <Reveal>
                <div className="cyber-status-indicator mb-3">
                  <span className="cyber-status-dot"></span>
                  <span className="cyber-text-muted">ABOUT CYBERLAB</span>
                </div>
                <h1 className="cyber-hero-title mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                  Building the next<br />generation of<br /><span className="cyber-glow-text">cyber defenders</span>
                </h1>
                <p className="cyber-hero-subtitle mb-4">
                  CyberLab is an interactive cybersecurity learning platform that makes mastering security skills accessible, engaging, and safe. Through courses, challenges, and hands-on labs, we turn curiosity into expertise.
                </p>
                <Link to="/register" className="btn btn-primary btn-lg">
                  <i className="bi bi-rocket-takeoff me-2"></i>Join CyberLab
                </Link>
              </Reveal>
            </div>
            <div className="col-lg-6">
              <Terminal
                lines={[
                  '$ cyberlab --mission',
                  '[*] Mission: Democratize cybersecurity education',
                  '[*] Vision: Safe, hands-on learning for everyone',
                  '[+] Courses: 12+ across 8 categories',
                  '[+] Challenges: 20+ realistic scenarios',
                  '[+] Labs: 6 simulated environments',
                  '[+] Achievements: 12 unlockable badges',
                  '[+] Community: 10,000+ learners',
                  '[*] Status: BUILDING THE FUTURE',
                ]}
                speed={80}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-4" style={{ background: 'var(--cyber-bg-alt)' }}>
        <div className="container">
          <div className="row g-4">
            {stats.map((s) => (
              <div key={s.label} className="col-6 col-md-3 text-center">
                <div className="cyber-stat-number">{s.value}</div>
                <div className="cyber-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5">
        <div className="container">
          <Reveal>
            <div className="text-center mb-5">
              <h2 className="cyber-section-title">Our Values</h2>
              <p className="cyber-section-subtitle">What drives us to build CyberLab</p>
            </div>
          </Reveal>
          <div className="row g-4 cyber-stagger">
            {values.map((v) => (
              <div key={v.title} className="col-md-6 col-lg-3">
                <div className="cyber-feature-card h-100">
                  <div className="cyber-icon-box mb-3"><i className={`bi ${v.icon}`}></i></div>
                  <h5 className="fw-bold mb-2">{v.title}</h5>
                  <p className="cyber-text-muted mb-0" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety notice */}
      <section className="py-5" style={{ background: 'var(--cyber-bg-alt)' }}>
        <div className="container">
          <Reveal>
            <div className="cyber-cta">
              <div className="cyber-icon-box mx-auto mb-3" style={{ width: 64, height: 64, fontSize: '1.8rem' }}>
                <i className="bi bi-shield-check"></i>
              </div>
              <h2 className="cyber-section-title mb-2">Safety First, Always</h2>
              <p className="cyber-section-subtitle mb-4" style={{ maxWidth: 600, margin: '0 auto' }}>
                CyberLab is an educational platform. All challenges, labs, and scenarios are completely simulated and safe. We do not provide tools or instructions for attacking real systems, stealing credentials, or performing unauthorized exploitation.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg">
                <i className="bi bi-shield-plus me-2"></i>Start Learning Safely
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="cyber-footer">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <CyberBrand />
            <span className="cyber-text-muted" style={{ fontSize: '0.82rem' }}>© 2025 CyberLab. For educational purposes only.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
