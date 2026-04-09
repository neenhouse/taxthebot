import { stories, type DisplacementStory } from '../data/stories';
import { useInView } from '../hooks/useInView';

const statusConfig: Record<DisplacementStory['currentStatus'], { label: string; color: string; bg: string }> = {
  'job-searching': { label: 'Job Searching', color: 'var(--accent-warm)', bg: 'rgba(250, 204, 21, 0.12)' },
  'retraining': { label: 'Retraining', color: 'var(--info)', bg: 'rgba(59, 130, 246, 0.12)' },
  'underemployed': { label: 'Underemployed', color: 'var(--accent)', bg: 'rgba(220, 38, 38, 0.12)' },
  'new-career': { label: 'New Career', color: 'var(--success)', bg: 'rgba(34, 197, 94, 0.12)' },
  'unemployed': { label: 'Unemployed', color: 'var(--accent)', bg: 'rgba(220, 38, 38, 0.12)' },
};

export function DisplacementStories() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="stories" style={styles.section} ref={ref as React.RefObject<HTMLElement>}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>REAL STORIES</span>
          <h2 style={styles.title}>Behind Every Number, a Person</h2>
          <p style={styles.subtitle}>
            These accounts represent the experiences of workers displaced by AI automation.
            Names changed, stories real.
          </p>
        </div>

        <div style={styles.grid}>
          {stories.map((story, i) => {
            const status = statusConfig[story.currentStatus];
            return (
              <div
                key={story.id}
                className="story-card"
                style={{
                  ...styles.card,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.5s ease ${i * 0.1}s`,
                }}
              >
                <div style={styles.quoteSection}>
                  <span style={styles.quoteMark}>"</span>
                  <p style={styles.storyText}>{story.story}</p>
                </div>

                <div style={styles.divider} />

                <div style={styles.attribution}>
                  <div style={styles.nameRow}>
                    <span style={styles.name}>{story.name}, {story.age}</span>
                  </div>
                  <div style={styles.roleRow}>
                    <span style={styles.role}>{story.formerRole}</span>
                    <span style={styles.separator}>·</span>
                    <span style={styles.experience}>{story.yearsExperience} yrs experience</span>
                  </div>
                  <div style={styles.locationRow}>
                    <span style={styles.location}>{story.location}</span>
                  </div>
                </div>

                <div style={styles.statusRow}>
                  <span style={styles.replacedBy}>
                    Replaced by: <span style={styles.aiTool}>{story.aiToolThatReplaced}</span>
                  </span>
                  <span
                    style={{
                      ...styles.statusBadge,
                      color: status.color,
                      background: status.bg,
                    }}
                  >
                    {status.label}
                  </span>
                  <span style={styles.months}>
                    {story.monthsSinceDisplacement} months since displacement
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={styles.ctaCard}>
          <div style={styles.ctaInner}>
            <h3 style={styles.ctaTitle}>Your Story Matters</h3>
            <p style={styles.ctaText}>
              If you've been affected by AI displacement, your experience can help shape policy.
              Share your story — anonymously if you prefer.
            </p>
            <div style={styles.ctaButtons}>
              <a
                href="mailto:stories@taxthebot.org"
                className="btn-primary"
                style={styles.btnPrimary}
              >
                Share Your Story
              </a>
              <button className="btn-warm" style={styles.btnWarm}>
                Read More Stories
              </button>
            </div>
          </div>
        </div>

        <p style={styles.disclaimer}>
          Stories are composite accounts based on documented displacement patterns.
          As we grow, this section will feature verified first-person accounts.
        </p>
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
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '48px',
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  quoteSection: {
    position: 'relative',
    paddingLeft: '24px',
  },
  quoteMark: {
    position: 'absolute',
    left: '0',
    top: '-8px',
    fontSize: '48px',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    color: 'var(--accent)',
    lineHeight: 1,
    opacity: 0.6,
  },
  storyText: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    fontStyle: 'italic',
  },
  divider: {
    height: '1px',
    background: 'var(--border)',
    width: '100%',
  },
  attribution: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  name: {
    fontSize: '15px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
  },
  roleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  role: {
    fontWeight: 500,
  },
  separator: {
    color: 'var(--text-muted)',
  },
  experience: {
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
  },
  locationRow: {
    display: 'flex',
    alignItems: 'center',
  },
  location: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    fontSize: '12px',
  },
  replacedBy: {
    color: 'var(--text-muted)',
    fontSize: '12px',
  },
  aiTool: {
    color: 'var(--accent)',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
  },
  statusBadge: {
    padding: '2px 10px',
    borderRadius: 'var(--radius-full)',
    fontSize: '11px',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.5px',
  },
  months: {
    color: 'var(--text-muted)',
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
  },
  ctaCard: {
    marginBottom: '32px',
    borderRadius: 'var(--radius-xl)',
    padding: '2px',
    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.4), rgba(250, 204, 21, 0.4))',
  },
  ctaInner: {
    background: 'var(--bg-card)',
    borderRadius: 'calc(var(--radius-xl) - 2px)',
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  ctaTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
  },
  ctaText: {
    fontSize: '15px',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    maxWidth: '540px',
  },
  ctaButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnPrimary: {
    display: 'inline-block',
    textDecoration: 'none',
  },
  btnWarm: {},
  disclaimer: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    lineHeight: 1.6,
    maxWidth: '600px',
    margin: '0 auto',
    fontStyle: 'italic',
  },
};
