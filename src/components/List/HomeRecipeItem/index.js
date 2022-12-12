import React from 'react';
import clockImg from '../../../assets/img/clock.png';
import starImg from '../../../assets/img/star.png';
import lightningImg from '../../../assets/img/lightning.png';
import { showRecipeLevelText } from '../../../utils';
import '../index.scss';

const HomeRecipeItem = ({ item, navigateTo }) => {
    return (
        <div
            onClick={() => {
                navigateTo(`/recipe-detail/${item.dishID || item.dishId}`);
                window.scrollTo({
                    top: 0,
                    left: 0,
                });
            }}
            className="home-dish__item"
        >
            <div className="home-dish__item-content">
                <img
                    className="home-dish__item-img"
                    src={item.urlImage || item.image || 'https://via.placeholder.com/150'}
                    alt="img"
                />
                <div className="recipe-info__text-view">
                    <h5 className="home-recipe__item-name">{item.name} </h5>
                    <div className="d-flex gap-2 justify-content-between mt-3">
                        <div className="recipe-item__extra-info">
                            <img src={clockImg} alt="" /> {item.time} phút
                        </div>
                        <div className="recipe-item__extra-info">
                            <img src={lightningImg} alt="" /> {showRecipeLevelText(item.level)}
                        </div>
                        <div className="recipe-item__extra-info">
                            <img src={starImg} alt="" /> {item.avgStarRate}/5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeRecipeItem;
