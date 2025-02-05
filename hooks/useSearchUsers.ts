import React from 'react';
import { useRouter } from 'next/router';

export const useSearchUsers = () => {
    const router = useRouter();
    const { q } = router.query;
    const [currentQuery, setCurrentQuery] = React.useState<string>("");
    const [users, setUsers] = React.useState<GitHubUser[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const handleSearchUsers = React.useCallback(async (query: string) => {
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${query}`);
            const data = await response.json();
            setUsers(data.items);
            router.push(`/?q=${query}`);
        } catch (error) {
            setError(error as string);
        }
    }, [router]);

    const initUsersCall = React.useCallback(async () => {
        try {
            const response = await fetch(`https://api.github.com/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error as string);
        }
    }, []);

    React.useEffect(() => {
        if (!q) {
            initUsersCall();
        } else if (q && q !== currentQuery) {
            handleSearchUsers(q as string);
            setCurrentQuery(q as string);
        }
    }, [initUsersCall, q, handleSearchUsers, currentQuery]);

    return { users, handleSearchUsers, error };
};