import React, { useState } from 'react';
import axios from 'axios';

export default function SearchBar() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState([]);
    // const [searchTitle, setSearchTitle] = useState("");

    const setSearchTitle = (value) => {
        axios
            .get(`/searchdishbyname/${value}`)

            .then((response) => {
                console.log(response.data);
                setName(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <div className="home_view-search-container">
            <input
                className="home_input-search"
                type="search"
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Tìm kiếm"
            />
            <button className="btn-search" type="submit">
                Tìm kiếm
            </button>
        </div>
    );
}
