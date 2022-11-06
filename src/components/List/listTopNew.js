import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import HomeRecipeItem from './HomeRecipeItem';
import { getTopNewListRecipeRequest } from '../../api/requests/recipe.request';

const ListTopNew = (props) => {
    const [ListTopNew, setListTopNew] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        getTopNewListRecipeRequest()
            .then(({ data }) => setListTopNew(data))
            .catch((error) => setErrMsg(error?.message));
    }, []);

    const [errMsg, setErrMsg] = useState('');

    return (
        <>
            <div className="home-list__title">Top With New</div>
            <p className="error-message">{errMsg}</p>
            <section className="home__list-recipe__container">
                {ListTopNew.map((item) => (
                    <HomeRecipeItem key={item.dishID || item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
        </>
    );
};
export default ListTopNew;
