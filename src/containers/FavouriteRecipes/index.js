import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeRecipeFromFavouriteList } from '../../api/requests';
import Paginator from '../../components/common/Paginator';
import { IMAGE_PLACEHODLER_URI } from '../../constants';
import RecipeContext from '../../context/recipe-context';
import { SearchDataList } from '../Page/Blogs';
import './index.scss';
import starImgIcon from '../../assets/img/star.png';

const FavouriteRecipes = () => {
    const {
        favouriteRecipeList,
        isLoading,
        error,
        onFetchFavouriteMore,
        favouriteRecipeExtraListInfo,
        onRemoveItemFromFavouriteList,
    } = useContext(RecipeContext);
    const [search, setSearch] = useState('');

    useEffect(() => {
        onFetchFavouriteMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRemoveRecipeHandler = (id) => {
        removeRecipeFromFavouriteList(id)
            .then(({ data }) => {
                notification.open({
                    message: data?.messContent,
                });
                onRemoveItemFromFavouriteList(id);
                if (favouriteRecipeList.length === 0) {
                    onFetchFavouriteMore(1);
                }
            })
            .catch((err) => console.log(err));
    };

    if (!isLoading && error) {
        return (
            <section className="mh-85vh">
                <div className="custom-page__container">
                    <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>
                </div>
            </section>
        );
    }

    return (
        <div className="background-recipe">
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
                    {!isLoading && !error && favouriteRecipeList.length === 0 && (
                        <p className="f-24 text-center">Bạn chưa có thêm món ăn yêu thích nào</p>
                    )}
                    <ul className="mt-4">
                        {favouriteRecipeList?.map((item, index) => (
                            <li className="global-recipe__list-item mb-4" key={item.dishId + index}>
                                <div className="d-flex gap-3">
                                    <img
                                        src={item?.urlImage || IMAGE_PLACEHODLER_URI}
                                        alt=""
                                        className="rounded-2 recipe-list_item-avatar"
                                    />
                                    <div className="bg-green-blur flex-fill py-3 px-4 rounded-1 position-relative global-recipe__list-item-info">
                                        <div className="recipe-list_item-content mb-2">
                                            <h5>
                                                <Link
                                                    to={`/recipe-detail/${item.dishId}`}
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
                                            <p>{item.describe}</p>
                                            <div className="d-flex align-items-center gap-3">
                                                <strong>By {item.verifier}</strong>
                                                <span className="text-muted">{item?.createDate || '-'}</span>
                                            </div>
                                            {item.avgStarRate === 0 ? (
                                                <p>Chưa có đánh giá</p>
                                            ) : (
                                                <div className="d-flex align-items-center gap-2">
                                                    Đánh giá công thức : {item.avgStarRate}{' '}
                                                    <img src={starImgIcon} alt="" />
                                                </div>
                                            )}
                                        </div>
                                        <div className={`recipe-list_item-actions position-absolute top-1 right-1`}>
                                            <button onClick={() => onRemoveRecipeHandler(item.dishId)}>
                                                <DeleteOutlined />
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
        </div>
    );
};

export default FavouriteRecipes;
