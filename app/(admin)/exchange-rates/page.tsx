import styles from "../AdminPage.module.css";
import ExchangeRatesClient from "./ExchangeRatesClient";

export default function ExchangeRatesPage() {
  return (
    <>
      <section className={`${styles.pageHeader} card`}>
        <div>
          <span className="badge">Exchange rates</span>
          <h1>Rates sync</h1>
          <p>
            Trigger manual updates and inspect the latest API response.
          </p>
        </div>
      </section>

      <ExchangeRatesClient />
    </>
  );
}
