import React, { useContext, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogContext from '../../context/blog-context';
import { BlogItem } from './Blogs';
import './blogs.scss';
import { LoadingOutlined, EllipsisOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';

export const BlogCommentItem = ({ item, isAuthenticated }) => {
    return (
        <li className="blog-list_item mb-4">
            <div className="d-flex gap-3">
                <img
                    src={
                        item.avatarImage ||
                        'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                    }
                    alt=""
                    className="rounded-circle blog-list_item-avatar"
                />
                <div className="bg-gray flex-fill py-3 px-4 rounded-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="d-flex align-items-center gap-1">
                            <strong>{item.accountUserName}</strong>
                            <span className="text-muted">{item?.createDate}</span>
                        </p>
                        <EllipsisOutlined className="blog-list_item-actions_icon" />
                    </div>
                    <div className="blog-list_item-content">
                        <p>{item.content}</p>
                    </div>
                    <div
                        className={`blog-list_item-actions d-flex gap-3 align-items-center ${
                            isAuthenticated ? '' : 'divDisabled'
                        }`}
                    >
                        <button>
                            <LikeOutlined />
                            <span>{item.totalLike}</span>
                        </button>
                        <button>
                            <DislikeOutlined />
                            <span>{item.totalDisLike}</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

const BlogDetail = () => {
    const { id } = useParams();
    const {
        blogDetail: { isLoading, error, dataResponse, comments },
        onFetchDetail,
        onFetchComments,
    } = useContext(BlogContext);
    const dataFetchedRef = useRef(false);
    const isAuthenticated = !!localStorage.getItem('token');

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
                    <>
                        <BlogItem item={dataResponse} isAuthenticated={isAuthenticated} />
                        <div className="blog-comments__list-container">
                            <div className="blog-comments__list">
                                {comments.dataResponse.map((item) => (
                                    <BlogCommentItem
                                        key={item.blogCommentID}
                                        item={item}
                                        isAuthenticated={isAuthenticated}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default BlogDetail;
