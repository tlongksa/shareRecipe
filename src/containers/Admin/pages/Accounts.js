import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import UserDataList from '../../../components/admin/user-datalist';
import AccountContext from '../../../context/account-context';

const Accounts = () => {
    const { list, isLoading, error, onFetchMore, extraListInfo } = useContext(AccountContext);

    useEffect(() => {
        onFetchMore(1);
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
                    onFetchMore(page);
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

export default Accounts;
