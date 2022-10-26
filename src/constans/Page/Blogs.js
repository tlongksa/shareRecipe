import React, { useEffect, useContext } from 'react';
import BlogContext from '../../context/blog-context';
import './blogs.scss';

const Blogs = () => {
    const { list, error, isLoading, onFetchMore } = useContext(BlogContext);

    useEffect(() => {
        onFetchMore();
    }, []);

    return (
        <section className="client-blog__list-container">
            <div className="custom-page__container">
                <h1>Blogs</h1>
            </div>
        </section>
    );
};

export default Blogs;
