import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import RecipeReportCommentDataList from '../../../components/admin/recipe-report-comment-datalist';
import RecipeContext from '../../../context/recipe-context';

const RecipeCommentReports = () => {
    const {
        recipeCommentReport: { list, isLoading, error, extraListInfo },
        onFetchMoreRecipeCommentReport,
    } = useContext(RecipeContext);

    useEffect(() => {
        onFetchMoreRecipeCommentReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className={`account-list__container ${isLoading ? 'divDisabled' : ''}`}>
            <RecipeReportCommentDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMoreRecipeCommentReport(page);
                }}
            />
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
        </section>
    );
};

export default RecipeCommentReports;