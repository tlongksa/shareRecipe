import { LoadingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopWeekListRecipeRequest } from '../../api/requests/recipe.request';
import HomeRecipeItem from './HomeRecipeItem';
import './index.scss';

const ListTopWeek = (props) => {
    const [ListTopWeek, setListTopWeek] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTopWeekListRecipeRequest()
            .then(({ data }) => {
                setListTopWeek(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrMsg(error?.message);
                setIsLoading(false);
            });
    }, []);

    const navigateTo = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    return (
        <div className="bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow">
            <div className="home-list__title should-darken ff-dancing-script">🔥 Món ăn theo tuần</div>
            <p className="error-message">{errMsg}</p>
            <section className="home__list-recipe__container">
                {ListTopWeek.map((item) => (
                    <HomeRecipeItem key={item.dishID || item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
            {isLoading && (
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            )}
        </div>
    );
};
export default ListTopWeek;
