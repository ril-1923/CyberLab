import { Link } from 'react-router-dom';
import { Terminal } from '@/components/Terminal';
import { Reveal } from '@/components/Reveal';
import { CyberBrand } from '@/components/CyberBrand';
import { useAuth } from '@/contexts/AuthContext';
import { courses } from '@/data/courses';
import { challenges } from '@/data/challenges';
import { CourseCard } from '@/components/CourseCard';
import { ChallengeCard } from '@/components/ChallengeCard';

const features = [
  { icon: 'bi-intersect', title: 'Interactive Learning', desc: 'Engage with hands-on lessons, quizzes, and real-world scenarios that make security concepts stick.' },
  { icon: 'bi-hdd-network', title: 'Hands-on Labs', desc: 'Practice in simulated environments that mirror real infrastructure without the risk.' },
  { icon: 'bi-flag', title: 'Real-world Challenges', desc: 'Solve cybersecurity challenges inspired by actual vulnerabilities and attack scenarios.' },
  { icon: 'bi-graph-up', title: 'Progress Tracking', desc: 'Earn XP, level up, unlock achievements, and watch your skills grow with detailed analytics.' },
];

const learningPaths = [
  { icon: 'bi-shield-check', title: 'Cybersecurity Fundamentals', desc: 'Start from zero and build a rock-solid foundation in security principles.', courses: 3, color: 'primary' },
  { icon: 'bi-bug', title: 'Ethical Hacking', desc: 'Learn the tools and mindset of professional penetration testers.', courses: 2, color: 'cyan' },
  { icon: 'bi-hdd-network', title: 'Network Security', desc: 'Master firewalls, IDS/IPS, VPNs, and zero-trust architecture.', courses: 2, color: 'primary' },
  { icon: 'bi-globe', title: 'Web Security', desc: 'Defend web applications against OWASP Top 10 and modern attacks.', courses: 2, color: 'cyan' },
  { icon: 'bi-cloud', title: 'Cloud Security', desc: 'Secure infrastructure across AWS, Azure, and GCP environments.', courses: 1, color: 'primary' },
  { icon: 'bi-search', title: 'Digital Forensics', desc: 'Investigate incidents, collect evidence, and analyze digital artifacts.', courses: 2, color: 'cyan' },
];

const steps = [
  { icon: 'bi-book', title: 'Learn', desc: 'Start with structured courses that teach core concepts through interactive lessons.' },
  { icon: 'bi-hdd-network', title: 'Practice', desc: 'Apply knowledge in safe, simulated lab environments that mirror real systems.' },
  { icon: 'bi-flag', title: 'Solve', desc: 'Test your skills with challenges that simulate real-world security scenarios.' },
  { icon: 'bi-trophy', title: 'Level Up', desc: 'Earn XP, unlock achievements, and climb the leaderboard as you grow.' },
];

const testimonials = [
  { name: 'Alex Mercer', role: 'Security Analyst', avatar: '#00ff9d', text: 'CyberLab transformed my career. The hands-on challenges made theory click in a way no textbook ever did. I landed my first SOC role within 3 months.' },
  { name: 'Jordan Kim', role: 'Penetration Tester', avatar: '#00d4ff', text: 'The ethical hacking path is incredibly well-structured. The simulated environments feel real without the risk. Best learning platform I have used.' },
  { name: 'Sam Rodriguez', role: 'Network Engineer', avatar: '#ffb800', text: 'I came in knowing nothing about security. Now I am hardening networks at my company and mentoring others. CyberLab made it possible.' },
];

const stats = [
  { value: '10K+', label: 'Learners' },
  { value: '50+', label: 'Courses' },
  { value: '150+', label: 'Challenges' },
  { value: '25+', label: 'Security Labs' },
];

export function LandingPage() {
  const { isAuthenticated } = useAuth();
  const featuredChallenges = challenges.slice(0, 3);
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="cyber-grid-bg">
      {/* Navbar */}
      <nav className="sticky-top" style={{ background: 'rgba(10,14,13,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--cyber-border)', zIndex: 1030 }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <CyberBrand />
            <div className="d-flex align-items-center gap-2">
              <Link to="/about" className="btn btn-ghost cyber-text-muted d-none d-md-inline-flex" style={{ fontSize: '0.9rem' }}>About</Link>
              <Link to="/leaderboard" className="btn btn-ghost cyber-text-muted d-none d-md-inline-flex" style={{ fontSize: '0.9rem' }}>Leaderboard</Link>
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-sm">
                  <i className="bi bi-grid-1x2 me-1"></i>Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
                  <Link to="/register" className="btn btn-primary btn-sm">
                    <i className="bi bi-person-plus me-1"></i>Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="cyber-hero">
        <div className="container cyber-hero-content">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="cyber-status-indicator mb-3">
                <span className="cyber-status-dot"></span>
                <span className="cyber-text-muted">SECURE LEARNING ENVIRONMENT</span>
              </div>
              <h1 className="cyber-hero-title mb-3">ENTER THE<br />CYBERLAB</h1>
              <p className="cyber-hero-subtitle mb-4">
                Learn. Hack. Defend. Master cybersecurity through interactive courses, challenges, and hands-on labs.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/register" className="btn btn-primary btn-lg">
                  <i className="bi bi-play-fill me-2"></i>Start Learning
                </Link>
                <Link to="/challenges" className="btn btn-outline-secondary btn-lg">
                  <i className="bi bi-flag me-2"></i>Explore Challenges
                </Link>
              </div>
              <div className="row g-3">
                {stats.map((s) => (
                  <div key={s.label} className="col-6 col-md-3">
                    <div className="cyber-stat-number">{s.value}</div>
                    <div className="cyber-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <Terminal
                  lines={[
                    '$ cyberlab scan --target localhost',
                    '[*] Initializing security scan...',
                    '[+] Firewall: ACTIVE',
                    '[+] IDS/IPS: MONITORING',
                    '[+] Encryption: AES-256-GCM',
                    '[+] Auth: MFA ENABLED',
                    '[+] Patch level: CURRENT',
                    '[*] Network nodes: 12 online',
                    '[+] Security status: SECURE',
                    '[*] Simulated environment ready.',
                  ]}
                  speed={90}
                />
                <div className="mt-3 cyber-glass p-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="cyber-text-muted cyber-font-mono" style={{ fontSize: '0.78rem' }}>NETWORK NODES</span>
                    <span className="cyber-status-indicator">
                      <span className="cyber-status-dot"></span>
                      <span className="cyber-text-primary" style={{ fontSize: '0.78rem' }}>12 ONLINE</span>
                    </span>
                  </div>
                  <svg viewBox="0 0 300 80" className="w-100">
                    <line x1="30" y1="40" x2="100" y2="20" className="cyber-network-line" />
                    <line x1="30" y1="40" x2="100" y2="60" className="cyber-network-line" />
                    <line x1="100" y1="20" x2="180" y2="40" className="cyber-network-line" />
                    <line x1="100" y1="60" x2="180" y2="40" className="cyber-network-line" />
                    <line x1="180" y1="40" x2="260" y2="20" className="cyber-network-line" />
                    <line x1="180" y1="40" x2="260" y2="60" className="cyber-network-line" />
                    <circle cx="30" cy="40" r="5" className="cyber-network-node" />
                    <circle cx="100" cy="20" r="4" className="cyber-network-node" />
                    <circle cx="100" cy="60" r="4" className="cyber-network-node" />
                    <circle cx="180" cy="40" r="5" className="cyber-network-node" />
                    <circle cx="260" cy="20" r="4" className="cyber-network-node" />
                    <circle cx="260" cy="60" r="4" className="cyber-network-node" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CyberLab */}
      <section className="py-5">
        <div className="container">
          <Reveal>
            <div className="text-center mb-5">
              <h2 className="cyber-section-title">Why CyberLab?</h2>
              <p className="cyber-section-subtitle">A complete platform designed for the next generation of cyber defenders</p>
            </div>
          </Reveal>
          <div className="row g-4 cyber-stagger">
            {features.map((f) => (
              <div key={f.title} className="col-md-6 col-lg-3">
                <div className="cyber-feature-card h-100">
                  <div className="cyber-icon-box mb-3"><i className={`bi ${f.icon}`}></i></div>
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p className="cyber-text-muted mb-0" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-5" style={{ background: 'var(--cyber-bg-alt)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-5">
              <h2 className="cyber-section-title">Learning Paths</h2>
              <p className="cyber-section-subtitle">Choose your path and start building expertise</p>
            </div>
          </Reveal>
          <div className="row g-4 cyber-stagger">
            {learningPaths.map((p) => (
              <div key={p.title} className="col-md-6 col-lg-4">
                <Link to="/courses" className="cyber-link-card">
                  <div className="cyber-path-card h-100">
                    <div className={`cyber-icon-box ${p.color === 'cyan' ? 'cyan' : ''} mb-3`}>
                      <i className={`bi ${p.icon}`}></i>
                    </div>
                    <h5 className="fw-bold mb-2">{p.title}</h5>
                    <p className="cyber-text-muted mb-3" style={{ fontSize: '0.88rem' }}>{p.desc}</p>
                    <span className="cyber-text-primary fw-bold" style={{ fontSize: '0.85rem' }}>
                      {p.courses} courses <i className="bi bi-arrow-right ms-1"></i>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-5">
        <div className="container">
          <Reveal>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="cyber-section-title">Featured Courses</h2>
                <p className="cyber-section-subtitle">Start with our most popular courses</p>
              </div>
              <Link to="/courses" className="btn btn-outline-primary btn-sm d-none d-md-inline-flex">
                View All <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </Reveal>
          <div className="row g-4 cyber-stagger">
            {featuredCourses.map((c) => (
              <div key={c.id} className="col-md-6 col-lg-4">
                <CourseCard course={c} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4 d-md-none">
            <Link to="/courses" className="btn btn-outline-primary">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* Featured Challenges */}
      <section className="py-5" style={{ background: 'var(--cyber-bg-alt)' }}>
        <div className="container">
          <Reveal>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="cyber-section-title">Featured Challenges</h2>
                <p className="cyber-section-subtitle">Put your skills to the test</p>
              </div>
              <Link to="/challenges" className="btn btn-outline-primary btn-sm d-none d-md-inline-flex">
                View All <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </Reveal>
          <div className="row g-4 cyber-stagger">
            {featuredChallenges.map((c) => (
              <div key={c.id} className="col-md-6 col-lg-4">
                <ChallengeCard challenge={c} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <Reveal>
            <div className="text-center mb-5">
              <h2 className="cyber-section-title">How It Works</h2>
              <p className="cyber-section-subtitle">Four steps to cybersecurity mastery</p>
            </div>
          </Reveal>
          <div className="row g-4 cyber-stagger">
            {steps.map((s, i) => (
              <div key={s.title} className="col-md-6 col-lg-3">
                <div className="cyber-feature-card h-100 text-center">
                  <div className="cyber-step-number">{i + 1}</div>
                  <i className={`bi ${s.icon}`} style={{ fontSize: '2rem', color: 'var(--cyber-primary)' }}></i>
                  <h5 className="fw-bold mt-3 mb-2">{s.title}</h5>
                  <p className="cyber-text-muted mb-0" style={{ fontSize: '0.88rem' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5" style={{ background: 'var(--cyber-bg-alt)' }}>
        <div className="container">
          <Reveal>
            <div className="text-center mb-5">
              <h2 className="cyber-section-title">What Learners Say</h2>
              <p className="cyber-section-subtitle">Real stories from the CyberLab community</p>
            </div>
          </Reveal>
          <div className="row g-4 cyber-stagger">
            {testimonials.map((t) => (
              <div key={t.name} className="col-md-4">
                <div className="cyber-testimonial-card h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="cyber-avatar" style={{ width: 44, height: 44, fontSize: '0.9rem', background: t.avatar }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.92rem' }}>{t.name}</div>
                      <div className="cyber-text-muted" style={{ fontSize: '0.8rem' }}>{t.role}</div>
                    </div>
                  </div>
                  <p className="cyber-text-muted mb-0" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>"{t.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container">
          <Reveal>
            <div className="cyber-cta">
              <h2 className="cyber-section-title mb-2">Ready to enter the lab?</h2>
              <p className="cyber-section-subtitle mb-4">Join thousands of learners advancing their cybersecurity skills</p>
              <Link to="/register" className="btn btn-primary btn-lg">
                <i className="bi bi-rocket-takeoff me-2"></i>Start Your Cyber Journey
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="cyber-footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <CyberBrand />
              <p className="cyber-text-muted mt-3" style={{ fontSize: '0.85rem' }}>
                The interactive cybersecurity learning platform. Learn, practice, and master security skills in a safe simulated environment.
              </p>
            </div>
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Learn</h6>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li><Link to="/courses" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Courses</Link></li>
                <li><Link to="/challenges" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Challenges</Link></li>
                <li><Link to="/labs" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Labs</Link></li>
                <li><Link to="/leaderboard" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Leaderboard</Link></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled d-flex flex-column gap-2">
                <li><Link to="/about" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>About</Link></li>
                <li><Link to="/register" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Sign Up</Link></li>
                <li><Link to="/login" className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Login</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold mb-3">Stay Updated</h6>
              <p className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>Get the latest challenges and courses delivered to your inbox.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="your@email.com" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
          <hr className="my-4" style={{ borderColor: 'var(--cyber-border)' }} />
          <div className="d-flex justify-content-between align-items-center">
            <span className="cyber-text-muted" style={{ fontSize: '0.82rem' }}>© 2025 CyberLab. For educational purposes only.</span>
            <span className="cyber-text-muted" style={{ fontSize: '0.82rem' }}>Built for cyber defenders.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
