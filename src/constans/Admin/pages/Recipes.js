import React, { useContext, useEffect } from 'react';
import RecipeDataList from '../../../components/admin/recipe-datalist';
import RecipeContext from '../../../context/recipe-context';

const Recipes = () => {
    const { adminRecipeList, isLoading, error, onAdminFetchMore, adminRecipeExtraListInfo } = useContext(RecipeContext);

    useEffect(() => {
        onAdminFetchMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className={`account-list__container ${isLoading ? 'divDisabled' : ''}`}>
            <RecipeDataList
                list={adminRecipeList}
                maxPage={adminRecipeExtraListInfo.numOfPages}
                currentPage={adminRecipeExtraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onAdminFetchMore(page);
                }}
            />
        </section>
    );
};

export default Recipes;
