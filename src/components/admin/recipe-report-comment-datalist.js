import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Paginator from '../common/Paginator';
import { MAX_ITEMS } from '../../constants';

function MobileCard({ item, no, onEdit, onDelete }) {
    return (
        <div className="custom-card">
            <div className="custom-row">
                <div className="custom-col">
                    <strong />
                    <div className="d-flex align-items-center mw-60-px gap-2">
                        <DeleteOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#f53838',
                            }}
                            onClick={() => onDelete(item.dishCommentID)}
                        />
                        <CloseCircleOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#289AE7',
                            }}
                            onClick={() => onEdit(item.dishCommentID)}
                        />
                    </div>
                </div>
                <div className="custom-col">
                    <strong>No</strong>
                    <p>{no}</p>
                </div>
                <div className="custom-col">
                    <strong>Mô tả nội dung</strong>
                    <p>{item.content?.substr(0, 45)}</p>
                </div>
                <div className="custom-col">
                    <strong>Ngày tạo</strong>
                    <p>{item?.createDate || '-'}</p>
                </div>
                <div className="custom-col">
                    <strong>Người tạo</strong>
                    <p>{item.accountUserName}</p>
                </div>
                <div className="custom-col">
                    <strong>Lượt thích</strong>
                    <p>{item.totalLike}</p>
                </div>
                <div className="custom-col">
                    <strong>Lượt không thích</strong>
                    <p>{item.totalDisLike}</p>
                </div>
                <div className="custom-col">
                    <strong>Cảnh báo</strong>
                    <p>{item.flag}</p>
                </div>
            </div>
        </div>
    );
}

const RecipeReportCommentDataList = ({ list, onEdit, onDelete, currentPage, maxPage, paginateCallback }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    let listRecipeCommentReportMarkup = list.map((item, index) => (
        <li key={item.dishCommentID} className={styles.dataItem}>
            <span className={styles.no}>{(currentPage - 1) * MAX_ITEMS + index + 1}</span>
            <span>{item.content?.substr(0, 45)}</span>
            <span>{item?.createDate || '-'}</span>
            <span>{item.accountUserName}</span>
            <span>{item.totalLike}</span>
            <span>{item.totalDisLike}</span>
            <span>{item.flag}</span>
            <span>
                <div className="d-flex align-items-center mw-60-px gap-sm">
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#f53838',
                        }}
                        onClick={() => onDelete(item.dishCommentID)}
                    />
                    <CloseCircleOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#289AE7',
                        }}
                        onClick={() => onEdit(item.dishCommentID)}
                    />
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listRecipeCommentReportMarkup = list.map((item, index) => (
            <MobileCard
                no={(currentPage - 1) * MAX_ITEMS + index + 1}
                key={item.dishCommentID}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ));
    }

    return (
        <>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong>Mô tả nội dung</strong>
                        <strong>Ngày tạo </strong>
                        <strong>Người tạo</strong>
                        <strong>Lượt thích</strong>
                        <strong>Lượt không thích</strong>
                        <strong>Cảnh báo</strong>
                        <strong />
                    </li>
                )}
                {listRecipeCommentReportMarkup}
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

export default RecipeReportCommentDataList;
