import React, { useContext, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogContext from '../../context/blog-context';
import { BlogItem } from './Blogs';
import './blogs.scss';
import { LoadingOutlined, EllipsisOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Input from '../../components/common/Input/Input';
import { commentOnBlogRequest, dislikeBlogRequest, likeBlogRequest } from '../../api/requests';
import AuthContext from '../../context/auth-context';

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
                <div className="bg-gray-custom flex-fill py-3 px-4 rounded-1">
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
        onClearDetail,
        onLikeItemDetail,
        onDislikeItemDetail,
    } = useContext(BlogContext);
    const dataFetchedRef = useRef(false);
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const isAuthenticated = !!accessToken;
    const [content, setContent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        onFetchDetail(id);
        onFetchComments(id);
        return () => {
            onClearDetail();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onCommentSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        commentOnBlogRequest({
            blogId: id,
            content,
        })
            .then(({ data }) => {
                setIsProcessing(false);
                setContent('');
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    const onLikeBLogHandler = (blogId) => {
        likeBlogRequest(blogId)
            .then(() => {
                onLikeItemDetail();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDislikeBLogHandler = (blogId) => {
        dislikeBlogRequest(blogId)
            .then(() => {
                onDislikeItemDetail();
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                        <BlogItem
                            item={dataResponse}
                            isAuthenticated={isAuthenticated}
                            onLike={onLikeBLogHandler}
                            onDislike={onDislikeBLogHandler}
                        />
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
                <div className="comment-form__container">
                    <form onSubmit={onCommentSubmit} className="comment-form__inner">
                        <Input
                            type="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Bình luận ..."
                        />
                        <div className="d-flex justify-content-end">
                            <button
                                className="button button-sm"
                                type="submit"
                                disabled={!content.trim() || isProcessing}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BlogDetail;
