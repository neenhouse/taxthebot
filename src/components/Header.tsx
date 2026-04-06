import { useState } from 'react';

const navLinks = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Impact Map', href: '#impact' },
  { label: 'Policy', href: '#policy' },
  { label: 'Take Action', href: '#action' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <a href="#" style={styles.logo}>
          <span style={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="12" fill="#DC2626"/>
              <circle cx="22" cy="24" r="5" fill="#0a0a0a"/>
              <circle cx="42" cy="24" r="5" fill="#0a0a0a"/>
              <rect x="18" y="36" width="28" height="4" rx="2" fill="#0a0a0a"/>
              <rect x="8" y="8" width="6" height="12" rx="3" fill="#FACC15"/>
              <rect x="50" y="8" width="6" height="12" rx="3" fill="#FACC15"/>
            </svg>
          </span>
          <span style={styles.logoText}>TaxTheBot</span>
        </a>

        <nav style={styles.nav}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          style={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{
            ...styles.menuBar,
            transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
          }} />
          <span style={{
            ...styles.menuBar,
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            ...styles.menuBar,
            transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
          }} />
        </button>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10, 10, 10, 0.9)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--border)',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px',
    height: 'var(--header-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    color: 'var(--text-primary)',
  },
  logoIcon: {
    display: 'flex',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '20px',
    letterSpacing: '-0.5px',
  },
  nav: {
    display: 'flex',
    gap: '8px',
  },
  menuBtn: {
    display: 'none',
    flexDirection: 'column',
    gap: '4px',
    padding: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  menuBar: {
    display: 'block',
    width: '20px',
    height: '2px',
    background: 'var(--text-primary)',
    borderRadius: '1px',
    transition: 'all 0.2s',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 24px 16px',
    borderBottom: '1px solid var(--border)',
  },
  mobileLink: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    padding: '12px 0',
    fontSize: '16px',
    fontWeight: 500,
    borderBottom: '1px solid var(--border)',
  },
};
