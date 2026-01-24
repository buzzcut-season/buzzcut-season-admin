import styles from "../AdminPage.module.css";

export default function PaymentsPage() {
  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Payments</span>
          <h1>Reconciliation</h1>
          <p>Track gateways, fees, and payout batches across providers.</p>
        </div>
      </section>

      <section className={`${styles.grid} ${styles.statGrid}`}>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Captured today</span>
          <strong className={styles.statValue}>$54,220</strong>
          <span className={styles.statDelta}>+6.3% vs last week</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Pending settlements</span>
          <strong className={styles.statValue}>$12,180</strong>
          <span className={styles.statDelta}>3 batches</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Disputes</span>
          <strong className={styles.statValue}>4</strong>
          <span className={styles.statDelta}>2 expiring soon</span>
        </article>
      </section>

      <section className={`${styles.grid} ${styles.twoColumn}`}>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Provider activity</h2>
            <span className="badge">Today</span>
          </div>
          <div className={styles.list}>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Stripe</span>
                <span className={styles.listSubtitle}>158 captures • $31.2k</span>
              </div>
              <span className={styles.statusTag}>Synced</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>CloudPayments</span>
                <span className={styles.listSubtitle}>84 captures • $14.7k</span>
              </div>
              <span className={styles.statusTag}>Synced</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Paymaster</span>
                <span className={styles.listSubtitle}>42 captures • $8.3k</span>
              </div>
              <span className={styles.statusTag}>Review</span>
            </div>
          </div>
        </article>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Payout registry</h2>
            <span className="badge">Draft</span>
          </div>
          <div className={styles.list}>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Batch #992</span>
                <span className={styles.listSubtitle}>42 merchants • $18.2k</span>
              </div>
              <span className={styles.statusTag}>Ready</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>Batch #991</span>
                <span className={styles.listSubtitle}>38 merchants • $16.4k</span>
              </div>
              <span className={styles.statusTag}>Paid</span>
            </div>
          </div>
          <div className={styles.helperNote}>
            Reconcile before releasing payouts to avoid balance gaps.
          </div>
        </article>
      </section>
    </>
  );
}
