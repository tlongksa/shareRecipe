import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Paginator from '../common/Paginator';
import { mapRoleKeyToText, role_options } from '../../constants';
import Input from '../common/Input/Input';

function MobileCard({ item, no, onEdit, onDelete, onChangeRole, selectedEditItem }) {
    return (
        <div className="custom-card">
            <div className="custom-row">
                <div className="custom-col">
                    <strong />
                    <div className="d-flex align-items-center mw-60-px gap-2">
                        <SettingOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 16,
                                color: '#289AE7',
                            }}
                            onClick={() => onEdit(item.accountId)}
                        />
                        <DeleteOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#f53838',
                            }}
                            onClick={() => onDelete(item.accountId)}
                        />
                    </div>
                </div>
                <div className="custom-col">
                    <strong>No</strong>
                    <p>{no}</p>
                </div>
                <div className="custom-col">
                    <strong>Id</strong>
                    <p>{item.accountId}</p>
                </div>
                <div className="custom-col">
                    <strong>Họ và tên</strong>
                    <p>{item.userName}</p>
                </div>
                <div className="custom-col">
                    <strong>Tên đăng nhập</strong>
                    <p>{item.userName}</p>
                </div>
                <div className="custom-col">
                    <strong>Ngày Tháng năm </strong>
                    <p>{item?.createDate?.substr(0, 10) || '-'}</p>
                </div>
                <div className="custom-col">
                    <strong>Chức vụ</strong>
                    <p className="text-capitalize">
                        {selectedEditItem === item.accountId ? (
                            <Input
                                type="select"
                                onChange={(e) => {
                                    onChangeRole(item.accountId, e.target.value);
                                }}
                                value={mapRoleKeyToText(item.role)}
                                touched={true}
                                containerNoMarginBottom
                                className="w-100"
                            >
                                {role_options.map((r) => (
                                    <option className="text-capitalize" key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </Input>
                        ) : (
                            mapRoleKeyToText(item.role)
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

const UserDataList = ({
    list,
    onEdit,
    onDelete,
    currentPage,
    maxPage,
    paginateCallback,
    onChangeRole,
    selectedEditItem,
}) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    let listUserMarkup = list.map((item, index) => (
        <li key={item.accountId} className={styles.dataItem}>
            <span className={styles.no}>{index + 1}</span>
            <span>{item.accountId}</span>
            <span>{item.userName || '-'}</span>
            <span>{item.userName || '-'}</span>
            <span>{item?.createDate?.substr(0, 10) || '-'}</span>
            <span className="text-capitalize">
                {selectedEditItem === item.accountId ? (
                    <Input
                        type="select"
                        onChange={(e) => {
                            onChangeRole(item.accountId, e.target.value);
                        }}
                        value={mapRoleKeyToText(item.role)}
                        touched={true}
                        containerNoMarginBottom
                        className="w-100"
                    >
                        {role_options.map((r) => (
                            <option className="text-capitalize" key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </Input>
                ) : (
                    mapRoleKeyToText(item.role)
                )}
            </span>
            <span>
                <div className="d-flex align-items-center mw-60-px gap-sm">
                    <SettingOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#289AE7',
                        }}
                        onClick={() => onEdit(item.accountId)}
                    />
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#f53838',
                        }}
                        onClick={() => onDelete(item.accountId)}
                    />
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listUserMarkup = list.map((item, index) => (
            <MobileCard
                no={index + 1}
                key={item.accountId}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                selectedEditItem={selectedEditItem}
            />
        ));
    }

    return (
        <>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong>Id</strong>
                        <strong>Họ và tên</strong>
                        <strong>Tên đăng nhập</strong>
                        <strong>Ngày Tháng Năm</strong>
                        <strong>Chức vụ</strong>
                        <strong />
                    </li>
                )}
                {listUserMarkup}
            </ul>
            <Paginator
                curPage={currentPage}
                maxPage={maxPage}
                scrollAfterClicking
                isLoading={false}
                callback={(page) => {
                    paginateCallback(page);
                }}
            />
        </>
    );
};

export default UserDataList;
