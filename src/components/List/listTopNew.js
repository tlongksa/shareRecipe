import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../api/apiUrl';
import './index.scss';
import HomeRecipeItem from './HomeRecipeItem';

const ListTopNew = (props) => {
    const [ListTopNew, setListTopNew] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        async function getData() {
            const res = await axios.get(apiUrl.TOPNEW_URL);
            return res;
        }
        getData()
            .then((res) => setListTopNew(res?.data))
            .catch((error) => setErrMsg(error.message));
    }, []);

    const [errMsg, setErrMsg] = useState('');

    return (
        <>
            <div className="home-list__title">Top With New</div>
            <p className="error-message">{errMsg}</p>
            <section className="home__list-category__container">
                {ListTopNew.map((item) => (
                    <HomeRecipeItem key={item.dishID || item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
        </>
    );
};
export default ListTopNew;
