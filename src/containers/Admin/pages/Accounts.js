import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { deleteAccountRequest, updateAccountRoleRequest } from '../../../api/requests';
import UserDataList from '../../../components/admin/user-datalist';
import AccountContext from '../../../context/account-context';

const Accounts = () => {
    const { list, isLoading, error, onFetchMore, extraListInfo, onRemoveItem, onUpdateRole } =
        useContext(AccountContext);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        onFetchMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRemoveUserHandler = (userId) => {
        setIsProcessing(true);
        deleteAccountRequest(userId)
            .then(() => {
                setIsProcessing(false);
                onRemoveItem(userId);
                if (list.length === 0) {
                    onFetchMore(1);
                }
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    const onChangeUserRoleHandler = (userId, newRole) => {
        setIsProcessing(true);
        updateAccountRoleRequest(userId, newRole)
            .then(() => {
                setIsProcessing(false);
                onUpdateRole(userId, newRole);
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
        <section className={`account-list__container ${isLoading || isProcessing ? 'divDisabled' : ''}`}>
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <UserDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMore(page);
                }}
                onChangeRole={onChangeUserRoleHandler}
                onDelete={onRemoveUserHandler}
            />
        </section>
    );
};

export default Accounts;
