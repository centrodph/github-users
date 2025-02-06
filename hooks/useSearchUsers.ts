import React from 'react';
import { useRouter } from 'next/router';

export const useSearchUsers = () => {
    const router = useRouter();
    const { q } = router.query;
    const [currentQuery, setCurrentQuery] = React.useState<string>("");
    const [dataResponse, setDataResponse] = React.useState<GitHubSearchResponse>({
        items: [],
        total_count: 0,
        incomplete_results: false,
    });
    const [error, setError] = React.useState<string | null>(null);

    const handleSearchUsers = React.useCallback(async (query: string) => {
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${query}`);
            const data: GitHubSearchResponse = await response.json();
            setDataResponse(data);
            router.push(`/?q=${query}`);
        } catch (error) {
            setError(error as string);
        }
    }, [router]);

    const initUsersCall = React.useCallback(async () => {
        try {
            const response = await fetch(`https://api.github.com/users`);
            const data: GitHubUser[] = await response.json();
            setDataResponse({
                items: data,
                total_count: data.length,
                incomplete_results: false,
            });
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

    return { data: dataResponse, handleSearchUsers, error };
};