import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";


const NotFoundPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>404 - Page not found</title>
                <meta name="description" content="Page not found" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={styles.notFound}>
                    <h1>404 - Page not found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <Link href="/">Go to home</Link>
                </div>
            </main>
        </>
    )
}

export default NotFoundPage;