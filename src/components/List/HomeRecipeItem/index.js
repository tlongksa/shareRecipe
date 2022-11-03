import React from 'react';

const HomeRecipeItem = ({ item, navigateTo }) => {
    return (
        <div
            onClick={() => {
                navigateTo(`/view-detail/${item.dishID || item.dishId}`);
            }}
            className="home-dish__item"
        >
            <div className="view-week">
                <img className="view-img" src={item.urlImage || 'https://via.placeholder.com/150'} alt="img" />

                <div className="text-view">
                    <h5>{item.name} </h5>
                    <div className="view-top">Độ khó: {item.level}</div>
                    <div className="view-top">Mô tả: {item.summary}</div>
                    <div className="view-top">Thời gian: {item.time}</div>
                    <div className="view-top">Đánh giá: {item.avgStarRate} ⭐</div>
                </div>
            </div>
        </div>
    );
};

export default HomeRecipeItem;
