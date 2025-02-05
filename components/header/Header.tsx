import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}  >
      <div className="header-content">
        <h1 className="text-title">
          <Link href="/" className={styles.link}>GitHub Users</Link>
        </h1>
      </div>
    </header>
  );
};