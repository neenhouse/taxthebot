import { taxModels } from '../data/economic';

export function PolicyCards() {
  return (
    <section id="policy" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>POLICY PROPOSALS</span>
          <h2 style={styles.title}>Models for Robot Taxation</h2>
          <p style={styles.subtitle}>
            There is no single right answer. Here are four credible approaches,
            each with tradeoffs. Which one makes sense?
          </p>
        </div>

        <div style={styles.grid}>
          {taxModels.map((model, i) => (
            <div key={model.id} style={{
              ...styles.card,
              borderTopColor: ['var(--accent)', 'var(--accent-warm)', 'var(--info)', 'var(--success)'][i],
            }}>
              <div style={styles.cardHeader}>
                <div style={{
                  ...styles.modelNumber,
                  background: ['var(--accent)', 'var(--accent-warm)', 'var(--info)', 'var(--success)'][i],
                }}>
                  {i + 1}
                </div>
                <h3 style={styles.modelName}>{model.name}</h3>
              </div>

              <p style={styles.modelDesc}>{model.description}</p>

              <div style={styles.prosConsRow}>
                <div style={styles.prosSection}>
                  <div style={styles.prosTitle}>Pros</div>
                  {model.pros.map((pro, j) => (
                    <div key={j} style={styles.proItem}>
                      <span style={styles.proIcon}>+</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.consSection}>
                  <div style={styles.consTitle}>Cons</div>
                  {model.cons.map((con, j) => (
                    <div key={j} style={styles.conItem}>
                      <span style={styles.conIcon}>-</span>
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.caseSection}>
          <h3 style={styles.caseTitle}>The Case for Robot Taxes</h3>
          <div style={styles.caseGrid}>
            <div style={styles.caseCard}>
              <div style={styles.caseNumber}>01</div>
              <h4 style={styles.caseHeading}>The Productivity Paradox</h4>
              <p style={styles.caseText}>
                AI is making companies more productive and profitable than ever,
                but those gains flow almost exclusively to shareholders, not workers.
                Robot taxes redirect a fraction of that value back to affected communities.
              </p>
            </div>
            <div style={styles.caseCard}>
              <div style={styles.caseNumber}>02</div>
              <h4 style={styles.caseHeading}>Precedent Exists</h4>
              <p style={styles.caseText}>
                We already tax labor through payroll taxes. When AI replaces that labor,
                the tax base erodes. Robot taxes simply level the playing field between
                human and automated work.
              </p>
            </div>
            <div style={styles.caseCard}>
              <div style={styles.caseNumber}>03</div>
              <h4 style={styles.caseHeading}>Transition Funding</h4>
              <p style={styles.caseText}>
                The AI transition will displace millions. Without dedicated funding for
                retraining, UBI, and community investment, we risk creating a permanent
                underclass. Robot taxes fund the bridge.
              </p>
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
    background: 'var(--bg-elevated)',
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
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    color: 'var(--success)',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '64px',
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderTop: '3px solid',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  modelNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 700,
    fontSize: '13px',
    fontFamily: 'var(--font-mono)',
  },
  modelName: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  modelDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  prosConsRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  prosSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  consSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  prosTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--success)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  consTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--danger)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  proItem: {
    display: 'flex',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  proIcon: {
    color: 'var(--success)',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
  },
  conItem: {
    display: 'flex',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  conIcon: {
    color: 'var(--danger)',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
  },
  caseSection: {
    textAlign: 'center',
  },
  caseTitle: {
    fontSize: '24px',
    color: 'var(--text-primary)',
    marginBottom: '32px',
  },
  caseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  caseCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    textAlign: 'left',
  },
  caseNumber: {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent)',
    opacity: 0.4,
    marginBottom: '8px',
  },
  caseHeading: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  caseText: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
};
