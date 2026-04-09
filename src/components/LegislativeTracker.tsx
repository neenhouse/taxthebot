import { useState } from 'react';
import { getActiveBills, statusOrder, type Bill } from '../data/legislation';

type Category = 'all' | Bill['category'];

const categoryLabels: Record<Category, string> = {
  all: 'All',
  tax: 'Tax',
  disclosure: 'Disclosure',
  'impact-assessment': 'Impact Assessment',
  'worker-protection': 'Worker Protection',
};

const statusLabels: Record<string, string> = {
  introduced: 'Introduced',
  committee: 'In Committee',
  'passed-chamber': 'Passed Chamber',
  enacted: 'Enacted',
  vetoed: 'Vetoed',
  stalled: 'Stalled',
};

const statusColors: Record<string, string> = {
  introduced: 'var(--text-muted)',
  committee: 'var(--info)',
  'passed-chamber': 'var(--accent-warm)',
  enacted: 'var(--success)',
  vetoed: 'var(--accent)',
  stalled: 'var(--text-muted)',
};

const pipelineStages = ['introduced', 'committee', 'passed-chamber', 'enacted'] as const;

function getJurisdictionColor(jurisdiction: string): string {
  if (jurisdiction === 'US') return 'var(--accent)';
  if (jurisdiction === 'EU') return 'var(--info)';
  return 'var(--accent-warm)';
}

function getJurisdictionLabel(jurisdiction: string): string {
  if (jurisdiction === 'US') return 'Federal';
  if (jurisdiction === 'EU') return 'International';
  return 'State';
}

export function LegislativeTracker() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const allBills = getActiveBills();

  const filteredBills = allBills
    .filter((bill) => activeCategory === 'all' || bill.category === activeCategory)
    .sort((a, b) => (statusOrder[b.status] ?? 0) - (statusOrder[a.status] ?? 0));

  // Count bills at each pipeline stage (from all bills, not filtered)
  const stageCounts: Record<string, number> = {};
  for (const stage of pipelineStages) {
    stageCounts[stage] = allBills.filter((b) => b.status === stage).length;
  }

  return (
    <section id="legislation" style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.tag}>LEGISLATIVE TRACKER</span>
          <h2 style={styles.title}>Real Bills. Real Progress.</h2>
          <p style={styles.subtitle}>
            Track AI legislation actually moving through state houses and Congress.
          </p>
        </div>

        {/* Status Pipeline */}
        <div style={styles.pipeline}>
          {pipelineStages.map((stage, i) => (
            <div key={stage} style={styles.pipelineStage}>
              <div
                style={{
                  ...styles.pipelineDot,
                  background: statusColors[stage],
                  boxShadow: `0 0 8px ${statusColors[stage]}`,
                }}
              >
                <span style={styles.pipelineCount}>{stageCounts[stage]}</span>
              </div>
              {i < pipelineStages.length - 1 && <div style={styles.pipelineLine} />}
              <div style={styles.pipelineLabel}>{statusLabels[stage]}</div>
            </div>
          ))}
        </div>

        {/* Category Filter Tabs */}
        <div style={styles.filterRow}>
          {(Object.keys(categoryLabels) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.filterButton,
                ...(activeCategory === cat ? styles.filterButtonActive : {}),
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Bill Cards Grid */}
        <div style={styles.grid}>
          {filteredBills.map((bill) => (
            <div key={bill.id} className="legislative-card" style={styles.card}>
              {/* Top row: jurisdiction badge + bill number */}
              <div style={styles.cardTopRow}>
                <span
                  style={{
                    ...styles.jurisdictionBadge,
                    background: `${getJurisdictionColor(bill.jurisdiction)}20`,
                    color: getJurisdictionColor(bill.jurisdiction),
                    borderColor: `${getJurisdictionColor(bill.jurisdiction)}40`,
                  }}
                  title={getJurisdictionLabel(bill.jurisdiction)}
                >
                  {bill.jurisdiction}
                </span>
                <span style={styles.billNumber}>{bill.billNumber}</span>
              </div>

              {/* Title */}
              <h3 style={styles.cardTitle}>{bill.title}</h3>

              {/* Summary */}
              <p style={styles.cardSummary}>{bill.summary}</p>

              {/* Status + Category badges */}
              <div style={styles.badgeRow}>
                <span
                  style={{
                    ...styles.statusBadge,
                    background: `${statusColors[bill.status]}18`,
                    color: statusColors[bill.status],
                    borderColor: `${statusColors[bill.status]}30`,
                  }}
                >
                  {statusLabels[bill.status]}
                </span>
                <span style={styles.categoryTag}>
                  {categoryLabels[bill.category as Category]}
                </span>
              </div>

              {/* Last Action */}
              <div style={styles.lastAction}>
                <span style={styles.lastActionLabel}>Last action:</span>
                <span style={styles.lastActionText}>{bill.lastAction}</span>
                <span style={styles.lastActionDate}>{bill.lastActionDate}</span>
              </div>

              {/* Track button */}
              <button style={styles.trackButton} onClick={() => {}}>
                Track This Bill
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={styles.bottomCta}>
          <p style={styles.ctaText}>
            Know of a bill we're missing?{' '}
            <a
              href="mailto:tips@taxthebot.com?subject=Bill%20Submission"
              style={styles.ctaLink}
            >
              Let us know.
            </a>
          </p>
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

  /* Pipeline */
  pipeline: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '0',
    marginBottom: '40px',
    padding: '24px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    overflowX: 'auto',
  },
  pipelineStage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    minWidth: '100px',
  },
  pipelineDot: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  pipelineCount: {
    color: 'white',
    fontWeight: 700,
    fontSize: '14px',
    fontFamily: 'var(--font-mono)',
  },
  pipelineLine: {
    position: 'absolute',
    top: '20px',
    left: 'calc(50% + 20px)',
    width: 'calc(100% - 40px)',
    height: '2px',
    background: 'var(--border)',
    zIndex: 1,
  },
  pipelineLabel: {
    marginTop: '10px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textAlign: 'center',
    fontFamily: 'var(--font-body)',
  },

  /* Filter Tabs */
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  filterButton: {
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: 'var(--font-body)',
    color: 'var(--text-secondary)',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-full)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    color: 'white',
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
  },

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px',
    marginBottom: '48px',
  },

  /* Card */
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'border-color 0.2s',
  },
  cardTopRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  jurisdictionBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid',
    letterSpacing: '0.5px',
  },
  billNumber: {
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-muted)',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.4,
    margin: 0,
  },
  cardSummary: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    margin: 0,
  },
  badgeRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'center',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    borderRadius: 'var(--radius-full)',
    border: '1px solid',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  categoryTag: {
    display: 'inline-block',
    padding: '3px 10px',
    fontSize: '11px',
    fontWeight: 500,
    fontFamily: 'var(--font-body)',
    color: 'var(--text-muted)',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-full)',
  },
  lastAction: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '10px 0 0',
    borderTop: '1px solid var(--border)',
    fontSize: '12px',
  },
  lastActionLabel: {
    fontWeight: 600,
    color: 'var(--text-muted)',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: 'var(--font-mono)',
  },
  lastActionText: {
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  lastActionDate: {
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
  },
  trackButton: {
    marginTop: 'auto',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    color: 'var(--accent)',
    background: 'rgba(220, 38, 38, 0.08)',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
  },

  /* Bottom CTA */
  bottomCta: {
    textAlign: 'center',
    padding: '32px 0 0',
  },
  ctaText: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  ctaLink: {
    color: 'var(--accent)',
    fontWeight: 600,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
};
