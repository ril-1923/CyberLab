import { Link } from 'react-router-dom';

export function CyberBrand({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const fontSize = size === 'lg' ? '1.5rem' : size === 'sm' ? '1.1rem' : '1.25rem';
  const iconSize = size === 'lg' ? '42px' : size === 'sm' ? '30px' : '36px';

  return (
    <Link to="/" className="cyber-brand" style={{ fontSize }}>
      <span className="cyber-brand-icon" style={{ width: iconSize, height: iconSize, fontSize: size === 'lg' ? '1.4rem' : '1.2rem' }}>
        <i className="bi bi-shield-shaded"></i>
      </span>
      <span className="cyber-brand-text">CyberLab</span>
    </Link>
  );
}
