import { LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect } from 'react';
import { deleteCategoryRequest } from '../../../api/requests';
import RecipeCategoryDatalist from '../../../components/admin/recipe-category-datalist';
import RecipeContext from '../../../context/recipe-context';

const RecipeCategories = () => {
    const { onFetchRecipeCategories, categories, onRemoveCategoryFromList } = useContext(RecipeContext);

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDeleteCategoryHandler = (id) => {
        deleteCategoryRequest(id)
            .then(({ data }) => {
                notification.open({
                    message: data?.messContent,
                });
                onRemoveCategoryFromList(id);
                if (categories.list.length === 0) {
                    onFetchRecipeCategories();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <RecipeCategoryDatalist list={categories.list} onDelete={onDeleteCategoryHandler} />
            {categories.isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
        </>
    );
};

export default RecipeCategories;
