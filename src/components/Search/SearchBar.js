import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [searchTitle, setSearchTitle] = useState('');
    const navigate = useNavigate();

    return (
        <div className="home_view-search-container">
            <input
                className="home_input-search"
                type="search"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Tìm kiếm"
            />
            <button
                className="button"
                type="button"
                onClick={() => navigate(`/list-recipe-by-name?name=${searchTitle.trim()}`)}
            >
                Tìm kiếm
            </button>
        </div>
    );
}
