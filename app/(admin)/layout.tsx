import Sidebar from "../../components/Sidebar";
import AuthGate from "../../components/AuthGate";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <div className={styles.adminShell}>
        <aside className={styles.sidebarArea}>
          <Sidebar />
        </aside>
        <div className={styles.mainArea}>
          <header className={`${styles.header} card`}>
            <div>
              <span className="badge">Admin</span>
              <h2>Marketplace control</h2>
            </div>
            <div className={styles.headerMeta}>
              <span className={styles.metaLabel}>Environment</span>
              <strong>Staging UI</strong>
            </div>
          </header>
          <main className={`${styles.content} page-enter`}>{children}</main>
        </div>
      </div>
    </AuthGate>
  );
}
