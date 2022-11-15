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
    EditOutlined,
    LikeFilled,
    DislikeFilled,
} from '@ant-design/icons';
import Input from '../../components/common/Input/Input';
import { Link } from 'react-router-dom';
import Paginator from '../../components/common/Paginator';
import { createBlogRequest } from '../../api/requests';
import Modal from 'react-bootstrap/Modal';
import { notification } from 'antd';
import AuthContext from '../../context/auth-context';
import { CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { IMAGE_PLACEHODLER_URI } from '../../constants';
import { ROLES } from '../../App';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const SearchDataList = ({ search, setSearch, callback, emptySearchCallback, className }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        setSearch(value);
        if (!value.trim()) {
            emptySearchCallback();
        }
    };

    return (
        <form
            className={`global-list_search shadow rounded-3 ${className || ''}`}
            onSubmit={(e) => {
                e.preventDefault();
                callback();
            }}
        >
            <SearchOutlined className="global-list_search-icon cursor-pointer" onClick={callback} />
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

export const BlogItem = ({
    item,
    isAuthenticated,
    onLike,
    onDislike,
    hideBottomActions,
    onApprove,
    onDelete,
    username,
    hideDeleteIcon,
    onEdit,
}) => {
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
                        <p className="d-flex align-items-center gap-3">
                            <strong>{item.userName}</strong>
                            <span className="text-muted">{item?.createDate || '-'}</span>
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
                                    className={`blog-list_item-actions_icon ${hideDeleteIcon ? 'd-none' : ''}`}
                                    onClick={() => onDelete(item.blogID)}
                                />
                            )}
                            {username && item.userName === username && (
                                <CDropdown>
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
                                        <CDropdownItem onClick={() => onEdit && onEdit(item)}>
                                            <EditOutlined className="blog-list_item-actions_icon" /> <span>Sửa</span>
                                        </CDropdownItem>
                                        <CDropdownItem onClick={() => onDelete(item.blogID)}>
                                            <DeleteOutlined className="blog-list_item-actions_icon" /> <span>Xóa</span>
                                        </CDropdownItem>
                                    </CDropdownMenu>
                                </CDropdown>
                            )}
                        </div>
                    </div>
                    <div className="blog-list_item-content mb-2">
                        <h5>
                            <Link to={`/blogs/${item.blogID}`}>{item.title}</Link>
                        </h5>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.content,
                            }}
                        />
                    </div>
                    <div
                        className={`blog-list_item-actions d-flex gap-3 align-items-center ${
                            isAuthenticated ? '' : 'divDisabled'
                        } ${hideBottomActions ? 'd-none' : ''}`}
                    >
                        <button onClick={() => onLike && onLike(item.blogID)}>
                            {item?.checkLike ? <LikeFilled /> : <LikeOutlined />}
                            <span>{item.totalLike}</span>
                        </button>
                        <button onClick={() => onDislike && onDislike(item.blogID)}>
                            {item?.checkDislike ? <DislikeFilled /> : <DislikeOutlined />}
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

export const BlogForm = ({ show, setShow, blogData, callback }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (blogData?.blogID) {
            setTitle(blogData?.title);
            setContent(blogData?.content);
        }
    }, [blogData]);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const payloadToSubmit = {
            title,
            content,
        };
        if (blogData?.blogID) {
            payloadToSubmit.blogId = blogData?.blogID;
        }
        createBlogRequest(payloadToSubmit)
            .then(({ data }) => {
                setTitle('');
                setContent('');
                callback && callback();
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
        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
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
                    <div className="mb-3">
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>
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
    const { list, error, isLoading, extraListInfo, onFetchMore, onClearList } = useContext(BlogContext);
    const dataFetchedRef = useRef(false);
    const [search, setSearch] = useState('');
    const [showNewBlog, setShowNewBlog] = useState(false);
    const {
        userInfo: { accessToken, roles },
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

    if (!isLoading && error) {
        return (
            <section className="client-blog__list-container">
                <div className="custom-page__container">
                    <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="client-blog__list-container">
            <div className="custom-page__container">
                <div className="d-flex justify-content-end mb-3 gap-3">
                    <SearchDataList
                        search={search}
                        setSearch={setSearch}
                        callback={() => {
                            if (search.trim()) {
                                onFetchMore(1, search);
                            }
                        }}
                        emptySearchCallback={() => onFetchMore(1, '')}
                    />
                    {isAuthenticated && (
                        <button
                            className="button button-sm d-flex align-items-center gap-2"
                            onClick={() => setShowNewBlog(true)}
                        >
                            <PlusCircleOutlined />
                            <span>Thêm blog</span>
                        </button>
                    )}
                </div>
                <ul className="blog-list_items">
                    {list.map((item, index) => (
                        <BlogItem key={`${item.blogID}-${index}`} item={item} isAuthenticated={isAuthenticated} />
                    ))}
                </ul>
                {isLoading && (
                    <div className="global-list__loader-container">
                        <LoadingOutlined className="global-list__loader-icon" />
                    </div>
                )}
                {!isLoading && list.length === 0 && (
                    <p className="my-3 text-center error-message">Không có bài viết phù hơp</p>
                )}
                <Paginator
                    isLoading={isLoading}
                    maxPage={extraListInfo.numOfPages}
                    curPage={extraListInfo.pageIndex}
                    scrollAfterClicking={false}
                    callback={(page) => onFetchMore(page, search || '')}
                />
            </div>
            <BlogForm
                show={showNewBlog}
                setShow={setShowNewBlog}
                callback={() => {
                    if (roles === ROLES.admin) {
                        onFetchMore(1, search);
                    }
                }}
            />
        </section>
    );
};

export default Blogs;
