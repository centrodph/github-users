import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}  >
      <div className="header-content">
        <h1 className="text-title">GitHub Users</h1>
      </div>
    </header>
  );
};