import React, { useContext, useEffect, useRef, useState } from 'react';
import BlogContext from '../../context/blog-context';
import './blogs.scss';
import {
    LoadingOutlined,
    SearchOutlined,
    EllipsisOutlined,
    LikeOutlined,
    DislikeOutlined,
    CommentOutlined,
    PlusCircleOutlined,
    CheckSquareOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Input from '../../components/common/Input/Input';
import { Link } from 'react-router-dom';
import Paginator from '../../components/common/Paginator';
import { dislikeBlogRequest, likeBlogRequest, createBlogRequest } from '../../api/requests';
import Modal from 'react-bootstrap/Modal';
import { notification } from 'antd';
import AuthContext from '../../context/auth-context';

const SearchBlog = ({ search, setSearch, callback }) => {
    const handleChange = (e) => {
        setSearch(e.target.value);
        callback();
    };

    return (
        <form className="global-list_search shadow rounded-3">
            <SearchOutlined className="global-list_search-icon" />
            <Input
                onChange={handleChange}
                placeholder="Search..."
                value={search}
                error={null}
                touched={true}
                containerNoMarginBottom
                className="flex-fill"
                inputClassName="border-0"
            />
        </form>
    );
};

export const BlogItem = ({ item, isAuthenticated, onLike, onDislike, hideBottomActions, onApprove, onDelete }) => {
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
                            <strong>{item.userName}</strong>
                            <span className="text-muted">2022-10-26</span>
                        </p>
                        <div className="d-flex gap-3">
                            {onApprove && (
                                <CheckSquareOutlined
                                    className="blog-list_item-actions_icon"
                                    onClick={() => onApprove(item.blogID)}
                                />
                            )}
                            {onDelete && (
                                <DeleteOutlined
                                    className="blog-list_item-actions_icon"
                                    onClick={() => onDelete(item.blogID)}
                                />
                            )}
                            <EllipsisOutlined className="blog-list_item-actions_icon" />
                        </div>
                    </div>
                    <div className="blog-list_item-content">
                        <h5>
                            <Link to={`/blogs/${item.blogID}`}>{item.title}</Link>
                        </h5>
                        <p>{item.content}</p>
                    </div>
                    <div
                        className={`blog-list_item-actions d-flex gap-3 align-items-center ${
                            isAuthenticated ? '' : 'divDisabled'
                        } ${hideBottomActions ? 'd-none' : ''}`}
                    >
                        <button onClick={() => onLike(item.blogID)}>
                            <LikeOutlined />
                            <span>{item.totalLike}</span>
                        </button>
                        <button onClick={() => onDislike(item.blogID)}>
                            <DislikeOutlined />
                            <span>{item.totalDisLike}</span>
                        </button>
                        <button>
                            <CommentOutlined />
                            <span>{item.numberComment}</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export const NewBlogForm = ({ show, setShow }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        createBlogRequest({ title, content })
            .then(({ data }) => {
                setTitle('');
                setContent('');
                setShow(false);
                setIsProcessing(false);
                notification.open({
                    message: data?.messContent,
                });
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    return (
        <Modal
            show={show}
            fullscreen={true}
            onHide={() => setShow(false)}
            className={`${isProcessing ? 'divDisabled' : ''}`}
        >
            <Modal.Header closeButton>
                <Modal.Title>Tạo mới blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <Input
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        label={'Title'}
                        value={title}
                        error={null}
                        touched={true}
                        className="flex-fill"
                    />
                    <Input
                        type="textarea"
                        label="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content ..."
                    />
                    <div className="d-flex justify-content-end">
                        <button
                            className="button button-sm"
                            type="submit"
                            disabled={!content.trim() || !title.trim() || isProcessing}
                        >
                            Post
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

const Blogs = () => {
    const { list, error, isLoading, extraListInfo, onFetchMore, onClearList, onLikeItem, onDislikeItem } =
        useContext(BlogContext);
    const dataFetchedRef = useRef(false);
    const [search, setSearch] = useState('');
    const [showNewBlog, setShowNewBlog] = useState(false);
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const isAuthenticated = !!accessToken;

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        onFetchMore(1, search);
        return () => {
            // clean up
            onClearList();
            setSearch('');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onLikeBLogHandler = (blogId) => {
        likeBlogRequest(blogId)
            .then(() => {
                onLikeItem(blogId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onDislikeBLogHandler = (blogId) => {
        dislikeBlogRequest(blogId)
            .then(() => {
                onDislikeItem(blogId);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className="client-blog__list-container">
            <div className="custom-page__container">
                <div className="d-flex justify-content-end mb-3 gap-3">
                    <SearchBlog
                        search={search}
                        setSearch={setSearch}
                        callback={() => {
                            onClearList();
                            if (search.trim()) {
                                onFetchMore(extraListInfo.pageIndex, search);
                            }
                            if (!search) {
                                onFetchMore(1, search);
                            }
                        }}
                    />
                    <button className="button d-flex align-items-center gap-2" onClick={() => setShowNewBlog(true)}>
                        <PlusCircleOutlined />
                        <span>Thêm blog</span>
                    </button>
                </div>
                <ul className="blog-list_items">
                    {list.map((item, index) => (
                        <BlogItem
                            key={`${item.blogID}-${index}`}
                            item={item}
                            isAuthenticated={isAuthenticated}
                            onLike={onLikeBLogHandler}
                            onDislike={onDislikeBLogHandler}
                        />
                    ))}
                </ul>
                {isLoading && (
                    <div className="blog-list__loader-container">
                        <LoadingOutlined className="blog-list__loader-icon" />
                    </div>
                )}
                <Paginator
                    isLoading={isLoading}
                    maxPage={extraListInfo.numOfPages}
                    curPage={extraListInfo.pageIndex}
                    scrollAfterClicking={false}
                    callback={(page) => onFetchMore(page, search)}
                />
            </div>
            <NewBlogForm show={showNewBlog} setShow={setShowNewBlog} />
        </section>
    );
};

export default Blogs;
