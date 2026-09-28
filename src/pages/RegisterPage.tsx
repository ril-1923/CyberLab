import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/Toast';
import { CyberBrand } from '@/components/CyberBrand';

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Weak', color: 'var(--cyber-danger)' };
  if (score <= 4) return { score, label: 'Medium', color: 'var(--cyber-warning)' };
  return { score, label: 'Strong', color: 'var(--cyber-primary)' };
}

export function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const passwordsMatch = confirm === '' || password === confirm;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = register({ fullName, username, email, password });
      setLoading(false);
      if (result.success) {
        showToast('Account created! Welcome to CyberLab.', 'success');
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    }, 400);
  }

  return (
    <div className="cyber-grid-bg" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-lg-6 col-md-8">
            <div className="cyber-glass p-4 p-md-5">
              <div className="mb-4">
                <CyberBrand />
              </div>
              <h3 className="fw-bold mb-1">Create Account</h3>
              <p className="cyber-text-muted mb-4">Join CyberLab and start your cybersecurity journey</p>

              {error && (
                <div className="alert alert-danger py-2" style={{ fontSize: '0.85rem' }}>
                  <i className="bi bi-exclamation-triangle me-2"></i>{error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Username</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-badge"></i></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="cyber_defender"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

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
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="d-flex justify-content-between" style={{ fontSize: '0.78rem' }}>
                        <span className="cyber-text-muted">Password strength</span>
                        <span style={{ color: strength.color, fontWeight: 600 }}>{strength.label}</span>
                      </div>
                      <div className="cyber-password-strength" style={{
                        background: strength.color,
                        width: `${(strength.score / 6) * 100}%`,
                      }}></div>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label" style={{ fontSize: '0.85rem' }}>Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                    <input
                      type="password"
                      className={`form-control ${!passwordsMatch ? 'is-invalid' : ''}`}
                      placeholder="Re-enter password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                    {!passwordsMatch && <div className="invalid-feedback">Passwords do not match.</div>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Creating account...</>
                  ) : (
                    <><i className="bi bi-person-plus me-2"></i>Create Account</>
                  )}
                </button>
              </form>

              <div className="text-center">
                <span className="cyber-text-muted" style={{ fontSize: '0.85rem' }}>
                  Already have an account? <Link to="/login" className="cyber-text-primary fw-bold">Sign in</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
