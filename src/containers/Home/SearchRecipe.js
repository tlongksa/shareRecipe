import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/svg-icons/search';
import Input from '../../components/common/Input/Input';

const SearchRecipe = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const navigate = useNavigate();
    return (
        <div className="position-absolute top-30 w-100">
            <div className="mw-60-pc mx-auto">
                <h1 className="text-white mb-4">Hãy bắt đầu nấu ăn với các công thức phổ biến.</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (searchTitle) {
                            navigate(`/list-recipe-by-name?name=${searchTitle.trim()}`);
                            window.scrollTo({
                                left: 0,
                                top: 600,
                            });
                        }
                    }}
                    className="d-flex"
                >
                    <Input
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        placeholder="Bạn muốn tìm kiếm gì hôm nay?"
                        containerNoMarginBottom
                        className="flex-fill"
                    />
                    <button type="submit" className="button button-sm button-green">
                        <SearchIcon fill="#fff" /> Tìm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchRecipe;
