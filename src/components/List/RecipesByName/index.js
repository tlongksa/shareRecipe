import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';
import RecipeContext from '../../../context/recipe-context';
import Input from '../../common/Input/Input';
import { RecipeByCategoryItem } from '../RecipesByCategory';
import './index.scss';

const RecipesByName = () => {
    const { recipeByNameList, isLoading, error, onFetchMoreByName } = useContext(RecipeContext);
    const [search, setSearch] = useState('');
    const [searchParams] = useSearchParams();
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const isAuthenticated = !!accessToken;
    const name = searchParams.get('name');

    useEffect(() => {
        onFetchMoreByName(name, 1, '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    if (!isLoading && error) {
        return (
            <section className="recipes-by__category-container">
                <div className="custom-page__container">
                    <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="recipes-by__category-container">
            <div className="custom-page__container">
                <div className="d-flex justify-content-end mb-4">
                    <form
                        className="global-list_search shadow rounded-3"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onFetchMoreByName(name, 1, search.trim());
                        }}
                    >
                        <SearchOutlined
                            className="global-list_search-icon cursor-pointer"
                            onClick={() => onFetchMoreByName(name, 1, search.trim())}
                        />
                        <Input
                            onChange={(e) => {
                                const { value } = e.target;
                                setSearch(value);
                                if (!value.trim()) {
                                    onFetchMoreByName(name, 1, '');
                                }
                            }}
                            placeholder="Tìm  kiếm công  thức ..."
                            value={search}
                            error={null}
                            touched={true}
                            containerNoMarginBottom
                            className="flex-fill"
                            inputClassName="border-0"
                        />
                    </form>
                </div>
                <div className="recipes-by__category-list">
                    {recipeByNameList.map((item) => (
                        <RecipeByCategoryItem item={item} key={item.dishID} isAuthenticated={isAuthenticated} />
                    ))}
                </div>
                {isLoading && (
                    <div className="global-list__loader-container">
                        <LoadingOutlined className="global-list__loader-icon" />
                    </div>
                )}
            </div>
        </section>
    );
};
export default RecipesByName;
