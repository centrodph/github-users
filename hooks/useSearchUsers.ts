import React from 'react';
import { useRouter } from 'next/router';



export const useSearchUsers = () => {
    const router = useRouter();
    const [users, setUsers] = React.useState<GitHubUser[]>([]);


    const handleSearchUsers = async (query: string) => {
        const response = await fetch(`https://api.github.com/search/users?q=${query}`);
        const data = await response.json();
        setUsers(data.items);
        router.push(`/?q=${query}`);
    };

    const initUsersCall = React.useCallback(async () => {
        const response = await fetch(`https://api.github.com/users`);
        const data = await response.json();
        setUsers(data);
    }, []);



    React.useEffect(() => {
        initUsersCall();
    }, []);


    return React.useMemo(() => ({ users, handleSearchUsers }), [users, handleSearchUsers]);
};