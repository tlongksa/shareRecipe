import React, { useState } from 'react';
import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { MAX_ITEMS } from '../../constants';
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
                            onClick={() => onEdit(item.dishCategoryID)}
                        />
                        <DeleteOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#f53838',
                            }}
                            onClick={() => onDelete(item.dishCategoryID)}
                        />
                    </div>
                </div>
                <div className="custom-col">
                    <strong>No</strong>
                    <p>{no}</p>
                </div>
                <div className="custom-col">
                    <strong>Id</strong>
                    <p>{item.dishCategoryID}</p>
                </div>
                <div className="custom-col">
                    <strong>Tên thể loại</strong>
                    <p>{item.name}</p>
                </div>
                <div className="custom-col">
                    <strong>Ảnh mô tả</strong>
                    <p>
                        <img src={item.dishCategoryImage} alt="" width={80} />
                    </p>
                </div>
            </div>
        </div>
    );
}

const RecipeCategoryDatalist = ({ list, onEdit, onDelete }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    const [curPage, setCurPage] = useState(1);

    let listRecipeCategoryMarkup = list.slice((curPage - 1) * MAX_ITEMS, curPage * MAX_ITEMS).map((item, index) => (
        <li key={item.dishCategoryID} className={styles.dataItem}>
            <span className={styles.no}>{index + 1}</span>
            <span>{item.dishCategoryID}</span>
            <span>{item.name || '-'}</span>
            <span>
                <img src={item.dishCategoryImage} alt="" width={80} />
            </span>
            <span>
                <div className="d-flex align-items-center mw-60-px gap-sm">
                    <SettingOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#289AE7',
                        }}
                        onClick={() => onEdit(item.dishCategoryID)}
                    />
                    <DeleteOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#f53838',
                        }}
                        onClick={() => onDelete(item.dishCategoryID)}
                    />
                </div>
            </span>
        </li>
    ));

    if (isMobile) {
        listRecipeCategoryMarkup = list
            .slice((curPage - 1) * MAX_ITEMS, curPage * MAX_ITEMS)
            .map((item, index) => (
                <MobileCard no={index + 1} key={item.dishCategoryID} item={item} onEdit={onEdit} onDelete={onDelete} />
            ));
    }
    return (
        <div>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong>Id</strong>
                        <strong>Tên thể loại</strong>
                        <strong>Ảnh mô tả</strong>
                        <strong />
                    </li>
                )}
                {listRecipeCategoryMarkup}
                <Paginator
                    curPage={curPage}
                    maxPage={Math.ceil(list.length / MAX_ITEMS)}
                    callback={(page) => setCurPage(page)}
                    scrollAfterClicking
                    isLoading={false}
                />
            </ul>
        </div>
    );
};

export default RecipeCategoryDatalist;
