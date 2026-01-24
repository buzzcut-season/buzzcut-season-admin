"use client";

import styles from "./UserMenu.module.css";

export default function UserMenu() {
  return (
    <div className={styles.userMenu}>
      <div className={styles.userInfo}>
        <strong className={styles.userName}>Admin User</strong>
        <span className={styles.userEmail}>admin@buzzcut-season.ru</span>
      </div>
      <button
        className={styles.logoutButton}
        onClick={() => {
          window.location.href = "/api/auth/logout";
        }}
        type="button"
      >
        Log out
      </button>
    </div>
  );
}
