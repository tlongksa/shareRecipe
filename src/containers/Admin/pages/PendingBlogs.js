import React, { useContext, useEffect } from 'react';
import BlogContext from '../../../context/blog-context';

const PendingBlogs = () => {
    const { listPendingBlog, isLoading, error, onFetchMorePendingList, extraPendingBlogListInfo } =
        useContext(BlogContext);

    useEffect(() => {
        onFetchMorePendingList(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }
    return (
        <section className="pending-blogs__container">
            <h1>PendingBlogs</h1>
        </section>
    );
};

export default PendingBlogs;
