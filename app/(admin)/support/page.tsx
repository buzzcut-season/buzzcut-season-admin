import styles from "../AdminPage.module.css";

export default function SupportPage() {
  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Support</span>
          <h1>Tickets</h1>
          <p>Resolve escalations, manage templates, and track response times.</p>
        </div>
      </section>

      <section className={`${styles.grid} ${styles.statGrid}`}>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Open tickets</span>
          <strong className={styles.statValue}>37</strong>
          <span className={styles.statDelta}>7 escalated</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Avg. response</span>
          <strong className={styles.statValue}>28m</strong>
          <span className={styles.statDelta}>SLA within target</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Templates used</span>
          <strong className={styles.statValue}>112</strong>
          <span className={styles.statDelta}>This week</span>
        </article>
      </section>

      <section className={`${styles.grid} ${styles.twoColumn}`}>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Escalation queue</h2>
            <span className="badge">Priority</span>
          </div>
          <div className={styles.list}>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Ticket #5512</span>
                <span className={styles.listSubtitle}>Chargeback dispute pending</span>
              </div>
              <span className={styles.statusTag}>Escalated</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Ticket #5501</span>
                <span className={styles.listSubtitle}>Delayed payout confirmation</span>
              </div>
              <span className={styles.statusTag}>High</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Ticket #5493</span>
                <span className={styles.listSubtitle}>Partial refund timeline</span>
              </div>
              <span className={styles.statusTag}>Needs review</span>
            </div>
          </div>
        </article>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Response templates</h2>
            <span className="badge">Draft</span>
          </div>
          <div className={styles.list}>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Refund approved</span>
                <span className={styles.listSubtitle}>Used 48 times</span>
              </div>
              <span className={styles.statusTag}>Live</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Verification pending</span>
                <span className={styles.listSubtitle}>Used 22 times</span>
              </div>
              <span className={styles.statusTag}>Live</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Escalation note</span>
                <span className={styles.listSubtitle}>Needs review</span>
              </div>
              <span className={styles.statusTag}>Draft</span>
            </div>
          </div>
          <div className={styles.helperNote}>
            Templates speed up replies and keep tone consistent.
          </div>
        </article>
      </section>
    </>
  );
}
