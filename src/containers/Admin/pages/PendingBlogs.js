import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { approvePendingBlogRequest, deleteBlogRequest } from '../../../api/requests';
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

    useEffect(() => {
        onFetchMorePendingList(1);
        return () => {
            onClearPendingList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onApprove = (id) => {
        approvePendingBlogRequest(id)
            .then(() => {
                onRemoveFromPendingList(id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDelete = (id) => {
        deleteBlogRequest(id)
            .then(() => {
                onRemoveFromPendingList(id);
                if (listPendingBlog.length === 0) {
                    onFetchMorePendingList(1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }
    return (
        <section className="pending-blogs__container">
            <div className="d-flex justify-content-end mb-3 gap-3 sm:flex-col">
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
            <ul className="blog-list_items">
                {listPendingBlog.map((item, index) => (
                    <BlogItem
                        key={`${item.blogID}-${index}`}
                        item={item}
                        isAuthenticated={true}
                        hideBottomActions
                        onApprove={onApprove}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
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
        </section>
    );
};

export default PendingBlogs;
