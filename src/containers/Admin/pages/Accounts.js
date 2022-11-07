import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { deleteAccountRequest, updateAccountRoleRequest } from '../../../api/requests';
import UserDataList from '../../../components/admin/user-datalist';
import Input from '../../../components/common/Input/Input';
import AccountContext from '../../../context/account-context';

const Accounts = () => {
    const { list, isLoading, error, onFetchMore, extraListInfo, onRemoveItem, onUpdateRole } =
        useContext(AccountContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        onFetchMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRemoveUserHandler = (userId) => {
        setIsProcessing(true);
        deleteAccountRequest(userId)
            .then(({ data }) => {
                setIsProcessing(false);
                onRemoveItem(userId);
                notification.open({
                    message: data?.messContent,
                });
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
            <div className="d-flex justify-content-end mb-3 gap-3 sm:flex-col">
                <form
                    className="global-list_search shadow rounded-3"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (search.trim()) {
                            onFetchMore(1, search);
                        }
                    }}
                >
                    <SearchOutlined
                        className="global-list_search-icon cursor-pointer"
                        onClick={() => {
                            if (search.trim()) {
                                onFetchMore(1, search);
                            }
                        }}
                    />
                    <Input
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearch(value);
                            if (!value.trim()) {
                                onFetchMore(1, '');
                            }
                        }}
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
            <UserDataList
                list={list}
                maxPage={extraListInfo.numOfPages}
                currentPage={extraListInfo.pageIndex}
                paginateCallback={(page) => {
                    onFetchMore(page, search || '');
                }}
                onChangeRole={onChangeUserRoleHandler}
                onDelete={onRemoveUserHandler}
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
