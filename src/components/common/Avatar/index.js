import React from 'react';
import { IMAGE_PLACEHODLER_URI } from '../../../constants';
import './index.scss';

const Avatar = ({ imgSrc, onClick }) => {
    return (
        <div className="global-avatar__container">
            <img
                src={imgSrc || IMAGE_PLACEHODLER_URI}
                alt=""
                onClick={() => {
                    if (onClick) {
                        onClick();
                    }
                }}
            />
        </div>
    );
};

export default Avatar;
