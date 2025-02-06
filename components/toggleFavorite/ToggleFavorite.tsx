'use client'

import React from "react";
import { useLocalFavorite } from "@/hooks/useLocalFavorite";
import styles from "./ToggleFavorite.module.css";

interface ToggleFavoriteProps {
    username: string;
    small?: boolean;
}

export const ToggleFavorite = ({ username, small }: ToggleFavoriteProps) => {
    const { favorites, toggleFavorite } = useLocalFavorite();
    const isFavorite = React.useMemo(() => favorites.includes(username), [favorites, username]);

    if (small) {
        return (
            <button
                data-testid="toggle-favorite"
                data-username={username}
                onClick={toggleFavorite}
                className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''} ${small ? styles.small : ''}`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
        )
    }



    return (
        <button
            data-testid="toggle-favorite"
            data-username={username}
            onClick={toggleFavorite}
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isFavorite ? 'Favorite' : 'Add to favorites'}
        </button>
    )
}