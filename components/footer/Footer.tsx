import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>

            <a
                href="https://github.com/centrodph"
                target="_blank"
                className={styles.link}
            >Gerardo Perrucci
            </a>
            <span>•</span>
            <a
                href="https://github.com/centrodph/github-users"
                target="_blank"
                className={styles.link}
            >
                Source code
            </a>
        </footer>
    );
};

