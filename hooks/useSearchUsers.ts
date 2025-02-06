import React from 'react';
import { useRouter } from 'next/router';

export const useSearchUsers = () => {
    const router = useRouter();
    const { q, page } = router.query;
    const [currentQuery, setCurrentQuery] = React.useState<string>("");
    const [dataResponse, setDataResponse] = React.useState<GitHubSearchResponse>({
        items: [],
        total_count: 0,
        incomplete_results: false,
    });
    const [error, setError] = React.useState<string | null>(null);

    const handleSearchUsers = React.useCallback(async (query: string, page: string) => {
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}`);

            const data: GitHubSearchResponse | GitHubError = await response.json();
            if (!response.ok) {
                setDataResponse({
                    items: [],
                    total_count: 0,
                    incomplete_results: false,
                });
                setError((data as GitHubError).message);
                return
            }
            setDataResponse(data as GitHubSearchResponse);
            router.push(`/?q=${query}&page=${page}`);
        } catch (error) {
            setError(error as string);
        }
    }, [router]);

    const handlePagination = React.useCallback(async (page: number) => {
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${q}&page=${page}`);
            const data: GitHubSearchResponse = await response.json();
            if (!response.ok) {
                setDataResponse({
                    items: [],
                    total_count: 0,
                    incomplete_results: false,
                });
                setError((data as GitHubError).message);
                return
            }
            setDataResponse(data);
            router.push(`/?q=${q}&page=${page}`);
        } catch (error) {
            setError(error as string);
        }
    }, [router, q]);

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
            handleSearchUsers(q as string, page as string);
            setCurrentQuery(q as string);
        }
    }, [initUsersCall, q, handleSearchUsers, currentQuery, page]);

    return { data: dataResponse, handleSearchUsers, handlePagination, error, page };
};