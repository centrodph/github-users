'use client'

import React from "react";
import { useLocalFavorite } from "@/hooks/useLocalFavorite";
import styles from "./ToggleFavorite.module.css";
export const ToggleFavorite = ({ username }: { username: string }) => {
    const { favorites, toggleFavorite } = useLocalFavorite();
    const isFavorite = React.useMemo(() => favorites.includes(username), [favorites, username]);
    return (
        <button
            data-testid="toggle-favorite"
            data-username={username}
            onClick={toggleFavorite}
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''}`}
        >
            {isFavorite ? 'Favorite' : 'Add to favorites'}
        </button>
    )
}