import { useState, useEffect } from 'react';

export const useLocalFavorite = () => {
    const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
        const username = ev.currentTarget.dataset.username;
        if (!username) return;
        setFavorites((currentFavorites) => {
            if (currentFavorites.includes(username)) {
                return currentFavorites.filter((name) => name !== username);
            }
            return [...currentFavorites, username];
        });
    };

    return {
        favorites,
        toggleFavorite,
    };
};
