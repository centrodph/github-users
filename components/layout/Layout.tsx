import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Roboto } from "next/font/google";
import styles from "./Layout.module.css";

const roboto = Roboto({
    variable: "--font-roboto",
    weight: ["400", "700"],
    subsets: ["latin"],
});

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className={`${styles.main} ${roboto.variable}`}>{children}</main>
            <Footer />
        </>
    )
}

export function getLayout(page: React.ReactNode) {
    return <Layout>{page}</Layout>;
};