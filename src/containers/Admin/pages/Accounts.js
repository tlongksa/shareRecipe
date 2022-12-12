import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { deleteAccountRequest, updateAccountRoleRequest } from '../../../api/requests';
import UserDataList from '../../../components/admin/user-datalist';
import DeleteItemModal from '../../../components/common/DeleteItemModal';
import Input from '../../../components/common/Input/Input';
import AccountContext from '../../../context/account-context';

const Accounts = () => {
    const { list, isLoading, error, onFetchMore, extraListInfo, onRemoveItem, onUpdateRole } =
        useContext(AccountContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedDeleteId, setSelectedDeleteId] = useState('');
    const [selectedEditItem, setSelectedEditItem] = useState('');

    useEffect(() => {
        onFetchMore(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRemoveUserHandler = () => {
        setIsProcessing(true);
        deleteAccountRequest(selectedDeleteId)
            .then(({ data }) => {
                setIsProcessing(false);
                onRemoveItem(selectedDeleteId);
                notification.open({
                    message: data?.messContent,
                });
                setSelectedDeleteId('');
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
                setSelectedEditItem('');
            })
            .catch((err) => {
                console.log(err);
                setIsProcessing(false);
            });
    };

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
    }

    return (
        <section className={`account-list__container ${isLoading || isProcessing ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-3 gap-3 sm:flex-col">
                <h3 className="mb-0">Quản lí tài khoản</h3>
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
                        placeholder="Tìm kiếm..."
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
                onDelete={(id) => setSelectedDeleteId(id)}
                onEdit={(id) => setSelectedEditItem(id)}
                selectedEditItem={selectedEditItem}
                onCancelEdit={() => setSelectedEditItem('')}
            />
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
            <DeleteItemModal
                title="account"
                show={!!selectedDeleteId}
                onHide={() => setSelectedDeleteId('')}
                isProcessing={isProcessing}
                onConfirm={onRemoveUserHandler}
            />
        </section>
    );
};

export default Accounts;
