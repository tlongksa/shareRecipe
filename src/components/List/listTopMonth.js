import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import apiUrl from '../../api/apiUrl';
import HomeRecipeItem from './HomeRecipeItem';

const ListTopMonth = (props) => {
    const [ListTopMonth, setListTopMonth] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        async function getData() {
            const res = await axios.get(apiUrl.TOPMONTH_URL); // link api get
            return res;
        }
        getData()
            .then((res) => setListTopMonth(res?.data))
            .catch((error) => setErrMsg(error.message));
    }, []);

    const [errMsg, setErrMsg] = useState('');

    return (
        <>
            <div className="home-list__title">Top With Month</div>
            <p className="error-message">{errMsg}</p>
            <section className="home__list-category__container">
                {ListTopMonth.map((item) => (
                    <HomeRecipeItem key={item.dishID || item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
        </>
    );
};
export default ListTopMonth;