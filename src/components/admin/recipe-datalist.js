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
                            onClick={() => onEdit(item.dishID)}
                        />
                        <DeleteOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#f53838',
                            }}
                            onClick={() => onDelete(item.dishID)}
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

    let listRecipeMarkup = list.map((item, index) => (
        <li key={item.dishID} className={styles.dataItem}>
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
                        onClick={() => onEdit(item.dishID)}
                    />
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#f53838',
                        }}
                        onClick={() => onDelete(item.dishID)}
                    />
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listRecipeMarkup = list.map((item, index) => (
            <MobileCard no={index + 1} key={item.dishID} item={item} onEdit={onEdit} onDelete={onDelete} />
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
                {listRecipeMarkup}
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

export default RecipeDataList;
