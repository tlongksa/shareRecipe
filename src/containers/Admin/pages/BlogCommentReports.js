import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import UserDataList from '../../../components/admin/user-datalist';
import BlogContext from '../../../context/blog-context';

const BlogCommentReports = () => {
    const {
        blogCommentReport: { list, isLoading, error, extraListInfo },
        onFetchMoreBlogCommentReport,
    } = useContext(BlogContext);

    useEffect(() => {
        onFetchMoreBlogCommentReport(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLoading && error) {
        return <p className="error-message">Something went wrong!</p>;
    }

    return (
        <section className={`account-list__container ${isLoading ? 'divDisabled' : ''}`}>
            <UserDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMoreBlogCommentReport(page);
                }}
            />
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
        </section>
    );
};

export default BlogCommentReports;
