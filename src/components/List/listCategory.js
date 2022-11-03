import React, { useEffect, useContext } from 'react';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipe-context';

const ListCategory = (props) => {
    const { onFetchRecipeCategories, categories } = useContext(RecipeContext);

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ShowCategory = () => {
        return (
            <>
                <div className="home-category-list__title">Catergory</div>
                <p className="error-message">{categories?.error?.message}</p>
                <section className="home__list-category__container">
                    {categories.list.map((list) => (
                        <Link key={list.dishCategoryID} to={`/list-recipe-by-category/${list.dishCategoryID}`}>
                            <div className="category-list__item">
                                <img className="view-img-category" src={list.dishCategoryImage} alt="img" />
                                <h5 className="recipe__category-name">{list.name}</h5>
                            </div>
                        </Link>
                    ))}
                </section>
            </>
        );
    };
    return (
        <div className="row">
            {categories.loading ? (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            ) : (
                <ShowCategory />
            )}
        </div>
    );
};
export default ListCategory;
