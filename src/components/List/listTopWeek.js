import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
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
        errRef.current.focus();
    }, []);

    const navigateTo = useNavigate();

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    return (
        <>
            <p className="home-list__title">Top With Week</p>
            <section className="view-container">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                    {errMsg}
                </p>
                {ListTopWeek.map((item) => (
                    <HomeRecipeItem key={item.dishID || item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
        </>
    );
};
export default ListTopWeek;
