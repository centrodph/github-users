import React from 'react';
import styles from './UserList.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface UserListProps {
    users: GitHubUser[];
}

export const UserList = ({ users }: UserListProps) => {
    if (!users.length) {
        return (
            <div className={styles.emptyMessage}>
                <p>No users found</p>
            </div>
        );
    }

    return (
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
    );
};
