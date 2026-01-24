import styles from "../AdminPage.module.css";

export default function ExchangeRatesPage() {
  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Exchange rates</span>
          <h1>Rates sync</h1>
          <p>
            Trigger manual updates and watch placeholder logs until the API is
            connected.
          </p>
        </div>
      </section>

      <section className={`${styles.panel} card`}>
        <div className={styles.panelHeader}>
          <h2>Latest status</h2>
          <button className="btn btn-primary" type="button">
            Update rates
          </button>
        </div>
        <div className={`${styles.logBox} card`}>
          <strong>Log output</strong>
          <span>Awaiting first manual sync...</span>
          <span>Last check: --</span>
        </div>
      </section>
    </>
  );
}
