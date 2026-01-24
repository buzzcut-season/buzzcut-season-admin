"use client";

import { useCallback } from "react";
import styles from "./UserMenu.module.css";

const STORAGE_KEY = "buzzcut.auth";
const LOGOUT_URL = process.env.NEXT_PUBLIC_KEYCLOAK_LOGOUT_URL;
const AUTH_URL = process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_URL;

export default function UserMenu() {
  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const target = LOGOUT_URL || AUTH_URL;
    if (target) {
      window.location.replace(target);
    } else {
      window.location.reload();
    }
  }, []);

  return (
    <div className={styles.userMenu}>
      <div className={styles.avatar}>AU</div>
      <div className={styles.userInfo}>
        <span className={styles.userLabel}>Signed in</span>
        <strong className={styles.userName}>Admin User</strong>
        <span className={styles.userEmail}>admin@buzzcut-season.ru</span>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout} type="button">
        Log out
      </button>
    </div>
  );
}
