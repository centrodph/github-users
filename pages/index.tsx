import Head from "next/head";
import { getLayout } from "@/components/layout/Layout";
import { NextPageWithLayout } from "./_app";
import { SearchForm } from "@/components/search/SearchForm";
import { useSearchUsers } from "@/hooks/useSearchUsers";
import { UserList } from "@/components/user-list/UserList";


const HomePage: NextPageWithLayout = () => {
  const { handleSearchUsers, users } = useSearchUsers();
  return (
    <>
      <Head>
        <title>GitHub Users</title>
        <meta name="description" content="GitHub Users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div data-testid="home-page">
        <SearchForm onSearch={handleSearchUsers} />
        <UserList users={users} />
      </div>
    </>
  )
}

HomePage.getLayout = getLayout;

export default HomePage;