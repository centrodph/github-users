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


    const label = React.useMemo(() => {
        if (small) {
            return isFavorite ? '❤️' : '🤍';
        }
        return isFavorite ? 'Favorite' : 'Add to favorites';
    }, [small, isFavorite]);



    return (
        <button
            data-testid="toggle-favorite"
            data-username={username}
            onClick={toggleFavorite}
            className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ''} ${small ? styles.small : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            {label}
        </button>
    )
}