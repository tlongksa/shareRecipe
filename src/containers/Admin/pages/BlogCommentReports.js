import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { approveBlogCommentRequest, deleteBlogCommentRequest } from '../../../api/requests';
import BlogReportCommentDataList from '../../../components/admin/blog-report-comment-datalist';
import Input from '../../../components/common/Input/Input';
import BlogContext from '../../../context/blog-context';
import Modal from 'react-bootstrap/Modal';

const BlogCommentReports = () => {
    const {
        blogCommentReport: { list, isLoading, error, extraListInfo },
        onFetchMoreBlogCommentReport,
    } = useContext(BlogContext);
    const [search, setSearch] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [selectedDeleteId, setSelectedDeleteId] = useState('');

    useEffect(() => {
        onFetchMoreBlogCommentReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onApproveBlogCommentHandler = () => {
        if (selectedId) {
            setIsProcessing(true);
            approveBlogCommentRequest(selectedId)
                .then(({ data }) => {
                    setIsProcessing(false);
                    setSelectedId('');
                    console.log(data);
                    onFetchMoreBlogCommentReport(1);
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
                    setIsProcessing(false);
                    setSelectedDeleteId('');
                    console.log(data);
                    onFetchMoreBlogCommentReport(1);
                })
                .catch((err) => {
                    setIsProcessing(false);
                    console.log(err);
                });
        }
    };

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className={`account-list__container ${isLoading || isProcessing ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-end mb-3 gap-3 sm:flex-col">
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
            <BlogReportCommentDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMoreBlogCommentReport(page, search || '');
                }}
                onEdit={(id) => setSelectedId(id)}
                onDelete={(id) => setSelectedId(id)}
            />
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <Modal
                show={!!selectedId}
                fullscreen={'md-down'}
                onHide={() => setSelectedId('')}
                className={`${isProcessing ? 'divDisabled' : ''}`}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bạn có muốn tiếp tục ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex gap-2 align-items-center py-3">
                        <button
                            className="button button-sm"
                            type="button"
                            disabled={isProcessing}
                            onClick={onApproveBlogCommentHandler}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="button button-sm"
                            type="button"
                            disabled={isProcessing}
                            onClick={() => setSelectedId('')}
                        >
                            Hủy
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={!!selectedDeleteId}
                fullscreen={'md-down'}
                onHide={() => setSelectedDeleteId('')}
                className={`${isProcessing ? 'divDisabled' : ''}`}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bạn có muốn xóa bình luận ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex gap-2 align-items-center py-3">
                        <button
                            className="button button-sm"
                            type="button"
                            disabled={isProcessing}
                            onClick={onDeleteBlogCommentHandler}
                        >
                            Xác nhận
                        </button>
                        <button
                            className="button button-sm"
                            type="button"
                            disabled={isProcessing}
                            onClick={() => setSelectedDeleteId('')}
                        >
                            Hủy
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default BlogCommentReports;
