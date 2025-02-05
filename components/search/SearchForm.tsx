import { useState, FormEvent } from 'react';

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Search
            </button>
        </form>
    );
};

export default SearchForm; 