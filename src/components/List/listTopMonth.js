import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import HomeRecipeItem from './HomeRecipeItem';
import { getTopMonthListRecipeRequest } from '../../api/requests/recipe.request';

const ListTopMonth = (props) => {
    const [ListTopMonth, setListTopMonth] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        getTopMonthListRecipeRequest()
            .then(({ data }) => setListTopMonth(data))
            .catch((error) => setErrMsg(error?.message));
    }, []);

    const [errMsg, setErrMsg] = useState('');

    return (
        <>
            <div className="home-list__title">Top With Month</div>
            <p className="error-message">{errMsg}</p>
            <section className="home__list-recipe__container">
                {ListTopMonth.map((item) => (
                    <HomeRecipeItem key={item.dishID || item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
        </>
    );
};
export default ListTopMonth;
