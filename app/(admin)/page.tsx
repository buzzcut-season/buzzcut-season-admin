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

      <section className={`${styles.grid} ${styles.cards}`}>
        <article className={`${styles.card} card`}>
          <h3>Categories</h3>
          <p>Review taxonomy structure and add new category branches.</p>
          <Link className={styles.cardAction} href="/categories">
            Open categories
          </Link>
        </article>
        <article className={`${styles.card} card`}>
          <h3>Exchange rates</h3>
          <p>Check last update status and trigger a new sync.</p>
          <Link className={styles.cardAction} href="/exchange-rates">
            Open rates
          </Link>
        </article>
        <article className={`${styles.card} card card-accent`}>
          <h3>Documentation</h3>
          <p>Keep internal notes and onboarding materials in one place.</p>
          <span className={styles.cardAction}>Coming soon</span>
        </article>
      </section>
    </>
  );
}
