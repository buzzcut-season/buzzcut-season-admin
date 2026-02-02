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
              <div className={styles.headerText}>
                <h2>Buzzcut Season Marketplace</h2>
                <p className={styles.headerSubtitle}>Admin console</p>
              </div>
            </div>
            <div className={styles.headerRight}>
              <UserMenu />
            </div>
        </header>
        <main className={`${styles.content} page-enter`}>{children}</main>
      </div>
    </div>
  );
}
