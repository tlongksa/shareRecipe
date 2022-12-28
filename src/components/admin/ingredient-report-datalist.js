import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Paginator from '../common/Paginator';

function MobileCard({ item, no, onEdit, onDelete, hideAdminActions }) {
    return (
        <div className="custom-card">
            <div className="custom-row">
                {!hideAdminActions && (
                    <div className="custom-col">
                        <strong />
                        <div className="d-flex align-items-center mw-80-px gap-2">
                            <SettingOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 16,
                                    color: '#289AE7',
                                }}
                                onClick={() => onEdit(item)}
                            />
                            <DeleteOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 18,
                                    color: '#f53838',
                                }}
                                onClick={() => onDelete(item.ingredientConflictId)}
                            />
                        </div>
                    </div>
                )}
                <div className="custom-col">
                    <strong>No</strong>
                    <p>{no}</p>
                </div>
                <div className="custom-col">
                    <strong>Nguyên liệu A</strong>
                    <p>{item.ingredientA}</p>
                </div>
                <div className="custom-col">
                    <strong>Nguyên liệu B</strong>
                    <p>{item.ingredientB}</p>
                </div>
                <div className="custom-col">
                    <strong>Hậu quả</strong>
                    <p>{item?.consequence}</p>
                </div>
                {!hideAdminActions && (
                    <>
                        <div className="custom-col">
                            <strong>Người tạo</strong>
                            <p>{item.createUsername}</p>
                        </div>
                        <div className="custom-col">
                            <strong>Ngày tạo</strong>
                            <p>{item.createDate?.join('-')}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const IngredientReportDataList = ({
    list,
    onEdit,
    onDelete,
    currentPage,
    maxPage,
    paginateCallback,
    hideAdminActions,
}) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    let listRecipeMarkup = list.map((item, index) => (
        <li key={item.ingredientConflictId} className={styles.dataItem}>
            <span className={styles.no}>{(currentPage - 1) * 20 + index + 1}</span>
            <span>{item.ingredientA}</span>
            <span>{item.ingredientB}</span>
            <span className="pe-4">{item?.consequence}</span>
            {!hideAdminActions && (
                <>
                    <span>{item.createUsername}</span>
                    <span>{item.createDate?.join('-')}</span>
                    <span>
                        <div className="d-flex align-items-center mw-80-px gap-sm">
                            <SettingOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 18,
                                    color: '#289AE7',
                                }}
                                onClick={() => onEdit(item)}
                            />
                            <DeleteOutlined
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 18,
                                    color: '#f53838',
                                }}
                                onClick={() => onDelete(item.ingredientConflictId)}
                            />
                        </div>
                    </span>
                </>
            )}
        </li>
    ));

    if (isMobile) {
        listRecipeMarkup = list.map((item, index) => (
            <MobileCard
                no={(currentPage - 1) * 20 + index + 1}
                key={item.ingredientConflictId}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                hideAdminActions={hideAdminActions}
            />
        ));
    }

    return (
        <>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong>Nguyên liệu A</strong>
                        <strong>Nguyên liệu B </strong>
                        <strong className="pe-4">Hậu quả</strong>
                        {!hideAdminActions && (
                            <>
                                <strong>Người tạo</strong>
                                <strong>Ngày tạo</strong>
                                <strong />
                            </>
                        )}
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

export default IngredientReportDataList;
