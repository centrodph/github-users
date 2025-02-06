import Head from "next/head";
import { getLayout } from "@/components/layout/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import type { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import styles from "@/pages/user/Username.module.css";
import Image from 'next/image';
import { ToggleFavorite } from "@/components/toggleFavorite/ToggleFavorite";

export const getServerSideProps = (async (context: GetServerSidePropsContext<{ username: string }>) => {
    const { params } = context;
    if (!params?.username) {
        return { props: { user: null, username: null, error: "Username is required" } };
    }

    try {
        const res = await fetch(`https://api.github.com/users/${params.username}`);
        const user: UserDetails = await res.json();
        return { props: { user, username: params.username } };
    } catch (error) {
        return { props: { user: null, username: params.username, error: String(error) } };
    }
});

const UserPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ((props) => {
    const { error, user, username } = props;

    if (!user) {
        return <div className={styles.error}>User not found {username}: {String(error)}</div>;
    }
    return (
        <>
            <Head>
                <title>{user.name || user.login} | GitHub Users</title>
                <meta name="description" content={user.bio || `Perfil de GitHub de ${user.login}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div data-testid="user-page" className={styles.userPage}>
                <div className={styles.userHeader}>
                    <div className={styles.avatarContainer}>
                        <Image
                            src={user.avatar_url}
                            alt={`Avatar de ${user.login}`}
                            width={90}
                            height={90}
                            className={styles.avatar}
                        />
                    </div>
                    <div className={styles.userInfo}>
                        <h1 className={styles.name}>{user.name || user.login}</h1>
                        <p className={styles.username}>@{user.login}</p>
                        <ToggleFavorite username={user.login} />
                    </div>
                </div>

                <div className={styles.userDetails}>
                    {user.bio && <p className={styles.bio}>
                        <span className={styles.bioTitle}>Bio: </span>
                        {user.bio}
                    </p>}

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>{user.public_repos}</span>
                            <span className={styles.statLabel}>Repositorios</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>{user.followers}</span>
                            <span className={styles.statLabel}>Seguidores</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>{user.following}</span>
                            <span className={styles.statLabel}>Siguiendo</span>
                        </div>
                    </div>

                    <div className={styles.additionalInfo}>
                        {user.company && (
                            <p className={styles.infoItem}>
                                Company: {user.company}
                            </p>
                        )}
                        {user.location && (
                            <p className={styles.infoItem}>
                                Location: {user.location}
                            </p>
                        )}
                        {user.blog && (
                            <p className={styles.infoItem}>
                                Blog: <a href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a>
                            </p>
                        )}
                        {user.twitter_username && (
                            <p className={styles.infoItem}>
                                Twitter: <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">@{user.twitter_username}</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});

UserPage.getLayout = getLayout;

export default UserPage;