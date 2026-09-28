import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { CyberBrand } from '@/components/CyberBrand';
import { Terminal } from '@/components/Terminal';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        showToast('Welcome back, Cyber Defender!', 'success');
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    }, 400);
  }

  function handleDemo() {
    loginDemo();
    showToast('Logged in as Demo Defender', 'info', 'bi-person-badge');
    navigate('/dashboard');
  }

  return (
    <div className="cyber-grid-bg" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="col-lg-10">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6 d-none d-lg-block p-5">
                <div className="mb-4">
                  <CyberBrand size="lg" />
                </div>
                <h2 className="fw-bold mb-3" style={{ fontSize: '1.75rem' }}>
                  Access your <span className="cyber-text-primary">cyber training</span> environment
                </h2>
                <p className="cyber-text-muted mb-4">
                  Continue your journey through interactive courses, challenges, and labs. Your progress, XP, and achievements are waiting.
                </p>
                <Terminal
                  lines={[
                    '$ cyberlab auth --status',
                    '[*] Checking authentication...',
                    '[+] Session: active',
                    '[+] User: cyber_defender',
                    '[+] Level: 6 | XP: 3,200',
                    '[+] Streak: 5 days',
                    '[+] Achievements: 4 unlocked',
                    '[*] Ready to continue learning.',
                  ]}
                  speed={100}
                />
              </div>

              <div className="col-lg-6 p-4 p-lg-5">
                <div className="cyber-glass p-4 p-md-5">
                  <div className="d-lg-none mb-4">
                    <CyberBrand />
                  </div>
                  <h3 className="fw-bold mb-1">Sign In</h3>
                  <p className="cyber-text-muted mb-4">Enter your credentials to access the lab</p>

                  {error && (
                    <div className="alert alert-danger py-2" style={{ fontSize: '0.85rem' }}>
                      <i className="bi bi-exclamation-triangle me-2"></i>{error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: '0.85rem' }}>Email</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="you@cyberlab.io"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ fontSize: '0.85rem' }}>Password</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-lock"></i></span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="remember"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="remember" style={{ fontSize: '0.85rem' }}>Remember me</label>
                      </div>
                      <Link to="/login" className="cyber-text-secondary" style={{ fontSize: '0.85rem' }} onClick={(e) => e.preventDefault()}>
                        Forgot password?
                      </Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                      {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Authenticating...</>
                      ) : (
                        <><i className="bi bi-box-arrow-in-right me-2"></i>Login</>
                      )}
                    </button>

                    <button type="button" className="btn btn-outline-secondary w-100 mb-3" onClick={handleDemo}>
                      <i className="bi bi-person-badge me-2"></i>Continue with Demo Account
                    </button>
                  </form>

                  <div className="text-center">
                    <span className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>
                      Don't have an account? <Link to="/register" className="cyber-text-primary fw-bold">Create one</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
