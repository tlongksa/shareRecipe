import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { approvePendingBlogRequest, deleteBlogRequest } from '../../../api/requests';
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
            <h1>PendingBlogs</h1>
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
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <Paginator
                isLoading={isLoading}
                maxPage={extraPendingBlogListInfo.numOfPages}
                curPage={extraPendingBlogListInfo.pageIndex}
                scrollAfterClicking={false}
                callback={(page) => onFetchMorePendingList(page, search)}
            />
        </section>
    );
};

export default PendingBlogs;
