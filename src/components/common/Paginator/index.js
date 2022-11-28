/** @format */

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import PropTypes from 'prop-types';
import styles from './paginator.module.scss';

const Paginator = ({ curPage, isLoading, maxPage, scrollAfterClicking, callback }) => {
    const gotoPage = (page) => {
        callback(page);
        if (scrollAfterClicking) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    if (isLoading) {
        return null;
    }
    if (!maxPage || maxPage <= 1) {
        return null;
    }

    return (
        <div className={styles.paginatorWrap}>
            <ul
                className={styles.paginator}
                style={{
                    width: 'fit-content !important',
                }}
            >
                <li className={[styles.paginator__item, curPage === 1 ? 'divDisabled' : ''].join(' ')}>
                    <button onClick={() => gotoPage(curPage - 1)} className={styles['paginator-nav__btn']}>
                        <ChevronLeft />
                    </button>
                </li>
                {Array(maxPage)
                    .fill(1)
                    .map((_, index) => (
                        <li
                            key={index}
                            className={[
                                styles.paginator__item,
                                curPage === index + 1 ? styles.paginator__itemActive : '',
                            ].join(' ')}
                        >
                            <button onClick={() => gotoPage(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                <li className={[styles.paginator__item, curPage === maxPage ? 'divDisabled' : ''].join(' ')}>
                    <button onClick={() => gotoPage(curPage + 1)} className={styles['paginator-nav__btn']}>
                        <ChevronRight />
                    </button>
                </li>
            </ul>
        </div>
    );
};

Paginator.propTypes = {
    maxPage: PropTypes.number,
    curPage: PropTypes.number,
    setCurPage: PropTypes.func,
    isLoading: PropTypes.bool,
    scrollAfterClicking: PropTypes.bool,
};

export default Paginator;
