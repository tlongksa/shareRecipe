import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import RecipeReportCommentDataList from '../../../components/admin/recipe-report-comment-datalist';
import Input from '../../../components/common/Input/Input';
import RecipeContext from '../../../context/recipe-context';
import Modal from 'react-bootstrap/Modal';
import { approveRecipeCommentRequest, deleteRecipeCommentRequest } from '../../../api/requests';
import { notification } from 'antd';
import DeleteItemModal from '../../../components/common/DeleteItemModal';

const RecipeCommentReports = () => {
    const {
        recipeCommentReport: { list, isLoading, error, extraListInfo },
        onFetchMoreRecipeCommentReport,
        onRemoveRecipeCommentReport,
    } = useContext(RecipeContext);
    const [search, setSearch] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedApproveId, setSelectedApproveId] = useState('');
    const [selectedDeleteId, setSelectedDeleteId] = useState('');

    useEffect(() => {
        onFetchMoreRecipeCommentReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onApproveRecipeCommentHandler = () => {
        if (selectedApproveId) {
            setIsProcessing(true);
            approveRecipeCommentRequest(selectedApproveId)
                .then(({ data }) => {
                    setIsProcessing(false);
                    onRemoveRecipeCommentReport(selectedApproveId);
                    setSelectedApproveId('');
                    notification.open({
                        message: data?.messContent,
                    });
                    if (list.length === 0) {
                        onFetchMoreRecipeCommentReport(1);
                    }
                })
                .catch((err) => {
                    setIsProcessing(false);
                    console.log(err);
                });
        }
    };

    const onDeleteRecipeCommentHandler = () => {
        if (selectedDeleteId) {
            deleteRecipeCommentRequest(selectedDeleteId)
                .then(({ data }) => {
                    setIsProcessing(false);
                    onRemoveRecipeCommentReport(selectedDeleteId);
                    setSelectedDeleteId('');
                    notification.open({
                        message: data?.messContent,
                    });
                    if (list.length) {
                        onFetchMoreRecipeCommentReport(1);
                    }
                })
                .catch((err) => {
                    setIsProcessing(false);
                    console.log(err);
                });
        }
    };

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
    }

    return (
        <section className={`account-list__container ${isLoading ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-end mb-3 gap-3 sm:flex-col">
                <form
                    className="global-list_search shadow rounded-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (search.trim()) {
                            onFetchMoreRecipeCommentReport(1, search);
                        }
                    }}
                >
                    <SearchOutlined
                        className="global-list_search-icon cursor-pointer"
                        onClick={() => {
                            if (search.trim()) {
                                onFetchMoreRecipeCommentReport(1, search);
                            }
                        }}
                    />
                    <Input
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearch(value);
                            if (!value.trim()) {
                                onFetchMoreRecipeCommentReport(1, '');
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
            </div>
            <RecipeReportCommentDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMoreRecipeCommentReport(page);
                }}
                onEdit={(id) => setSelectedApproveId(id)}
                onDelete={(id) => setSelectedDeleteId(id)}
            />
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <Modal show={!!selectedApproveId} fullscreen={'md-down'} onHide={() => setSelectedApproveId('')}>
                <Modal.Header closeButton>
                    <Modal.Title>Bạn có muốn tiếp tục ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex gap-2 align-items-center py-3">
                        <button
                            className="button button-sm"
                            type="button"
                            disabled={isProcessing}
                            onClick={onApproveRecipeCommentHandler}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="button button-sm"
                            type="button"
                            disabled={isProcessing}
                            onClick={() => setSelectedApproveId('')}
                        >
                            Hủy
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <DeleteItemModal
                title="bình luận"
                show={!!selectedDeleteId}
                onHide={() => setSelectedDeleteId('')}
                isProcessing={isProcessing}
                onConfirm={onDeleteRecipeCommentHandler}
            />
        </section>
    );
};

export default RecipeCommentReports;
