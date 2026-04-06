import { aiCompanies, formatBillions, formatNumber } from '../data/economic';
import { useInView } from '../hooks/useInView';

export function CompanyDashboard() {
  const [ref, inView] = useInView(0.1);

  const maxRevenue = Math.max(...aiCompanies.map(c => c.aiRevenue2025));

  return (
    <section id="dashboard" style={styles.section} ref={ref as React.RefObject<HTMLElement>}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>AI PROFIT TRACKER</span>
          <h2 style={styles.title}>Follow the Money</h2>
          <p style={styles.subtitle}>
            The top AI companies generated unprecedented profits in 2025.
            Here is where the money went — and where it did not.
          </p>
        </div>

        <div style={styles.tableWrapper}>
          <div style={styles.table}>
            <div style={{ ...styles.tableRow, ...styles.tableHeader }}>
              <div style={{ ...styles.cell, flex: 2 }}>Company</div>
              <div style={styles.cell}>AI Revenue</div>
              <div style={styles.cell}>AI Profit</div>
              <div style={styles.cell}>Jobs Displaced</div>
              <div style={{ ...styles.cell, flex: 1.5 }}>Profit / Displaced Worker</div>
              <div style={styles.cell}>Growth</div>
            </div>

            {aiCompanies.map((company, i) => (
              <div
                key={company.name}
                className="table-row-hover"
                style={{
                  ...styles.tableRow,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.4s ease ${i * 0.08}s`,
                }}
              >
                <div style={{ ...styles.cell, flex: 2 }}>
                  <div style={styles.companyInfo}>
                    <span style={styles.companyName}>{company.name}</span>
                    <span style={styles.ticker}>{company.ticker}</span>
                  </div>
                </div>
                <div style={styles.cell}>
                  <div style={styles.barCell}>
                    <span style={styles.cellValue}>{formatBillions(company.aiRevenue2025)}</span>
                    <div style={styles.barTrack}>
                      <div
                        style={{
                          ...styles.bar,
                          width: `${(company.aiRevenue2025 / maxRevenue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div style={styles.cell}>
                  <span style={{
                    ...styles.cellValue,
                    color: company.aiProfit2025 >= 0 ? 'var(--success)' : 'var(--danger)',
                  }}>
                    {formatBillions(company.aiProfit2025)}
                  </span>
                </div>
                <div style={styles.cell}>
                  <span style={{ ...styles.cellValue, color: 'var(--accent)' }}>
                    {formatNumber(company.jobsDisplaced)}
                  </span>
                </div>
                <div style={{ ...styles.cell, flex: 1.5 }}>
                  <span style={{
                    ...styles.cellValue,
                    color: company.profitPerDisplacedWorker >= 0 ? 'var(--accent-warm)' : 'var(--text-muted)',
                  }}>
                    {company.profitPerDisplacedWorker >= 0
                      ? `$${formatNumber(company.profitPerDisplacedWorker)}`
                      : 'N/A (loss)'}
                  </span>
                </div>
                <div style={styles.cell}>
                  <span style={styles.growth}>
                    +{company.revenueGrowthPct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.insight}>
          <div style={styles.insightIcon}>!</div>
          <div>
            <strong>The gap is staggering:</strong> For every job AI displaces, Nvidia alone profits $319,592.
            That displaced worker? Average severance: $0 from AI companies. Zero retraining. Zero support.
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
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
  },
  table: {
    minWidth: '800px',
  },
  tableHeader: {
    background: 'var(--bg-elevated)',
    borderBottom: '1px solid var(--border)',
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    borderBottom: '1px solid var(--border)',
    transition: 'background 0.2s',
  },
  cell: {
    flex: 1,
    padding: '14px 8px',
    fontSize: '13px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-secondary)',
  },
  companyInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  companyName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontSize: '14px',
  },
  ticker: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  barCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cellValue: {
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  barTrack: {
    height: '4px',
    background: 'var(--border)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))',
    borderRadius: '2px',
    transition: 'width 0.6s ease',
  },
  growth: {
    color: 'var(--success)',
    fontWeight: 600,
    fontSize: '13px',
  },
  insight: {
    marginTop: '24px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    padding: '20px',
    background: 'rgba(220, 38, 38, 0.08)',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: 'var(--radius-lg)',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  insightIcon: {
    width: '28px',
    height: '28px',
    minWidth: '28px',
    borderRadius: '50%',
    background: 'var(--accent)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '14px',
  },
};
