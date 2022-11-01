import React from 'react';
import styles from './data-list.module.css';
import { useMediaQuery } from 'react-responsive';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';

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
                    <strong>Tên thể loại</strong>
                    <p>{item.name}</p>
                </div>
                <div className="custom-col">
                    <strong>Ảnh mô tả</strong>
                    <p>
                        <img src={item.dishCategoryImage} alt="" width={120} />
                    </p>
                </div>
            </div>
        </div>
    );
}

const RecipeCategoryDatalist = ({ list, onEdit, onDelete }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    let listRecipeCategoryMarkup = list.map((item, index) => (
        <li key={item.dishCategoryID} className={styles.dataItem}>
            <span className={styles.no}>{index + 1}</span>
            <span>{item.name || '-'}</span>
            <span>
                <img src={item.dishCategoryImage} alt="" width={120} />
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
        listRecipeCategoryMarkup = list.map((item, index) => (
            <MobileCard no={index + 1} key={item.dishCategoryID} item={item} onEdit={onEdit} onDelete={onDelete} />
        ));
    }
    return (
        <div>
            <ul className={styles.dataList}>
                {!isMobile && (
                    <li className={[styles.dataItem, styles.dataItemHead].join(' ')}>
                        <strong className={styles.no}>No</strong>
                        <strong>Tên thể loại</strong>
                        <strong>Ảnh mô tả</strong>
                        <strong />
                    </li>
                )}
                {listRecipeCategoryMarkup}
            </ul>
        </div>
    );
};

export default RecipeCategoryDatalist;
