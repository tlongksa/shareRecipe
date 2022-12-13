import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { approveBlogCommentRequest, deleteBlogCommentRequest } from '../../../api/requests';
import BlogReportCommentDataList from '../../../components/admin/blog-report-comment-datalist';
import Input from '../../../components/common/Input/Input';
import BlogContext from '../../../context/blog-context';
import Modal from 'react-bootstrap/Modal';
import { notification } from 'antd';
import DeleteItemModal from '../../../components/common/DeleteItemModal';

const BlogCommentReports = () => {
    const {
        blogCommentReport: { list, isLoading, error, extraListInfo },
        onFetchMoreBlogCommentReport,
        onRemoveBlogCommentReport,
    } = useContext(BlogContext);
    const [search, setSearch] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedApproveId, setSelectedApproveId] = useState('');
    const [selectedDeleteId, setSelectedDeleteId] = useState('');

    useEffect(() => {
        onFetchMoreBlogCommentReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onApproveBlogCommentHandler = () => {
        if (selectedApproveId) {
            setIsProcessing(true);
            approveBlogCommentRequest(selectedApproveId)
                .then(({ data }) => {
                    onRemoveBlogCommentReport(selectedApproveId);
                    setIsProcessing(false);
                    notification.open({
                        message: data?.messContent,
                    });
                    setSelectedApproveId('');
                    if (list.length === 0) {
                        onFetchMoreBlogCommentReport(1);
                    }
                })
                .catch((err) => {
                    setIsProcessing(false);
                    console.log(err);
                });
        }
    };

    const onDeleteBlogCommentHandler = () => {
        if (selectedDeleteId) {
            deleteBlogCommentRequest(selectedDeleteId)
                .then(({ data }) => {
                    onRemoveBlogCommentReport(selectedDeleteId);
                    setIsProcessing(false);
                    notification.open({
                        message: data?.messContent,
                    });
                    setSelectedDeleteId('');
                    if (list.length === 0) {
                        onFetchMoreBlogCommentReport(1);
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
        <section className={`account-list__container pb-3 ${isLoading || isProcessing ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-3 gap-3 sm:flex-col">
                <h3 className="mb-0">Quản lí report bình luận blog</h3>
                <form
                    className="global-list_search shadow rounded-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (search.trim()) {
                            onFetchMoreBlogCommentReport(1, search);
                        }
                    }}
                >
                    <SearchOutlined
                        className="global-list_search-icon cursor-pointer"
                        onClick={() => {
                            if (search.trim()) {
                                onFetchMoreBlogCommentReport(1, search);
                            }
                        }}
                    />
                    <Input
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearch(value);
                            if (!value.trim()) {
                                onFetchMoreBlogCommentReport(1, '');
                            }
                        }}
                        placeholder="Tìm kiếm..."
                        value={search}
                        error={null}
                        touched={true}
                        containerNoMarginBottom
                        className="flex-fill"
                        inputClassName="border-0"
                    />
                </form>
            </div>
            <BlogReportCommentDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMoreBlogCommentReport(page, search || '');
                }}
                onEdit={(id) => setSelectedApproveId(id)}
                onDelete={(id) => setSelectedDeleteId(id)}
            />
            {!isLoading && !error && list.length === 0 && (
                <p className="f-24 text-center">Không có bình luận nào cần kiểm định</p>
            )}
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <Modal show={!!selectedApproveId} fullscreen={'md-down'} onHide={() => setSelectedApproveId('')} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Bạn có muốn tiếp tục ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex gap-2 align-items-center py-3">
                        <button
                            className="button button-sm button-green"
                            type="button"
                            disabled={isProcessing}
                            onClick={onApproveBlogCommentHandler}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="button button-sm button-secondary"
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
                onConfirm={onDeleteBlogCommentHandler}
            />
        </section>
    );
};

export default BlogCommentReports;
