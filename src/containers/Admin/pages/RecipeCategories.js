import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import RecipeCategoryDatalist from '../../../components/admin/recipe-category-datalist';
import RecipeContext from '../../../context/recipe-context';

const RecipeCategories = () => {
    const { onFetchRecipeCategories, categories } = useContext(RecipeContext);

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {categories.isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <RecipeCategoryDatalist list={categories.list} />
        </>
    );
};

export default RecipeCategories;
