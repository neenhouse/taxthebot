import { useLiveCounter } from '../hooks/useCounter';
import { profitPerSecond, totalAIProfit, totalJobsDisplaced, formatNumber } from '../data/economic';

export function Hero() {
  const liveProfit = useLiveCounter(totalAIProfit * 1e9 * 0.6, profitPerSecond);
  const liveJobs = useLiveCounter(totalJobsDisplaced * 0.6, totalJobsDisplaced / (365 * 24 * 3600));

  const taxRate = 5;
  const liveTaxRevenue = liveProfit * (taxRate / 100);

  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          LIVE DATA
        </div>

        <h1 style={styles.heading}>
          AI Made{' '}
          <span style={styles.highlight}>${(totalAIProfit).toFixed(1)} Billion</span>{' '}
          Last Year.
          <br />
          Workers Got <span style={styles.highlightYellow}>$0</span>.
        </h1>

        <p style={styles.subtitle}>
          Track the profits. Tax the bots. Fund the future.
        </p>

        <div style={styles.ctas}>
          <a href="#dashboard" className="cta-primary">
            See the Data
          </a>
          <a href="#calculator" className="cta-secondary">
            Calculate the Tax
          </a>
        </div>

        <div style={styles.counters}>
          <div className="counter-card counter-card--profit">
            <div style={styles.counterLabel}>AI Profits Today</div>
            <div style={styles.counterValue}>
              ${(liveProfit / 1e9).toFixed(3)}B
            </div>
            <div style={styles.counterRate}>+${(profitPerSecond).toFixed(0)}/sec</div>
          </div>

          <div className="counter-card counter-card--jobs">
            <div style={styles.counterLabel}>Jobs Displaced Today</div>
            <div style={{ ...styles.counterValue, color: 'var(--accent)' }}>
              {formatNumber(Math.floor(liveJobs))}
            </div>
            <div style={styles.counterRate}>and counting</div>
          </div>

          <div className="counter-card counter-card--tax">
            <div style={styles.counterLabel}>If Bots Were Taxed (5%)</div>
            <div style={{ ...styles.counterValue, color: 'var(--success)' }}>
              ${(liveTaxRevenue / 1e9).toFixed(3)}B
            </div>
            <div style={styles.counterRate}>for displaced workers</div>
          </div>
        </div>
      </div>

      <div style={styles.gridOverlay} />
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    position: 'relative',
    padding: '80px 0 64px',
    overflow: 'hidden',
    background: 'radial-gradient(ellipse at 50% 0%, rgba(220, 38, 38, 0.12) 0%, transparent 60%)',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    background: 'rgba(220, 38, 38, 0.15)',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    borderRadius: 'var(--radius-full)',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent)',
    letterSpacing: '1.5px',
    marginBottom: '24px',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--accent)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  heading: {
    fontSize: 'clamp(32px, 6vw, 64px)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-1.5px',
    marginBottom: '24px',
    color: 'var(--text-primary)',
  },
  highlight: {
    color: 'var(--accent)',
    textShadow: '0 0 40px rgba(220, 38, 38, 0.4)',
  },
  highlightYellow: {
    color: 'var(--accent-warm)',
    textShadow: '0 0 40px rgba(250, 204, 21, 0.4)',
  },
  subtitle: {
    fontSize: 'clamp(16px, 2vw, 20px)',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto 40px',
    lineHeight: 1.6,
  },
  ctas: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '64px',
  },
  counters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  counterLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
    fontFamily: 'var(--font-mono)',
  },
  counterValue: {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-warm)',
    letterSpacing: '-1px',
  },
  counterRate: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    marginTop: '4px',
    fontFamily: 'var(--font-mono)',
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
};
