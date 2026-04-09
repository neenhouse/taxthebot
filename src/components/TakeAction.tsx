import { useState } from 'react';

const actionItems = [
  {
    id: 'track-bills',
    title: 'Track Legislation Near You',
    description: 'Follow AI-related bills in your state. Know when hearings happen. Show up.',
    cta: 'View Legislative Tracker',
    href: '#legislation',
    icon: 'GO',
    accent: 'var(--info)',
  },
  {
    id: 'share-story',
    title: 'Share Your Displacement Story',
    description: 'If AI automation affected your job, your experience can shape policy. Anonymous submissions welcome.',
    cta: 'Tell Your Story',
    href: 'mailto:stories@taxthebot.org?subject=My%20Displacement%20Story',
    icon: 'ME',
    accent: 'var(--accent)',
  },
  {
    id: 'cite-data',
    title: 'Use the Data',
    description: 'Journalists, researchers, union organizers — cite these numbers. Challenge them. Improve them.',
    cta: 'See Methodology',
    href: '#methodology',
    icon: 'USE',
    accent: 'var(--accent-warm)',
  },
  {
    id: 'contact-reps',
    title: 'Contact Your Representative',
    description: 'AI policy is being written right now. Your representative needs to hear from constituents, not just lobbyists.',
    cta: 'Find Your Rep',
    href: 'https://www.house.gov/representatives/find-your-representative',
    icon: 'ACT',
    accent: 'var(--success)',
  },
];

export function TakeAction() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="action" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>TAKE ACTION</span>
          <h2 style={styles.title}>What You Can Do Right Now</h2>
          <p style={styles.subtitle}>
            Data without action is a hobby. Pick one thing and do it today.
          </p>
        </div>

        <div style={styles.grid}>
          {actionItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="action-card"
              style={styles.card}
            >
              <div style={{ ...styles.iconBadge, background: item.accent }}>
                {item.icon}
              </div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.description}</p>
              <span style={{ ...styles.cardCta, color: item.accent }}>
                {item.cta} &rarr;
              </span>
            </a>
          ))}
        </div>

        <div style={styles.newsletter}>
          <div style={styles.nlContent}>
            <h3 style={styles.nlTitle}>Stay in the Loop</h3>
            <p style={styles.nlDesc}>
              Quarterly reports on AI profits, displacement data, and legislative updates.
              No spam. Unsubscribe anytime.
            </p>
          </div>
          <div style={styles.nlFormWrapper}>
            {subscribed ? (
              <div style={styles.nlSuccess}>
                Thanks — we will be in touch when we launch. (Newsletter coming soon)
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={styles.nlForm}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="nl-input"
                  required
                />
                <button type="submit" className="btn-primary">
                  Subscribe
                </button>
              </form>
            )}
            <p style={styles.nlHonest}>
              Newsletter is not yet active. Your email will be saved for launch notification only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '80px 0',
    background: 'var(--bg)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  tag: {
    display: 'inline-block',
    padding: '4px 12px',
    background: 'rgba(220, 38, 38, 0.1)',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent)',
    letterSpacing: '1.5px',
    marginBottom: '16px',
  },
  title: {
    fontSize: 'clamp(28px, 4vw, 40px)',
    marginBottom: '12px',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
    marginBottom: '48px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '24px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
    cursor: 'pointer',
  },
  iconBadge: {
    width: '40px',
    height: '28px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 700,
    fontSize: '11px',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.5px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  cardDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    flex: 1,
  },
  cardCta: {
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
  },
  newsletter: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    alignItems: 'center',
    padding: '32px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
  },
  nlContent: {},
  nlTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  nlDesc: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  nlFormWrapper: {},
  nlForm: {
    display: 'flex',
    gap: '8px',
  },
  nlSuccess: {
    color: 'var(--success)',
    fontSize: '14px',
    fontWeight: 500,
  },
  nlHonest: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginTop: '8px',
    fontStyle: 'italic',
  },
};
