import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Paginator from '../common/Paginator';

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
                            onClick={() => onEdit(item.dishCommentID)}
                        />
                        <DeleteOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#f53838',
                            }}
                            onClick={() => onDelete(item.dishCommentID)}
                        />
                    </div>
                </div>
                <div className="custom-col">
                    <strong>No</strong>
                    <p>{no}</p>
                </div>
                <div className="custom-col">
                    <strong>Mô tả nội dung</strong>
                    <p>{item.content}</p>
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
            <span className={styles.no}>{index + 1}</span>
            <span>{item.content}</span>
            <span>{item?.createDate || '-'}</span>
            <span>{item.accountUserName}</span>
            <span>{item.totalLike}</span>
            <span>{item.totalDisLike}</span>
            <span>{item.flag}</span>
            <span>
                <div className="d-flex align-items-center mw-60-px gap-sm">
                    <SettingOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#289AE7',
                        }}
                        onClick={() => onEdit(item.dishCommentID)}
                    />
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#f53838',
                        }}
                        onClick={() => onDelete(item.dishCommentID)}
                    />
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listRecipeCommentReportMarkup = list.map((item, index) => (
            <MobileCard no={index + 1} key={item.dishCommentID} item={item} onEdit={onEdit} onDelete={onDelete} />
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
