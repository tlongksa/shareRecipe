import { LoadingOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteRecipeRequest } from '../../../api/requests';
import { ROLES } from '../../../App';
import RecipeDataList from '../../../components/admin/recipe-datalist';
import DeleteItemModal from '../../../components/common/DeleteItemModal';
import Input from '../../../components/common/Input/Input';
import AuthContext from '../../../context/auth-context';
import RecipeContext from '../../../context/recipe-context';

const IngredientReports = () => {
    const {
        ingReport: { error, extraListInfo, list, isLoading },
        onFetchMoreIngReport,
        onRemoveIngReportItemFromList,
    } = useContext(RecipeContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const {
        userInfo: { roles },
    } = useContext(AuthContext);
    const [selectedDeleteId, setSelectedDeleteId] = useState('');
    const isMod = roles === ROLES.mod;

    useEffect(() => {
        onFetchMoreIngReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteRecipeHandler = () => {
        setIsProcessing(true);
        deleteRecipeRequest(selectedDeleteId)
            .then(({ data }) => {
                setIsProcessing(false);
                onRemoveIngReportItemFromList(selectedDeleteId);
                notification.open({
                    message: data,
                });
                setSelectedDeleteId('');
                if (list.length === 0) {
                    onFetchMoreIngReport(1);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
    }

    return (
        <section className={`account-list__container ${isLoading || isProcessing ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-end mb-3 gap-3 sm:flex-col">
                <form
                    className="global-list_search shadow rounded-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (search.trim()) {
                            onFetchMoreIngReport(1, search);
                        }
                    }}
                >
                    <SearchOutlined
                        className="global-list_search-icon cursor-pointer"
                        onClick={() => {
                            if (search.trim()) {
                                onFetchMoreIngReport(1, search);
                            }
                        }}
                    />
                    <Input
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearch(value);
                            if (!value.trim()) {
                                onFetchMoreIngReport(1, '');
                            }
                        }}
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
                    className="button button-sm button-green d-flex align-items-center gap-2"
                    onClick={() => navigate('/admin/recipe-form?step=1')}
                >
                    <PlusCircleOutlined />
                    <span>Thêm cảnh báo</span>
                </button>
            </div>
            <RecipeDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                onDelete={(id) => setSelectedDeleteId(id)}
                paginateCallback={(page) => {
                    onFetchMoreIngReport(page, search || '');
                }}
                onEdit={(id) => {
                    if (isMod) {
                        navigate(`/recipe-form?step=1&id=${id}`);
                        return;
                    }
                    navigate(`/admin/recipe-form?step=1&id=${id}`);
                }}
                onView={
                    roles === ROLES.mod
                        ? (id) => {
                              navigate(`/recipe-detail/${id}`);
                              window.scrollTo({
                                  top: 0,
                                  left: 0,
                              });
                          }
                        : null
                }
            />
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <DeleteItemModal
                title="công thức"
                show={!!selectedDeleteId}
                onHide={() => setSelectedDeleteId('')}
                isProcessing={isProcessing}
                onConfirm={deleteRecipeHandler}
            />
        </section>
    );
};

export default IngredientReports;
