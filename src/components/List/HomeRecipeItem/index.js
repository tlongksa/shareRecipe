import React from 'react';
import { showRecipeLevelText } from '../../../utils';

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
            <div className="view-week">
                <img
                    className="view-img"
                    src={item.urlImage || item.image || 'https://via.placeholder.com/150'}
                    alt="img"
                />
                <div className="recipe-info__text-view">
                    <h5 className="home-recipe__item-name">{item.name} </h5>
                    <div className="view-top">Độ khó: {showRecipeLevelText(item.level)}</div>
                    <div className="view-top">Mô tả: {item.summary}</div>
                    <div className="view-top">Thời gian: {item.time} phút</div>
                    <div className="view-top">Đánh giá: {item.avgStarRate} ⭐</div>
                </div>
            </div>
        </div>
    );
};

export default HomeRecipeItem;
