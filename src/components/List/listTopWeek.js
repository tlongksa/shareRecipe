import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeRecipeItem from './HomeRecipeItem';
import './index.scss';

const ListTopWeek = (props) => {
    const [ListTopWeek, setListTopWeek] = useState([]);

    useEffect(() => {
        async function getData() {
            const res = await axios.get('/getTop5VoteWeek'); // link api get
            return res;
        }
        getData()
            .then((res) => setListTopWeek(res?.data))
            .catch((error) => setErrMsg(error.message));
    }, []);

    const navigateTo = useNavigate();

    const [errMsg, setErrMsg] = useState('');

    return (
        <>
            <p className="home-list__title">Top With Week</p>
            <p className="error-message">{errMsg}</p>
            <section className="home__list-category__container">
                {ListTopWeek.map((item) => (
                    <HomeRecipeItem key={item.dishID || item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
        </>
    );
};
export default ListTopWeek;
