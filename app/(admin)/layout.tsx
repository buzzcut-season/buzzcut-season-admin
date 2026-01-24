import Sidebar from "../../components/Sidebar";
import UserMenu from "../../components/UserMenu";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebarArea}>
        <Sidebar />
      </aside>
      <div className={styles.mainArea}>
          <header className={`${styles.header} card`}>
            <div className={styles.headerTitle}>
              <span className={styles.headerBadge}>Admin</span>
              <h2>Marketplace control</h2>
            </div>
          <div className={styles.headerRight}>
            <div className={styles.headerMeta}>
              <span className={styles.metaLabel}>Environment</span>
              <strong>Staging UI</strong>
            </div>
            <UserMenu />
          </div>
        </header>
        <main className={`${styles.content} page-enter`}>{children}</main>
      </div>
    </div>
  );
}
