import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogContext from '../../context/blog-context';
import { BlogForm, BlogItem } from './Blogs';
import './blogs.scss';
import {
    LoadingOutlined,
    EllipsisOutlined,
    LikeOutlined,
    DislikeOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Input from '../../components/common/Input/Input';
import {
    commentOnBlogRequest,
    deleteBlogCommentRequest,
    dislikeBlogRequest,
    likeBlogRequest,
    likeBlogCommentRequest,
    dislikeBlogCommentRequest,
    deleteBlogRequest,
} from '../../api/requests';
import AuthContext from '../../context/auth-context';
import Paginator from '../../components/common/Paginator';
import { CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { IMAGE_PLACEHODLER_URI } from '../../constants';

export const BlogCommentItem = ({ item, isAuthenticated, username, onDelete, onLike, onDislike, onEdit }) => {
    return (
        <li className="blog-list_item mb-4">
            <div className="d-flex gap-3">
                <img
                    src={item.avatarImage || IMAGE_PLACEHODLER_URI}
                    alt=""
                    className="rounded-circle blog-list_item-avatar"
                />
                <div className="bg-gray-custom flex-fill py-3 px-4 rounded-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="d-flex align-items-center gap-1">
                            <strong>{item.accountUserName}</strong>
                            <span className="text-muted">{item?.createDate}</span>
                        </p>
                        <CDropdown className={`${username && item.accountUserName === username ? '' : 'd-none'}`}>
                            <CDropdownToggle
                                color="white"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                caret={false}
                            >
                                <EllipsisOutlined className="blog-list_item-actions_icon" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem onClick={() => onEdit(item)}>
                                    <EditOutlined className="blog-list_item-actions_icon" /> <span>Sửa</span>
                                </CDropdownItem>
                                <CDropdownItem onClick={() => onDelete(item.blogCommentID)}>
                                    <DeleteOutlined className="blog-list_item-actions_icon" /> <span>Xóa</span>
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                    <div className="blog-list_item-content">
                        <p>{item.content}</p>
                    </div>
                    <div
                        className={`blog-list_item-actions d-flex gap-3 align-items-center ${
                            isAuthenticated ? '' : 'divDisabled'
                        }`}
                    >
                        <button onClick={() => onLike(item.blogCommentID)}>
                            <LikeOutlined />
                            <span>{item.totalLike}</span>
                        </button>
                        <button onClick={() => onDislike(item.blogCommentID)}>
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
        userInfo: { accessToken, username },
    } = useContext(AuthContext);
    const isAuthenticated = !!accessToken;
    const [content, setContent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const [showEditBlog, setShowEditBlog] = useState(false);

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

    const onLikeBlogHandler = (blogId) => {
        likeBlogRequest(blogId)
            .then(() => {
                onLikeItemDetail();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDislikeBlogHandler = (blogId) => {
        dislikeBlogRequest(blogId)
            .then(() => {
                onDislikeItemDetail();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onLikeBlogCmtHandler = (blogCmtId) => {
        likeBlogCommentRequest(blogCmtId)
            .then(() => {
                // onLikeItemDetail();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDislikeBlogCmtHandler = (blogCmtId) => {
        dislikeBlogCommentRequest(blogCmtId)
            .then(() => {
                // onDislikeItemDetail();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDeleteBlogCommentHandler = (id) => {
        setIsProcessing(true);
        deleteBlogCommentRequest(id)
            .then(() => {
                setIsProcessing(false);
            })
            .catch((err) => {
                setIsProcessing(false);
            });
    };

    const onDeleteBlogHandler = (id) => {
        setIsProcessing(true);
        deleteBlogRequest(id)
            .then(() => {
                setIsProcessing(false);
                navigate('/blogs');
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className={`client-blog-detail__container ${isProcessing ? 'divDisabled' : ''}`}>
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
                            onLike={onLikeBlogHandler}
                            onDislike={onDislikeBlogHandler}
                            onDelete={onDeleteBlogHandler}
                            username={username}
                            hideDeleteIcon
                            onEdit={(blog) => {
                                setShowEditBlog(true);
                            }}
                        />
                        <div className={`blog-comments__list-container`}>
                            <div className="blog-comments__list">
                                {comments.dataResponse.map((item) => (
                                    <BlogCommentItem
                                        key={item.blogCommentID}
                                        item={item}
                                        isAuthenticated={isAuthenticated}
                                        username={username}
                                        onDelete={onDeleteBlogCommentHandler}
                                        onLike={onLikeBlogCmtHandler}
                                        onDislike={onDislikeBlogCmtHandler}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Paginator
                                isLoading={isLoading}
                                maxPage={comments.extraListInfo.numOfPages}
                                curPage={comments.extraListInfo.pageIndex}
                                scrollAfterClicking={false}
                                callback={(page) => onFetchComments(id, page)}
                            />
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
                            <button className="button button-sm" type="submit" disabled={!content.trim()}>
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <BlogForm
                show={showEditBlog}
                setShow={setShowEditBlog}
                blogData={dataResponse}
                callback={() => onFetchDetail(id)}
            />
        </section>
    );
};

export default BlogDetail;
