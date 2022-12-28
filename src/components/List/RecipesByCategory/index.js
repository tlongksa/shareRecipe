import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IMAGE_PLACEHODLER_URI } from '../../../constants';
import AuthContext from '../../../context/auth-context';
import RecipeContext from '../../../context/recipe-context';
import Input from '../../common/Input/Input';
import './index.scss';
import starImgIcon from '../../../assets/img/star.png';
import Paginator from '../../common/Paginator';
// import { HomeBannerCarousel } from '../../../containers/Home/HomePage';
import ListCategory from '../listCategory';

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
                    <p>{item.describe}</p>
                </div>
                <p className="d-flex align-items-center gap-1 mb-2">
                    <strong>By {item.verifier}</strong>
                    <span className="text-muted">{item.createDate}</span>
                </p>
                {item.avgStarRate === 0 ? (
                    <p>Chưa có đánh giá</p>
                ) : (
                    <div className="d-flex align-items-center gap-2">
                        Đánh giá công thức : {item.avgStarRate} <img src={starImgIcon} alt="" />
                    </div>
                )}
            </div>
        </div>
    </li>
);

const RecipesByCategory = () => {
    const {
        list,
        isLoading,
        error,
        onFetchMoreByCategory,
        extraListInfo,
        // , categories
    } = useContext(RecipeContext);
    const [search, setSearch] = useState('');
    const { id } = useParams();
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const isAuthenticated = !!accessToken;
    // const [category, setCategory] = useState('');

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
        <div className="background-chef pt-4">
            <section className="recipes-by__category-container">
                <div className="custom-page__container custom-page__container-no__margin-top">
                    <ListCategory />
                    <div className="d-flex gap-3 justify-content-end align-items-center mb-4">
                        {/* <Input
                            type="select"
                            onChange={(e) => {
                                setCategory(e.target.value);
                                if (!e.target.value) {
                                    onFetchMoreByCategory(id, 1, '');
                                    return;
                                }
                                onFetchMoreByCategory(e.target.value, 1, search);
                            }}
                            value={category}
                            error={''}
                            touched={true}
                            containerNoMarginBottom
                            className={`flex-fill`}
                        >
                            <option value="">Thể loại công thức</option>
                            {categories.list?.map((value) => (
                                <option value={value.dishCategoryID} key={value.dishCategoryID}>
                                    {value.name}
                                </option>
                            ))}
                        </Input> */}
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
                    <Paginator
                        isLoading={isLoading}
                        maxPage={extraListInfo.numOfPages}
                        curPage={extraListInfo.pageIndex}
                        scrollAfterClicking={false}
                        callback={(page) => onFetchMoreByCategory(id, page, search || '')}
                    />
                    {isLoading && (
                        <div className="global-list__loader-container">
                            <LoadingOutlined className="global-list__loader-icon" />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
export default RecipesByCategory;
