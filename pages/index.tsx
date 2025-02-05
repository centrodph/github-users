import Head from "next/head";

import styles from "@/styles/Home.module.css";
import { getLayout } from "@/components/layout/Layout";
import { NextPageWithLayout } from "./_app";


const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>GitHub Users</title>
        <meta name="description" content="GitHub Users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div >
        SEARCH
      </div>
    </>
  )
}

HomePage.getLayout = getLayout;

export default HomePage;