import Link from "next/link";
import styles from "./AdminPage.module.css";

export default function DashboardPage() {
  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Home</span>
          <h1>Overview</h1>
          <p>
            Quick access to core areas. This dashboard is a UI-only skeleton with
            placeholder metrics.
          </p>
        </div>
      </section>

      <section className={`${styles.grid} ${styles.statGrid}`}>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Orders today</span>
          <strong className={styles.statValue}>128</strong>
          <span className={styles.statDelta}>+12% vs yesterday</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Active listings</span>
          <strong className={styles.statValue}>2,412</strong>
          <span className={styles.statDelta}>+38 new</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Pending approvals</span>
          <strong className={styles.statValue}>14</strong>
          <span className={styles.statDelta}>2 urgent</span>
        </article>
        <article className={`${styles.statCard} card`}>
          <span className={styles.statLabel}>Support tickets</span>
          <strong className={styles.statValue}>9</strong>
          <span className={styles.statDelta}>-3 since last week</span>
        </article>
      </section>

      <section className={`${styles.grid} ${styles.cards}`}>
        <article className={`${styles.card} card`}>
          <h3>Categories</h3>
          <p>Review taxonomy structure and add new category branches.</p>
          <Link className={styles.cardAction} href="/categories">
            Open categories
          </Link>
        </article>
        <article className={`${styles.card} card`}>
          <h3>Orders</h3>
          <p>Track fulfillment, refunds, and cancellations.</p>
          <Link className={styles.cardAction} href="/orders">
            Open orders
          </Link>
        </article>
        <article className={`${styles.card} card`}>
          <h3>Payments</h3>
          <p>Monitor settlements, fees, and payout batches.</p>
          <Link className={styles.cardAction} href="/payments">
            Open payments
          </Link>
        </article>
        <article className={`${styles.card} card`}>
          <h3>Exchange rates</h3>
          <p>Check last update status and trigger a new sync.</p>
          <Link className={styles.cardAction} href="/exchange-rates">
            Open rates
          </Link>
        </article>
        <article className={`${styles.card} card`}>
          <h3>Support</h3>
          <p>Manage tickets, escalations, and templates.</p>
          <Link className={styles.cardAction} href="/support">
            Open support
          </Link>
        </article>
      </section>

      <section className={`${styles.grid} ${styles.twoColumn}`}>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Quick actions</h2>
            <span className="badge">Ops</span>
          </div>
          <div className={styles.actionStrip}>
            <button className={styles.actionButtonPrimary} type="button">
              Add product
            </button>
            <button className={styles.actionButton} type="button">
              Review listings
            </button>
            <button className={styles.actionButton} type="button">
              Issue refund
            </button>
            <button className={styles.actionButton} type="button">
              Send promo
            </button>
          </div>
        </article>
        <article className={`${styles.panel} card`}>
          <div className={styles.panelHeader}>
            <h2>Recent activity</h2>
            <span className="badge">Live</span>
          </div>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityMeta}>
                <span className={styles.activityTitle}>New seller onboarded</span>
                <span className={styles.activityTime}>2 minutes ago</span>
              </div>
              <span className={styles.statusTag}>Approved</span>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityMeta}>
                <span className={styles.activityTitle}>Rate sync finished</span>
                <span className={styles.activityTime}>18 minutes ago</span>
              </div>
              <span className={styles.statusTag}>Synced</span>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityMeta}>
                <span className={styles.activityTitle}>Flagged listing review</span>
                <span className={styles.activityTime}>1 hour ago</span>
              </div>
              <span className={styles.statusTag}>Pending</span>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
