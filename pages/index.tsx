import Head from "next/head";
import { getLayout } from "@/components/layout/Layout";
import { NextPageWithLayout } from "./_app";
import { SearchForm } from "@/components/search/SearchForm";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { UserList } from "@/components/user-list/UserList";
import styles from "@/styles/Home.module.css";

const HomePage: NextPageWithLayout = () => {
  const { handleSearchUsers, data, error, handlePagination, page } = useSearchUsers();
  return (
    <>
      <Head>
        <title>GitHub Users</title>
        <meta name="description" content="GitHub Users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div data-testid="home-page" className={styles.homePage}>
        <SearchForm onSearch={handleSearchUsers} />

        {error ? <div className={styles.error}>{error}</div> : (
          <UserList data={data!} page={Number(page || 0)} handlePagination={handlePagination} />
        )}
      </div>
    </>
  )
}

HomePage.getLayout = getLayout;

export default HomePage;