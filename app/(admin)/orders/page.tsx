import styles from "../AdminPage.module.css";

export default function OrdersPage() {
  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Orders</span>
          <h1>Order control</h1>
          <p>Monitor statuses, issue partial refunds, and resolve cancellations.</p>
        </div>
      </section>

      <section className={`${styles.grid} ${styles.statGrid}`}>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Pending</span>
          <strong className={styles.statValue}>42</strong>
          <span className={styles.statDelta}>Queue stabilizing</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Fulfilled today</span>
          <strong className={styles.statValue}>96</strong>
          <span className={styles.statDelta}>On track</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Refund requests</span>
          <strong className={styles.statValue}>8</strong>
          <span className={styles.statDelta}>2 partial</span>
        </article>
      </section>

      <section className={`${styles.grid} ${styles.twoColumn}`}>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Order pipeline</h2>
            <span className="badge">Live</span>
          </div>
          <div className={styles.list}>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>#42318</span>
                <span className={styles.listSubtitle}>Awaiting payment confirmation</span>
              </div>
              <span className={styles.statusTag}>Pending</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>#42301</span>
                <span className={styles.listSubtitle}>Partial refund requested</span>
              </div>
              <span className={styles.statusTag}>Review</span>
            </div>
            <div className={styles.listRow}>
              <div className={styles.listMeta}>
                <span className={styles.listTitle}>#42277</span>
                <span className={styles.listSubtitle}>Shipped, awaiting delivery</span>
              </div>
              <span className={styles.statusTag}>In transit</span>
            </div>
          </div>
        </article>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Actions</h2>
            <span className="badge">Ops</span>
          </div>
          <div className={styles.actionStrip}>
            <button className={styles.actionButtonPrimary} type="button">
              Create return
            </button>
            <button className={styles.actionButton} type="button">
              Issue partial refund
            </button>
            <button className={styles.actionButton} type="button">
              Cancel order
            </button>
          </div>
          <div className={styles.helperNote}>
            Refunds are logged automatically once payments are reconciled.
          </div>
        </article>
      </section>
    </>
  );
}
