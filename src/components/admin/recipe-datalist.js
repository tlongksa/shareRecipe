import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Paginator from '../common/Paginator';

export const MAX_ITEMS = 5;

function MobileCard({ item, no, onEdit, onDelete }) {
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
                            onClick={() => onEdit(item.dishId)}
                        />
                        <DeleteOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#f53838',
                            }}
                            onClick={() => onDelete(item.dishId)}
                        />
                    </div>
                </div>
                <div className="custom-col">
                    <strong>No</strong>
                    <p>{no}</p>
                </div>
                <div className="custom-col">
                    <strong>Tên công thức</strong>
                    <p>{item.dishName}</p>
                </div>
                <div className="custom-col">
                    <strong>Mô tả</strong>
                    <p>{item.formulaDescribe}</p>
                </div>
                <div className="custom-col">
                    <strong>Ngày tạo</strong>
                    <p>{item?.createDate || '-'}</p>
                </div>
                <div className="custom-col">
                    <strong>Người tạo</strong>
                    <p>{item.verifier}</p>
                </div>
            </div>
        </div>
    );
}

const RecipeDataList = ({ list, onEdit, onDelete, currentPage, maxPage, paginateCallback }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    let listUserMarkup = list.slice((currentPage - 1) * MAX_ITEMS, currentPage * MAX_ITEMS).map((item, index) => (
        <li key={item.dishId} className={styles.dataItem}>
            <span className={styles.no}>{index + 1 + (currentPage - 1) * MAX_ITEMS}</span>
            <span>{item.dishName || '-'}</span>
            <span>{item.formulaDescribe || '-'}</span>
            <span>{item?.createDate || '-'}</span>
            <span>{item.verifier}</span>
            <span>
                <div className="d-flex align-items-center mw-60-px gap-sm">
                    <SettingOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#289AE7',
                        }}
                        onClick={() => onEdit(item.dishId)}
                    />
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#f53838',
                        }}
                        onClick={() => onDelete(item.dishId)}
                    />
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listUserMarkup = list.map((item, index) => (
            <MobileCard no={index + 1} key={item.dishId} item={item} onEdit={onEdit} onDelete={onDelete} />
        ));
    }

    return (
        <>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong>Tên công thức</strong>
                        <strong>Mô tả</strong>
                        <strong>Ngày tạo </strong>
                        <strong>Người tạo</strong>
                        <strong />
                    </li>
                )}
                {listUserMarkup}
            </ul>
            {!isMobile && (
                <Paginator
                    curPage={currentPage}
                    maxPage={maxPage}
                    scrollAfterClicking
                    isLoading={false}
                    callback={(page) => {
                        paginateCallback(page);
                    }}
                />
            )}
        </>
    );
};

export default RecipeDataList;
