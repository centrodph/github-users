import React, { FormEvent } from 'react';
import styles from './SearchForm.module.css';

interface SearchFormProps {
    onSearch: (query: string) => void;
    defaultQuery?: string;
}

export const SearchForm = (props: SearchFormProps) => {
    const { onSearch, defaultQuery } = props;

    const handleSubmit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get('query') as string;
        onSearch(query);
    }, [onSearch]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                name="query"
                placeholder="Search users..."
                className={styles.input}
                defaultValue={defaultQuery}
            />
            <button
                type="submit"
                className={styles.button}
            >
                Search
            </button>
        </form>
    );
};