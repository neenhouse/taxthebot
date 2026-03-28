import { useState } from 'react';
import { stateImpacts, formatNumber, formatCurrency, type StateImpact } from '../data/economic';

const severityColors: Record<string, string> = {
  critical: '#DC2626',
  high: '#F59E0B',
  medium: '#3B82F6',
  low: '#6B7280',
};

export function ImpactMap() {
  const [selectedState, setSelectedState] = useState<StateImpact | null>(null);
  const [sortBy, setSortBy] = useState<'jobsAtRisk' | 'percentWorkforce'>('jobsAtRisk');

  const sorted = [...stateImpacts].sort((a, b) => b[sortBy] - a[sortBy]);
  const maxJobs = Math.max(...stateImpacts.map(s => s.jobsAtRisk));

  return (
    <section id="impact" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>COMMUNITY IMPACT MAP</span>
          <h2 style={styles.title}>Where AI Hits Hardest</h2>
          <p style={styles.subtitle}>
            AI displacement is not evenly distributed. Some communities bear the brunt
            while tech hubs reap the profits.
          </p>
        </div>

        <div style={styles.layout}>
          <div style={styles.mapPanel}>
            <div style={styles.legend}>
              {(['critical', 'high', 'medium', 'low'] as const).map(severity => (
                <div key={severity} style={styles.legendItem}>
                  <span style={{ ...styles.legendDot, background: severityColors[severity] }} />
                  <span style={styles.legendLabel}>{severity}</span>
                </div>
              ))}
            </div>

            <div style={styles.sortRow}>
              <span style={styles.sortLabel}>Sort by:</span>
              <button
                style={{
                  ...styles.sortBtn,
                  ...(sortBy === 'jobsAtRisk' ? styles.sortBtnActive : {}),
                }}
                onClick={() => setSortBy('jobsAtRisk')}
              >
                Jobs at Risk
              </button>
              <button
                style={{
                  ...styles.sortBtn,
                  ...(sortBy === 'percentWorkforce' ? styles.sortBtnActive : {}),
                }}
                onClick={() => setSortBy('percentWorkforce')}
              >
                % Workforce
              </button>
            </div>

            <div style={styles.stateList}>
              {sorted.map(state => (
                <button
                  key={state.abbr}
                  style={{
                    ...styles.stateRow,
                    ...(selectedState?.abbr === state.abbr ? styles.stateRowActive : {}),
                  }}
                  onClick={() => setSelectedState(state)}
                >
                  <div style={styles.stateLeft}>
                    <span
                      style={{
                        ...styles.severityBadge,
                        background: severityColors[state.severity],
                      }}
                    />
                    <span style={styles.stateAbbr}>{state.abbr}</span>
                    <span style={styles.stateName}>{state.state}</span>
                  </div>
                  <div style={styles.stateRight}>
                    <div style={styles.stateBarTrack}>
                      <div
                        style={{
                          ...styles.stateBar,
                          width: `${(state.jobsAtRisk / maxJobs) * 100}%`,
                          background: severityColors[state.severity],
                        }}
                      />
                    </div>
                    <span style={styles.stateValue}>
                      {formatNumber(state.jobsAtRisk)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.detailPanel}>
            {selectedState ? (
              <div style={styles.detailCard}>
                <div style={styles.detailHeader}>
                  <h3 style={styles.detailTitle}>{selectedState.state}</h3>
                  <span style={{
                    ...styles.detailSeverity,
                    background: `${severityColors[selectedState.severity]}22`,
                    color: severityColors[selectedState.severity],
                    borderColor: `${severityColors[selectedState.severity]}44`,
                  }}>
                    {selectedState.severity.toUpperCase()} RISK
                  </span>
                </div>

                <div style={styles.detailStats}>
                  <div style={styles.detailStat}>
                    <div style={styles.detailStatValue}>{formatNumber(selectedState.jobsAtRisk)}</div>
                    <div style={styles.detailStatLabel}>Jobs at Risk</div>
                  </div>
                  <div style={styles.detailStat}>
                    <div style={styles.detailStatValue}>{selectedState.percentWorkforce}%</div>
                    <div style={styles.detailStatLabel}>of Workforce</div>
                  </div>
                  <div style={styles.detailStat}>
                    <div style={styles.detailStatValue}>{formatCurrency(selectedState.avgSalaryImpacted)}</div>
                    <div style={styles.detailStatLabel}>Avg. Salary Impacted</div>
                  </div>
                </div>

                <div style={styles.detailInsight}>
                  <strong>Economic impact:</strong> If these jobs are displaced without support,
                  {selectedState.state} stands to lose {formatCurrency(selectedState.jobsAtRisk * selectedState.avgSalaryImpacted)} in
                  annual wages. A 5% robot tax could fund retraining for{' '}
                  {formatNumber(Math.floor(selectedState.jobsAtRisk * 0.4))} workers.
                </div>
              </div>
            ) : (
              <div style={styles.detailEmpty}>
                <div style={styles.emptyIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p style={styles.emptyText}>
                  Select a state to see detailed impact data
                </p>
              </div>
            )}

            <div style={styles.summaryCards}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryValue}>
                  {formatNumber(stateImpacts.reduce((s, st) => s + st.jobsAtRisk, 0))}
                </div>
                <div style={styles.summaryLabel}>Total jobs at risk (top 20 states)</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={{ ...styles.summaryValue, color: 'var(--accent)' }}>
                  {stateImpacts.filter(s => s.severity === 'critical').length}
                </div>
                <div style={styles.summaryLabel}>States at critical risk</div>
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
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    color: 'var(--info)',
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
    gap: '24px',
  },
  mapPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  legend: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  legendLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    textTransform: 'capitalize',
  },
  sortRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sortLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  sortBtn: {
    padding: '4px 12px',
    fontSize: '12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.2s',
  },
  sortBtnActive: {
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
    color: 'white',
  },
  stateList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  stateRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent',
    background: 'var(--bg-card)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    fontFamily: 'var(--font-body)',
    textAlign: 'left',
    color: 'var(--text-primary)',
  },
  stateRowActive: {
    borderColor: 'var(--accent)',
    background: 'rgba(220, 38, 38, 0.08)',
  },
  stateLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  severityBadge: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  stateAbbr: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
    fontSize: '13px',
    color: 'var(--text-primary)',
    width: '28px',
  },
  stateName: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  stateRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  stateBarTrack: {
    width: '80px',
    height: '4px',
    background: 'var(--border)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  stateBar: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.3s',
  },
  stateValue: {
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-secondary)',
    width: '48px',
    textAlign: 'right',
  },
  detailPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  detailCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  detailTitle: {
    fontSize: '24px',
    color: 'var(--text-primary)',
  },
  detailSeverity: {
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    letterSpacing: '1px',
    border: '1px solid',
  },
  detailStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  detailStat: {
    textAlign: 'center',
    padding: '16px',
    background: 'var(--bg)',
    borderRadius: 'var(--radius-md)',
  },
  detailStatValue: {
    fontSize: '20px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-warm)',
    marginBottom: '4px',
  },
  detailStatLabel: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  detailInsight: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    padding: '16px',
    background: 'rgba(250, 204, 21, 0.06)',
    border: '1px solid rgba(250, 204, 21, 0.15)',
    borderRadius: 'var(--radius-md)',
  },
  detailEmpty: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '64px 24px',
    textAlign: 'center',
    color: 'var(--text-muted)',
  },
  emptyIcon: {
    marginBottom: '16px',
    opacity: 0.5,
  },
  emptyText: {
    fontSize: '14px',
  },
  summaryCards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  summaryCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '20px',
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: '28px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-warm)',
    marginBottom: '4px',
  },
  summaryLabel: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
};
