import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRecipeRequest } from '../../../api/requests';
import RecipeDataList from '../../../components/admin/recipe-datalist';
import Input from '../../../components/common/Input/Input';
import RecipeContext from '../../../context/recipe-context';

const Recipes = () => {
    const { adminRecipeList, isLoading, error, onAdminFetchMore, adminRecipeExtraListInfo } = useContext(RecipeContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        onAdminFetchMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteRecipeHandler = (id) => {
        setIsProcessing(true);
        deleteRecipeRequest(id)
            .then(({ data }) => {
                setIsProcessing(false);
                console.log(data);
                onAdminFetchMore(1);
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className={`account-list__container ${isLoading || isProcessing ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-end mb-3 gap-3 sm:flex-col">
                <form className="global-list_search shadow rounded-3">
                    <SearchOutlined className="global-list_search-icon" />
                    <Input
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        value={search}
                        error={null}
                        touched={true}
                        containerNoMarginBottom
                        className="flex-fill"
                        inputClassName="border-0"
                    />
                </form>
                <button
                    className="button button-sm d-flex align-items-center gap-2"
                    onClick={() => navigate('/admin/recipe-form?step=1')}
                >
                    <PlusCircleOutlined />
                    <span>Thêm công thức</span>
                </button>
            </div>
            <RecipeDataList
                list={adminRecipeList}
                maxPage={adminRecipeExtraListInfo.numOfPages}
                currentPage={adminRecipeExtraListInfo.pageIndex}
                onDelete={(id) => deleteRecipeHandler(id)}
                paginateCallback={(page) => {
                    onAdminFetchMore(page);
                }}
            />
        </section>
    );
};

export default Recipes;
