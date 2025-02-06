import React from 'react';
import styles from './UserList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { ToggleFavorite } from '../toggleFavorite/ToggleFavorite';

interface UserListProps {
    data: GitHubSearchResponse;
}

export const UserList = ({ data }: UserListProps) => {
    const { items, total_count } = data;

    if (!data || !data.items || !data.items.length) {
        return (
            <div className={styles.emptyMessage}>
                <p>No users found</p>
            </div>
        );
    }

    return (
        <div className={styles.listContainer}>
            <ul className={styles.userGrid}>
                {items?.map((user) => (
                    <li
                        key={user.id}
                        className={styles.userCard}
                    >
                        <Image
                            src={user.avatar_url}
                            alt={`${user.login}'s avatar`}
                            className={styles.avatar}
                            width={100}
                            height={100}
                        />
                        <div data-testid="user-name">
                            <h2 className={styles.username}>{user.login}</h2>
                            <ToggleFavorite username={user.login} small />
                        </div>
                        <Link href={`/user/${user.login}`} className={styles.link}>View Profile</Link>
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <div className={styles.results}>Showing {items?.length} results of {total_count}</div>
                <div className={styles.paginationButtons}>
                    <button className={styles.paginationButton}>Previous</button>
                    <button className={styles.paginationButton}>Next</button>
                </div>
            </div>
        </div>
    );
};
