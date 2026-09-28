import { Link } from 'react-router-dom';
import { CyberBrand } from '@/components/CyberBrand';

export function NotFoundPage() {
  return (
    <div className="cyber-grid-bg d-flex flex-column" style={{ minHeight: '100vh' }}>
      <nav className="py-3" style={{ borderBottom: '1px solid var(--cyber-border)' }}>
        <div className="container">
          <CyberBrand />
        </div>
      </nav>
      <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center">
        <div className="cyber-icon-box mb-4" style={{ width: 80, height: 80, fontSize: '2.5rem' }}>
          <i className="bi bi-exclamation-triangle"></i>
        </div>
        <h1 className="cyber-hero-title mb-2" style={{ fontSize: '5rem' }}>404</h1>
        <h2 className="fw-bold mb-2">Page Not Found</h2>
        <p className="cyber-text-muted mb-4" style={{ maxWidth: 400 }}>
          The page you are looking for does not exist or has been moved. Let's get you back to safety.
        </p>
        <div className="d-flex gap-3">
          <Link to="/" className="btn btn-outline-primary">
            <i className="bi bi-house me-2"></i>Home
          </Link>
          <Link to="/dashboard" className="btn btn-primary">
            <i className="bi bi-grid-1x2 me-2"></i>Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
