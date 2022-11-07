import React, { useEffect, useContext } from 'react';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipe-context';
import { useMediaQuery } from 'react-responsive';
import Slider from '../common/Slider';
import { showNumOfSlideBaseOnScreenSize } from '../../utils';

const ListCategory = (props) => {
    const { onFetchRecipeCategories, categories } = useContext(RecipeContext);
    const isSmallLaptop = useMediaQuery({ query: '(max-width: 1255px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 991px)' });
    const isSmallTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isExtraSmallTablet = useMediaQuery({ query: '(max-width: 630px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 465px)' });

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="row">
            {categories.loading ? (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            ) : (
                <>
                    <div className="home-category-list__title">Catergory</div>
                    <p className="error-message">{categories?.error?.message}</p>
                    <Slider
                        slidesToShow={showNumOfSlideBaseOnScreenSize(
                            isMobile,
                            isExtraSmallTablet,
                            isSmallTablet,
                            isTablet,
                            isSmallLaptop,
                        )}
                    >
                        {categories.list.map((list) => (
                            <Link key={list.dishCategoryID} to={`/list-recipe-by-category/${list.dishCategoryID}`}>
                                <div className="category-list__item">
                                    <img className="view-img-category" src={list.dishCategoryImage} alt="img" />
                                    <h5 className="recipe__category-name">{list.name}</h5>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </>
            )}
        </div>
    );
};
export default ListCategory;
