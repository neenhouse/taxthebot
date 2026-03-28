export function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.top}>
          <div style={styles.brand}>
            <div style={styles.logo}>
              <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" rx="12" fill="#DC2626"/>
                <circle cx="22" cy="24" r="5" fill="#0a0a0a"/>
                <circle cx="42" cy="24" r="5" fill="#0a0a0a"/>
                <rect x="18" y="36" width="28" height="4" rx="2" fill="#0a0a0a"/>
                <rect x="8" y="8" width="6" height="12" rx="3" fill="#FACC15"/>
                <rect x="50" y="8" width="6" height="12" rx="3" fill="#FACC15"/>
              </svg>
              <span style={styles.logoText}>TaxTheBot</span>
            </div>
            <p style={styles.brandDesc}>
              Making the invisible visible. Tracking AI profits,
              advocating for robot taxes, funding the future.
            </p>
          </div>

          <div style={styles.links}>
            <div style={styles.linkCol}>
              <h4 style={styles.linkTitle}>Data</h4>
              <a href="#dashboard" style={styles.link}>AI Profit Tracker</a>
              <a href="#calculator" style={styles.link}>Tax Calculator</a>
              <a href="#impact" style={styles.link}>Impact Map</a>
            </div>
            <div style={styles.linkCol}>
              <h4 style={styles.linkTitle}>Policy</h4>
              <a href="#policy" style={styles.link}>Tax Models</a>
              <a href="#action" style={styles.link}>Take Action</a>
              <a href="#action" style={styles.link}>Find Representatives</a>
            </div>
            <div style={styles.linkCol}>
              <h4 style={styles.linkTitle}>About</h4>
              <a href="#" style={styles.link}>Methodology</a>
              <a href="#" style={styles.link}>Sources</a>
              <a href="#" style={styles.link}>Contact</a>
            </div>
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            &copy; 2026 TaxTheBot. All data is illustrative and for demonstration purposes.
          </p>
          <p style={styles.disclaimer}>
            This is a demo project by{' '}
            <a href="https://neenhouse.com" style={styles.disclaimerLink}>
              neenhouse.com
            </a>
            . Not affiliated with any political organization.
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    padding: '64px 0 32px',
    background: 'var(--bg-elevated)',
    borderTop: '1px solid var(--border)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 2fr',
    gap: '48px',
    marginBottom: '32px',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '18px',
    color: 'var(--text-primary)',
  },
  brandDesc: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    maxWidth: '300px',
  },
  links: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  linkTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
  },
  link: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  divider: {
    height: '1px',
    background: 'var(--border)',
    margin: '0 0 24px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  copyright: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  disclaimer: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  disclaimerLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
  },
};
