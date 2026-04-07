import { useState } from 'react';

const representatives = [
  { name: 'Sen. Maria Cantwell', state: 'WA', party: 'D', committee: 'Commerce, Science, and Transportation' },
  { name: 'Sen. Ted Cruz', state: 'TX', party: 'R', committee: 'Commerce, Science, and Transportation' },
  { name: 'Rep. Anna Eshoo', state: 'CA', party: 'D', committee: 'Energy and Commerce' },
  { name: 'Sen. Chuck Schumer', state: 'NY', party: 'D', committee: 'Majority Leader' },
  { name: 'Rep. Jay Obernolte', state: 'CA', party: 'R', committee: 'AI Caucus Co-Chair' },
];

const letterTemplate = `Dear [Representative Name],

I am writing to urge your support for legislation that would establish a fair tax on AI-generated profits — a "robot tax" — to fund programs for workers displaced by automation.

In 2025 alone, the top AI companies generated over $207 billion in AI-related profits while an estimated 1.7 million jobs were displaced. Currently, these profits are taxed at the same rate as any other corporate income, with no special provisions to address the unique economic disruption caused by artificial intelligence.

I believe we need:

1. A dedicated tax on AI-generated profits (even 5% would generate $10+ billion annually)
2. Funded retraining programs for displaced workers
3. Community investment funds for areas most affected by AI displacement
4. Transparent reporting requirements for AI's impact on employment

The AI revolution should benefit all Americans, not just shareholders. I urge you to support robot tax legislation.

Sincerely,
[Your Name]
[Your Address]`;

export function TakeAction() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(letterTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <h2 style={styles.title}>Make Your Voice Heard</h2>
          <p style={styles.subtitle}>
            Data means nothing without action. Contact your representatives,
            share the data, and demand accountability.
          </p>
        </div>

        <div style={styles.layout}>
          <div style={styles.leftCol}>
            <h3 style={styles.sectionTitle}>Key Representatives</h3>
            <p style={styles.sectionDesc}>
              These legislators sit on committees that directly influence AI policy.
            </p>

            <div style={styles.repList}>
              {representatives.map(rep => (
                <div key={rep.name} className="rep-card">
                  <div style={styles.repInfo}>
                    <div style={styles.repName}>{rep.name}</div>
                    <div style={styles.repMeta}>
                      <span style={{
                        ...styles.partyBadge,
                        background: rep.party === 'D' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: rep.party === 'D' ? '#3B82F6' : '#EF4444',
                      }}>
                        {rep.party}
                      </span>
                      <span style={styles.repState}>{rep.state}</span>
                      <span style={styles.repCommittee}>{rep.committee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.newsletter}>
              <h4 style={styles.nlTitle}>Stay Updated</h4>
              <p style={styles.nlDesc}>Get weekly reports on AI profits and displacement data.</p>
              {subscribed ? (
                <div style={styles.nlSuccess}>Thanks for subscribing! (Demo only)</div>
              ) : (
                <form onSubmit={handleSubscribe} style={styles.nlForm}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="nl-input"
                    required
                  />
                  <button type="submit" className="btn-primary">Subscribe</button>
                </form>
              )}
            </div>
          </div>

          <div style={styles.rightCol}>
            <h3 style={styles.sectionTitle}>Draft Letter to Your Representative</h3>
            <p style={styles.sectionDesc}>
              Copy this template and customize it with your details.
            </p>

            <div style={styles.letterCard}>
              <pre style={styles.letterText}>{letterTemplate}</pre>
              <button onClick={handleCopy} className="btn-warm">
                {copied ? 'Copied!' : 'Copy Letter'}
              </button>
            </div>

            <div style={styles.shareSection}>
              <h4 style={styles.shareTitle}>Share the Data</h4>
              <div style={styles.shareButtons}>
                <button className="share-btn" style={{ background: '#1DA1F2' }}>
                  Share on X
                </button>
                <button className="share-btn" style={{ background: '#0A66C2' }}>
                  Share on LinkedIn
                </button>
                <button className="share-btn" style={{ background: '#4267B2' }}>
                  Share on Facebook
                </button>
              </div>
            </div>
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
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    color: 'var(--text-primary)',
    fontWeight: 600,
  },
  sectionDesc: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    marginTop: '-12px',
  },
  repList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  repInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  repName: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  repMeta: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  partyBadge: {
    padding: '1px 6px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
  },
  repState: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
  },
  repCommittee: {
    color: 'var(--text-muted)',
  },
  newsletter: {
    padding: '24px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
  },
  nlTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  nlDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginBottom: '16px',
  },
  nlForm: {
    display: 'flex',
    gap: '8px',
  },
  nlSuccess: {
    color: 'var(--success)',
    fontSize: '14px',
    fontWeight: 500,
  },
  letterCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    position: 'relative',
  },
  letterText: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    fontFamily: 'var(--font-mono)',
    maxHeight: '300px',
    overflow: 'auto',
  },
  shareSection: {
    padding: '24px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
  },
  shareTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '12px',
  },
  shareButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
};
