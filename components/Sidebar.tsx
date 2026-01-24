"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/exchange-rates", label: "Exchange rates" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={`${styles.sidebar} card`}>
      <div className={styles.brand}>
        <div className={styles.logo}>MA</div>
        <div>
          <p className={styles.brandTitle}>Marketplace</p>
          <p className={styles.brandSubtitle}>Admin panel</p>
        </div>
      </div>
      <div className={styles.nav}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={styles.linkDot} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className={styles.footer}>
        <div className={styles.footerCard}>
          <span className="badge">Draft</span>
          <p>Configure roles, settings, and integrations later.</p>
        </div>
      </div>
    </nav>
  );
}
