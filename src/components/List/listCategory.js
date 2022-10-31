import React, { useEffect, useRef, useContext } from 'react';
import './index.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipe-context';

const ListCategory = (props) => {
    const { onFetchRecipeCategories, categories } = useContext(RecipeContext);
    const errRef = useRef();

    useEffect(() => {
        onFetchRecipeCategories();
        errRef.current.focus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ShowCategory = () => {
        return (
            <>
                <div className="home-category-list__title">Catergory</div>
                <section className="view-container">
                    <p ref={errRef} className={categories?.error?.message ? 'errmsg' : 'offscreen'}>
                        {categories?.error?.message}
                    </p>
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
