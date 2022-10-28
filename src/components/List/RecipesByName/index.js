import { DislikeOutlined, LikeOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import RecipeContext from '../../../context/recipe-context';
import Input from '../../common/Input/Input';
import './index.scss';

const RecipeByCategoryItem = ({ item, isAuthenticated }) => (
    <li className="recipe-list_item mb-4">
        <div className="d-flex gap-3">
            <img
                src={
                    item.image ||
                    'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                }
                alt=""
                className="recipe-list_item-avatar"
            />
            <div className="bg-gray flex-fill py-3 px-4 rounded-1">
                <div className="recipe-list_item-content">
                    <h5>
                        <Link to={`/recipes/${item.recipeID}`}>{item.name}</Link>
                    </h5>
                    <p>{item.description}</p>
                </div>
                <p className="d-flex align-items-center gap-1">
                    <strong>By {item.verifier}</strong>
                    <span className="text-muted">{item.createDate}</span>
                </p>
                <div
                    className={`recipe-list_item-actions d-flex gap-3 align-items-center ${
                        isAuthenticated ? '' : 'divDisabled'
                    }`}
                >
                    <button>
                        <LikeOutlined />
                        <span>{item.totalLike}</span>
                    </button>
                    <button>
                        <DislikeOutlined />
                        <span>{item.totalDisLike}</span>
                    </button>
                </div>
            </div>
        </div>
    </li>
);

const RecipesByName = () => {
    const { recipeByNameList, isLoading, error, onFetchMoreByName } = useContext(RecipeContext);
    const [search, setSearch] = useState('');
    const [searchParams] = useSearchParams();
    const isAuthenticated = !!localStorage.getItem('token');

    const name = searchParams.get('name');

    useEffect(() => {
        onFetchMoreByName(name, 1, search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong</p>;
    }
    return (
        <section className="recipes-by__category-container">
            <div className="custom-page__container">
                <div className="d-flex justify-content-end mb-4">
                    <form className="global-list_search shadow rounded-3">
                        <SearchOutlined className="global-list_search-icon" />
                        <Input
                            onChange={(e) => setSearch(e.target.value)}
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
