import { DislikeOutlined, LikeOutlined, LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/common/Paginator';
import { IMAGE_PLACEHODLER_URI } from '../../constants';
import RecipeContext from '../../context/recipe-context';
import { SearchDataList } from '../Page/Blogs';

const FavouriteRecipes = () => {
    const { favouriteRecipeList, isLoading, error, onFetchFavouriteMore, favouriteRecipeExtraListInfo } =
        useContext(RecipeContext);
    const [search, setSearch] = useState('');

    useEffect(() => {
        onFetchFavouriteMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Something went wrong!'}</p>;
    }

    return (
        <section className="mh-85vh">
            <div className="custom-page__container">
                <div className="d-flex justify-content-end mb-3 gap-3">
                    <SearchDataList
                        search={search}
                        setSearch={setSearch}
                        callback={() => {
                            if (search.trim()) {
                                onFetchFavouriteMore(1, search);
                            }
                        }}
                        emptySearchCallback={() => onFetchFavouriteMore(1, '')}
                    />
                </div>
                <ul className="mt-4">
                    {favouriteRecipeList?.map((item, index) => (
                        <li className="global-recipe__list-item mb-4" key={item.dishId + index}>
                            <div className="d-flex gap-3">
                                <img
                                    src={item?.urlImage || IMAGE_PLACEHODLER_URI}
                                    alt=""
                                    className="rounded-circle recipe-list_item-avatar"
                                />
                                <div className="bg-gray-custom flex-fill py-3 px-4 rounded-1">
                                    <div className="recipe-list_item-content mb-2">
                                        <h5>
                                            <Link to={`/recipe-detail/${item.dishId}`}>{item.name}</Link>
                                        </h5>
                                        <p>{item.describe}</p>
                                        <p className="d-flex align-items-center gap-3">
                                            <strong>By {item.verifier}</strong>
                                            <span className="text-muted">{item?.createDate || '-'}</span>
                                        </p>
                                    </div>
                                    <div className={`recipe-list_item-actions d-flex gap-3 align-items-center`}>
                                        <button onClick={() => {}}>
                                            <LikeOutlined />
                                            <span>{item.totalLike}</span>
                                        </button>
                                        <button onClick={() => {}}>
                                            <DislikeOutlined />
                                            <span>{item.totalDisLike}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {isLoading && (
                    <div className="global-list__loader-container">
                        <LoadingOutlined className="global-list__loader-icon" />
                    </div>
                )}
                <Paginator
                    isLoading={isLoading}
                    maxPage={favouriteRecipeExtraListInfo.numOfPages}
                    curPage={favouriteRecipeExtraListInfo.pageIndex}
                    scrollAfterClicking={false}
                    callback={(page) => onFetchFavouriteMore(page, search || '')}
                />
            </div>
        </section>
    );
};

export default FavouriteRecipes;
