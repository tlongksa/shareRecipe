import { DislikeOutlined, LikeOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IMAGE_PLACEHODLER_URI } from '../../../constants';
import AuthContext from '../../../context/auth-context';
import RecipeContext from '../../../context/recipe-context';
import Input from '../../common/Input/Input';
import './index.scss';

export const RecipeByCategoryItem = ({ item, isAuthenticated }) => (
    <li className="recipe-list_item mb-4">
        <div className="d-flex gap-3">
            <img src={item.image || IMAGE_PLACEHODLER_URI} alt="" className="recipe-list_item-avatar" />
            <div className="bg-gray-custom flex-fill py-3 px-4 rounded-1">
                <div className="recipe-list_item-content">
                    <h5>
                        <Link
                            to={`/recipe-detail/${item.dishID}`}
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                })
                            }
                        >
                            {item.name}
                        </Link>
                    </h5>
                    <p>{item.description}</p>
                </div>
                <p className="d-flex align-items-center gap-1 mb-2">
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

const RecipesByCategory = () => {
    const { list, isLoading, error, onFetchMoreByCategory } = useContext(RecipeContext);
    const [search, setSearch] = useState('');
    const { id } = useParams();
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const isAuthenticated = !!accessToken;

    useEffect(() => {
        onFetchMoreByCategory(id, 1, '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
                            onFetchMoreByCategory(id, 1, search.trim());
                        }}
                    >
                        <SearchOutlined
                            className="global-list_search-icon cursor-pointer"
                            onClick={() => onFetchMoreByCategory(id, 1, search.trim())}
                        />
                        <Input
                            onChange={(e) => {
                                const { value } = e.target;
                                setSearch(value);
                                if (!value.trim()) {
                                    onFetchMoreByCategory(id, 1, '');
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
                    {list.map((item) => (
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
export default RecipesByCategory;
