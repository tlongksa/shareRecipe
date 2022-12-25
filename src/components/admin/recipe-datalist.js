import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Paginator from '../common/Paginator';
import { MAX_ITEMS } from '../../constants';

function MobileCard({ item, no, onEdit, onDelete, onView }) {
    return (
        <div className="custom-card">
            <div className="custom-row">
                <div className="custom-col">
                    <strong />
                    <div className="d-flex align-items-center mw-80-px gap-2">
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
                        {onView && (
                            <EyeOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 18,
                                }}
                                onClick={() => onView(item.dishID)}
                            />
                        )}
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
                    <p>{item.formulaDescribe?.substr(0, 45)}</p>
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

const RecipeDataList = ({ list, onEdit, onDelete, currentPage, maxPage, paginateCallback, onView }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    let listRecipeMarkup = list.map((item, index) => (
        <li key={item.dishID} className={styles.dataItem}>
            <span className={styles.no}>{(currentPage - 1) * MAX_ITEMS + index + 1}</span>
            <span className="pe-4">{item.dishName || '-'}</span>
            <span className="pe-4">{item.formulaDescribe?.substr(0, 45) || '-'}</span>
            <span>{item?.createDate || '-'}</span>
            <span>{item.verifier}</span>
            <span>
                <div className="d-flex align-items-center mw-80-px gap-sm">
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
                    {onView && (
                        <EyeOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                            }}
                            onClick={() => onView(item.dishID)}
                        />
                    )}
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listRecipeMarkup = list.map((item, index) => (
            <MobileCard
                no={(currentPage - 1) * MAX_ITEMS + index + 1}
                key={item.dishID}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
            />
        ));
    }

    return (
        <>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong className="pe-4">Tên công thức</strong>
                        <strong className="pe-4">Mô tả</strong>
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
