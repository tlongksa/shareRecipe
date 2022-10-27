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
} from '@ant-design/icons';
import Input from '../../components/common/Input/Input';
import { Link } from 'react-router-dom';

const SearchBlog = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <form className="blog-list_search shadow rounded-3">
            <SearchOutlined className="blog-list_search-icon" />
            <Input
                onChange={handleChange}
                placeholder="Search..."
                value={value}
                error={null}
                touched={true}
                containerNoMarginBottom
                className="flex-fill"
                inputClassName="border-0"
            />
        </form>
    );
};

export const BlogItem = ({ item }) => {
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
                            <strong>{item.userName}</strong>
                            <span className="text-muted">2022-10-26</span>
                        </p>
                        <EllipsisOutlined className="blog-list_item-actions_icon" />
                    </div>
                    <div className="blog-list_item-content">
                        <h5>
                            <Link to={`/blog-detail/${item.blogID}`}>{item.title}</Link>
                        </h5>
                        <p>{item.content}</p>
                    </div>
                    <div className="blog-list_item-actions d-flex gap-3 align-items-center">
                        <button>
                            <LikeOutlined />
                            <span>{item.totalLike}</span>
                        </button>
                        <button>
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

const Blogs = () => {
    const { list, error, isLoading, onFetchMore, onClearList } = useContext(BlogContext);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        onFetchMore();
        return () => {
            // clean up
            onClearList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className="client-blog__list-container">
            <div className="custom-page__container">
                <div className="d-flex justify-content-end mb-3">
                    <SearchBlog />
                </div>
                {isLoading ? (
                    <div className="blog-list__loader-container">
                        <LoadingOutlined className="blog-list__loader-icon" />
                    </div>
                ) : (
                    <ul className="blog-list_items">
                        {list.map((item, index) => (
                            <BlogItem key={`${item.id}-${index}`} item={item} />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default Blogs;
