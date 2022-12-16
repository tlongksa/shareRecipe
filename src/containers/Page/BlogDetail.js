import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BlogContext from '../../context/blog-context';
import { BlogForm, BlogItem } from './Blogs';
import './blogs.scss';
import {
    EllipsisOutlined,
    LikeOutlined,
    DislikeOutlined,
    EditOutlined,
    DeleteOutlined,
    FlagOutlined,
    LikeFilled,
    DislikeFilled,
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
    reportBlogCommentRequest,
} from '../../api/requests';
import AuthContext from '../../context/auth-context';
import Paginator from '../../components/common/Paginator';
import { CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { IMAGE_PLACEHODLER_URI } from '../../constants';
import { notification } from 'antd';
import EditComment from '../../components/common/EditComment';
import DeleteItemModal from '../../components/common/DeleteItemModal';
import { ROLES } from '../../App';
import Modal from 'react-bootstrap/Modal';

export const BlogCommentItem = ({
    item,
    isAuthenticated,
    username,
    onDelete,
    onLike,
    onDislike,
    onReport,
    isAdmin,
    blogId,
    onUpdateComment,
    setShowAuthOptionModal,
}) => {
    const [selectedComment, setSelectedComment] = useState(null);
    return (
        <li className="blog-list_item mb-4">
            <div className="d-flex gap-3">
                <img
                    src={item.avatarImage || IMAGE_PLACEHODLER_URI}
                    alt=""
                    className="rounded-circle blog-list_item-avatar"
                />
                <div className="bg-green-blur flex-fill py-3 px-4 rounded-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="d-flex align-items-center gap-1">
                            <strong>{item.accountUserName}</strong>
                            <span className="text-muted">{item?.createDate}</span>
                        </p>
                        <CDropdown
                            className={`${(username && item.accountUserName === username) || isAdmin ? '' : 'd-none'}`}
                        >
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
                                <CDropdownItem
                                    onClick={() => setSelectedComment(item)}
                                    className={`${username && item.accountUserName === username ? '' : 'd-none'}`}
                                >
                                    <EditOutlined className="blog-list_item-actions_icon" /> <span>Sửa</span>
                                </CDropdownItem>
                                <CDropdownItem onClick={() => onDelete(item.blogCommentID)}>
                                    <DeleteOutlined className="blog-list_item-actions_icon" /> <span>Xóa</span>
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                    <div className="blog-list_item-content mb-2">
                        <div
                            className="blog-list_item-content-text"
                            dangerouslySetInnerHTML={{
                                __html: item.content?.replaceAll('\n', '<br />'),
                            }}
                        />
                    </div>
                    <div className={`blog-list_item-actions d-flex gap-3 align-items-center`}>
                        <button
                            onClick={() => {
                                if (!isAuthenticated) {
                                    setShowAuthOptionModal(true);
                                    return;
                                }
                                onLike(item.blogCommentID);
                            }}
                        >
                            {item?.checkLike ? <LikeFilled /> : <LikeOutlined />}
                            <span>{item.totalLike}</span>
                        </button>
                        <button
                            onClick={() => {
                                if (!isAuthenticated) {
                                    setShowAuthOptionModal(true);
                                    return;
                                }
                                onDislike(item.blogCommentID);
                            }}
                        >
                            {item?.checkDislike ? <DislikeFilled /> : <DislikeOutlined />}
                            <span>{item.totalDisLike}</span>
                        </button>
                        <button
                            onClick={() => {
                                if (!isAuthenticated) {
                                    setShowAuthOptionModal(true);
                                    return;
                                }
                                onReport(item.blogCommentID);
                            }}
                        >
                            <FlagOutlined />
                        </button>
                    </div>
                </div>
            </div>
            <EditComment
                show={!!selectedComment}
                setShow={setSelectedComment}
                blogId={blogId}
                formData={selectedComment}
                promise={commentOnBlogRequest}
                callback={(content) => {
                    onUpdateComment({ blogCommentId: selectedComment.blogCommentID, content });
                }}
            />
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
        onUpdateComment,
        onIncreaseNumOfComments,
    } = useContext(BlogContext);
    const dataFetchedRef = useRef(false);
    const {
        userInfo: { accessToken, username, roles },
    } = useContext(AuthContext);
    const isAuthenticated = !!accessToken;
    const isAdmin = roles === ROLES.admin;
    const [content, setContent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const [showEditBlog, setShowEditBlog] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState('');
    const [showAuthOptionModal, setShowAuthOptionModal] = useState(false);

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

    const onCommentSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setShowAuthOptionModal(true);
            return;
        }
        setIsProcessing(true);
        commentOnBlogRequest({
            blogId: id,
            content,
        })
            .then(({ data }) => {
                setIsProcessing(false);
                setContent('');
                onFetchComments(id);
                onIncreaseNumOfComments();
            })
            .catch((err) => {
                setIsProcessing(false);
                notification.open({
                    message: err?.response?.data?.message,
                });
            });
    };

    const onLikeBlogHandler = (blogId) => {
        likeBlogRequest(blogId)
            .then(() => {
                onFetchDetail(id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDislikeBlogHandler = (blogId) => {
        dislikeBlogRequest(blogId)
            .then(() => {
                onFetchDetail(id);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onLikeBlogCmtHandler = (blogCmtId) => {
        likeBlogCommentRequest(blogCmtId)
            .then(() => {
                onFetchComments(id, comments.extraListInfo.pageIndex);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDislikeBlogCmtHandler = (blogCmtId) => {
        dislikeBlogCommentRequest(blogCmtId)
            .then(() => {
                onFetchComments(id, comments.extraListInfo.pageIndex);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDeleteBlogCommentHandler = () => {
        setIsProcessing(true);
        deleteBlogCommentRequest(selectedDeleteId)
            .then(({ data }) => {
                setIsProcessing(false);
                notification.open({
                    message: data?.messContent,
                });
                setSelectedDeleteId('');
                onFetchComments(id, comments.extraListInfo.pageIndex);
            })
            .catch((err) => {
                setIsProcessing(false);
            });
    };

    const onDeleteBlogHandler = (id) => {
        setIsProcessing(true);
        deleteBlogRequest(id)
            .then(({ data }) => {
                setIsProcessing(false);
                notification.open({
                    message: data?.messContent,
                });
                navigate('/blogs');
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    const onReportBlogCommentHandler = (blogCmtId) => {
        reportBlogCommentRequest(blogCmtId)
            .then(({ data }) => {
                notification.open({
                    message: data?.messContent,
                });
                onFetchComments(id, comments.extraListInfo.pageIndex);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
    }

    return (
        <section className={`client-blog-detail__container ${isProcessing ? 'divDisabled' : ''}`}>
            <div className="custom-page__container">
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
                    setShowAuthOptionModal={setShowAuthOptionModal}
                />
                <div className="blog-comments__list-container">
                    <div className="blog-comments__list">
                        {comments.dataResponse.map((item) => (
                            <BlogCommentItem
                                key={item.blogCommentID}
                                item={item}
                                isAuthenticated={isAuthenticated}
                                username={username}
                                onDelete={(id) => setSelectedDeleteId(id)}
                                onLike={onLikeBlogCmtHandler}
                                onDislike={onDislikeBlogCmtHandler}
                                onReport={onReportBlogCommentHandler}
                                onUpdateComment={onUpdateComment}
                                isAdmin={isAdmin}
                                blogId={id}
                                setShowAuthOptionModal={setShowAuthOptionModal}
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
                <div className="comment-form__container">
                    <form onSubmit={onCommentSubmit} className="comment-form__inner">
                        <Input
                            type="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Bình luận ..."
                        />
                        <div className="d-flex justify-content-end">
                            <button className="button button-sm button-green" type="submit" disabled={!content.trim()}>
                                Bình luận
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
            <DeleteItemModal
                title="bình luận"
                show={!!selectedDeleteId}
                onHide={() => setSelectedDeleteId('')}
                isProcessing={isProcessing}
                onConfirm={onDeleteBlogCommentHandler}
            />
            <Modal
                show={showAuthOptionModal}
                fullscreen={'md-down'}
                onHide={() => setShowAuthOptionModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bạn cần đăng nhập để sử dụng tính năng này ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex gap-2 align-items-center py-3">
                        <button
                            className="button button-sm button-green"
                            type="button"
                            onClick={() => {
                                navigate(`/signin?redirectUrl=/blogs/${id}`);
                                setShowAuthOptionModal(false);
                            }}
                        >
                            Đăng nhập
                        </button>
                        <button
                            className="button button-sm button-secondary"
                            type="button"
                            onClick={() => setShowAuthOptionModal(false)}
                        >
                            Hủy
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default BlogDetail;
