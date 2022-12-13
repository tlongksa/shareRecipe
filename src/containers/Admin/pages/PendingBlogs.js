import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { approvePendingBlogRequest, deleteBlogRequest } from '../../../api/requests';
import DeleteItemModal from '../../../components/common/DeleteItemModal';
import Input from '../../../components/common/Input/Input';
import Paginator from '../../../components/common/Paginator';
import BlogContext from '../../../context/blog-context';
import { BlogItem } from '../../Page/Blogs';
import './index.scss';

const PendingBlogs = () => {
    const {
        listPendingBlog,
        isLoading,
        error,
        onFetchMorePendingList,
        extraPendingBlogListInfo,
        onClearPendingList,
        onRemoveFromPendingList,
    } = useContext(BlogContext);
    const [search, setSearch] = useState('');
    const [selectedDeleteId, setSelectedDeleteId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        onFetchMorePendingList(1);
        return () => {
            onClearPendingList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onApprove = (id) => {
        approvePendingBlogRequest(id)
            .then(({ data }) => {
                notification.open({
                    message: data?.messContent,
                });
                onRemoveFromPendingList(id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDeletePendingBlogHandler = () => {
        setIsProcessing(true);
        deleteBlogRequest(selectedDeleteId)
            .then(({ data }) => {
                setIsProcessing(false);
                onRemoveFromPendingList(selectedDeleteId);
                notification.open({
                    message: data?.messContent,
                });
                setSelectedDeleteId('');
                if (listPendingBlog.length === 0) {
                    onFetchMorePendingList(1);
                }
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
    }
    return (
        <section className="pending-blogs__container pb-4">
            <div className="d-flex justify-content-between align-items-center mb-3 gap-3 sm:flex-col">
                <h3 className="mb-0">Phê duyệt blog</h3>
                <form
                    className="global-list_search shadow rounded-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (search.trim()) {
                            onFetchMorePendingList(1, search);
                        }
                    }}
                >
                    <SearchOutlined
                        className="global-list_search-icon cursor-pointer"
                        onClick={() => {
                            if (search.trim()) {
                                onFetchMorePendingList(1, search);
                            }
                        }}
                    />
                    <Input
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearch(value);
                            if (!value.trim()) {
                                onFetchMorePendingList(1, '');
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
            <ul className="blog-list_items">
                {listPendingBlog.map((item, index) => (
                    <BlogItem
                        key={`${item.blogID}-${index}`}
                        item={item}
                        isAuthenticated={true}
                        hideBottomActions
                        onApprove={onApprove}
                        onDelete={(id) => setSelectedDeleteId(id)}
                    />
                ))}
            </ul>
            {!isLoading && !error && listPendingBlog.length === 0 && (
                <p className="f-24 text-center">Không còn blog nào cần phê duyệt</p>
            )}
            <Paginator
                isLoading={isLoading}
                maxPage={extraPendingBlogListInfo.numOfPages}
                curPage={extraPendingBlogListInfo.pageIndex}
                scrollAfterClicking={false}
                callback={(page) => onFetchMorePendingList(page, search || '')}
            />
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <DeleteItemModal
                title="blog"
                show={!!selectedDeleteId}
                onHide={() => setSelectedDeleteId('')}
                isProcessing={isProcessing}
                onConfirm={onDeletePendingBlogHandler}
            />
        </section>
    );
};

export default PendingBlogs;
