import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RecipeContext from '../../../context/recipe-context';
import Input from '../../common/Input/Input';
import ListCategory from '../listCategory';
import HomeRecipeItem from '../HomeRecipeItem';
import './index.scss';
import { HomeBannerCarousel } from '../../../containers/Home/HomePage';

const RecipesByName = () => {
    const { recipeByNameList, isLoading, error, onFetchMoreByName } = useContext(RecipeContext);
    const [search, setSearch] = useState('');
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const navigate = useNavigate();

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
            <HomeBannerCarousel />
            <div className="custom-page__container">
                <ListCategory />
                <div className="d-flex justify-content-between align-items-center mb-4 mt-5 should-stack-on-mobile">
                    <p className="search-result__text">
                        {recipeByNameList.length} kết quả tìm kiếm cho “{name}”
                    </p>
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
                <div className="home__list-recipe__container">
                    {recipeByNameList.map((item) => (
                        <HomeRecipeItem item={item} key={item.dishID} navigateTo={navigate} />
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
