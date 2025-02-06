import React from 'react';
import styles from './UserList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { ToggleFavorite } from '../toggleFavorite/ToggleFavorite';

interface UserListProps {
    data: GitHubSearchResponse;
    page: number;
    handlePagination: (page: number) => void;
}

export const UserList = ({ data, page, handlePagination }: UserListProps) => {
    const { items, total_count } = data;

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
                <div className={styles.results}>Page {page + 1} of {Math.ceil(total_count! / 30)}</div>
                <div className={styles.paginationButtons}>
                    <button className={styles.paginationButton} onClick={() => handlePagination(page - 1)}>Previous</button>
                    <button className={styles.paginationButton} onClick={() => handlePagination(page + 1)}>Next</button>
                </div>
            </div>
        </div>
    );
};
