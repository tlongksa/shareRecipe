import { CommentOutlined, DislikeOutlined, LikeOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../common/Input/Input';
import './index.scss';

const RecipeByCategoryItem = ({ item, isAuthenticated }) => (
    <li className="blog-list_item mb-4">
        <div className="d-flex gap-3">
            <img
                src={
                    item.avatarImage ||
                    'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                }
                alt=""
                className="rounded blog-list_item-avatar"
            />
            <div className="bg-gray flex-fill py-3 px-4 rounded-1">
                <div className="d-flex justify-content-between align-items-center">
                    <p className="d-flex align-items-center gap-1">
                        <strong>{item.userName}</strong>
                        <span className="text-muted">2022-10-26</span>
                    </p>
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
                    <button>
                        <CommentOutlined />
                        <span>{item.numberComment}</span>
                    </button>
                </div>
            </div>
        </div>
    </li>
);

const RecipesByCategory = (props) => {
    const [search, setSearch] = useState('');
    return (
        <section className="recipes-by__category-container">
            <div className="custom-page__container">
                <div className="d-flex justify-content-end">
                    <form className="global-list_search shadow rounded-3">
                        <SearchOutlined className="global-list_search-icon" />
                        <Input
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            value={search}
                            error={null}
                            touched={true}
                            containerNoMarginBottom
                            className="flex-fill"
                            inputClassName="border-0"
                        />
                    </form>
                </div>
                <div className="recipes-by__category-list">
                    <RecipeByCategoryItem />
                </div>
            </div>
        </section>
    );
};
export default RecipesByCategory;
