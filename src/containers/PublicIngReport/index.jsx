import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import IngredientReportDataList from '../../components/admin/ingredient-report-datalist';
import RecipeContext from '../../context/recipe-context';

const PublicIngReport = () => {
    const {
        ingReport: { error, extraListInfo, list, isLoading },
        onFetchMoreIngReport,
    } = useContext(RecipeContext);

    useEffect(() => {
        onFetchMoreIngReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="custom-page__container">
            <IngredientReportDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMoreIngReport(page, '');
                }}
                hideAdminActions
            />
            {!isLoading && error && <p className="error-message text-center">{error?.message || 'Lỗi xảy ra!'}</p>}
            {!isLoading && !error && list.length === 0 && (
                <p className="f-24 text-center">Chưa có quản lý cảnh báo nguyên liệu nào</p>
            )}
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
        </section>
    );
};

export default PublicIngReport;
