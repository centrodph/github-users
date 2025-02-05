import React from 'react';
import styles from './UserList.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface UserListProps {
    users: GitHubUser[];
}

export const UserList = ({ users }: UserListProps) => {
    if (!users || !users.length) {
        return (
            <div className={styles.emptyMessage}>
                <p>No users found</p>
            </div>
        );
    }

    return (
        <div className={styles.listContainer}>
            <ul className={styles.userGrid}>
                {users.map((user) => (
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
                        </div>
                        <Link href={`/users/${user.login}`} className={styles.link}>View Profile</Link>
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <div className={styles.results}>Showing {users.length} results</div>
                <div className={styles.paginationButtons}>
                    <button className={styles.paginationButton}>Previous</button>
                    <button className={styles.paginationButton}>Next</button>
                </div>
            </div>
        </div>
    );
};
