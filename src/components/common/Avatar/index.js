import React from 'react';
import './index.scss';

const Avatar = ({ imgSrc, onClick }) => {
    return (
        <div className="global-avatar__container">
            <img
                src={
                    'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                }
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
