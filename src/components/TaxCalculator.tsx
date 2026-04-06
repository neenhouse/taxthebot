import { useState } from 'react';
import { totalAIProfit, calculateTaxRevenue, calculateFunding, fundingTargets, formatNumber } from '../data/economic';

export function TaxCalculator() {
  const [taxRate, setTaxRate] = useState(5);

  const revenue = calculateTaxRevenue(taxRate);

  return (
    <section id="calculator" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>ROBOT TAX CALCULATOR</span>
          <h2 style={styles.title}>What If We Taxed the Bots?</h2>
          <p style={styles.subtitle}>
            Drag the slider to see how much revenue different tax rates would generate
            and what that money could fund.
          </p>
        </div>

        <div style={styles.calcCard}>
          <div style={styles.sliderSection}>
            <div style={styles.sliderHeader}>
              <span style={styles.sliderLabel}>Tax Rate on AI Profits</span>
              <span style={styles.sliderValue}>{taxRate}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={taxRate}
              onChange={e => setTaxRate(Number(e.target.value))}
              style={styles.slider}
              aria-label="Tax rate percentage"
            />
            <div style={styles.sliderRange}>
              <span>1%</span>
              <span>25%</span>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.resultSection}>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Total AI Profits (2025)</span>
              <span style={styles.resultAmount}>${totalAIProfit.toFixed(1)}B</span>
            </div>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Tax Rate</span>
              <span style={{ ...styles.resultAmount, color: 'var(--accent-warm)' }}>{taxRate}%</span>
            </div>
            <div style={{ ...styles.resultRow, ...styles.resultTotal }}>
              <span style={styles.resultLabel}>Annual Tax Revenue</span>
              <span style={styles.totalAmount}>${revenue.toFixed(1)}B</span>
            </div>
          </div>
        </div>

        <h3 style={styles.fundingTitle}>What ${revenue.toFixed(1)}B Could Fund</h3>

        <div style={styles.fundingGrid}>
          {fundingTargets.map(target => {
            const peopleFunded = calculateFunding(revenue, target.costPerPerson);
            return (
              <div key={target.name} className="funding-card">
                <div style={styles.fundingIcon}>{target.icon}</div>
                <div style={styles.fundingName}>{target.name}</div>
                <div style={styles.fundingPeople}>
                  {formatNumber(peopleFunded)}
                </div>
                <div style={styles.fundingLabel}>people supported</div>
                <div style={styles.fundingDesc}>{target.description}</div>
              </div>
            );
          })}
        </div>

        <div style={styles.comparison}>
          <div style={styles.comparisonItem}>
            <div style={styles.compIcon}>0%</div>
            <div style={styles.compLabel}>Current robot tax rate</div>
          </div>
          <div style={styles.compArrow}>&rarr;</div>
          <div style={styles.comparisonItem}>
            <div style={{ ...styles.compIcon, background: 'var(--accent)' }}>{taxRate}%</div>
            <div style={styles.compLabel}>Your proposed rate</div>
          </div>
          <div style={styles.compArrow}>=</div>
          <div style={styles.comparisonItem}>
            <div style={{ ...styles.compIcon, background: 'var(--success)' }}>${revenue.toFixed(1)}B</div>
            <div style={styles.compLabel}>For displaced workers</div>
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
    background: 'rgba(250, 204, 21, 0.1)',
    border: '1px solid rgba(250, 204, 21, 0.2)',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-warm)',
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
  calcCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px',
    marginBottom: '48px',
  },
  sliderSection: {
    marginBottom: '24px',
  },
  sliderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  sliderLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  },
  sliderValue: {
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-warm)',
  },
  slider: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    appearance: 'none',
    background: 'var(--border)',
    outline: 'none',
    cursor: 'pointer',
    accentColor: '#DC2626',
  },
  sliderRange: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    fontSize: '12px',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  divider: {
    height: '1px',
    background: 'var(--border)',
    margin: '24px 0',
  },
  resultSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
  },
  resultLabel: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  resultAmount: {
    fontSize: '18px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-primary)',
  },
  resultTotal: {
    borderTop: '2px solid var(--accent)',
    paddingTop: '16px',
    marginTop: '4px',
  },
  totalAmount: {
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--success)',
  },
  fundingTitle: {
    fontSize: '20px',
    color: 'var(--text-primary)',
    marginBottom: '24px',
    textAlign: 'center',
  },
  fundingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '48px',
  },
  fundingCard: {},
  fundingIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  fundingName: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    fontFamily: 'var(--font-display)',
  },
  fundingPeople: {
    fontSize: '24px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-warm)',
  },
  fundingLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  fundingDesc: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  comparison: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    padding: '32px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
  },
  comparisonItem: {
    textAlign: 'center',
  },
  compIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--text-muted)',
    color: 'white',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    fontSize: '18px',
    marginBottom: '8px',
  },
  compLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  compArrow: {
    fontSize: '24px',
    color: 'var(--text-muted)',
  },
};
