import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogContext from '../../context/blog-context';
import { BlogItem } from './Blogs';
import './blogs.scss';

const BlogDetail = () => {
    const { id } = useParams();
    const {
        blogDetail: { isLoading, error, dataResponse },
        onFetchDetail,
        onFetchComments,
    } = useContext(BlogContext);

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        onFetchDetail(id);
        onFetchComments(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className="client-blog-detail__container">
            <div className="custom-page__container">
                {isLoading ? (
                    <div className="blog-detail__loader-container">
                        <LoadingOutlined className="blog-detail__loader-icon" />
                    </div>
                ) : (
                    <BlogItem item={dataResponse} />
                )}
            </div>
        </section>
    );
};

export default BlogDetail;
