import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
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
        errRef.current.focus();
    }, []);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    return (
        <>
            <div className="home-list__title">Top With New</div>
            <section className="view-container">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                    {errMsg}
                </p>
                {ListTopNew.map((item) => (
                    <HomeRecipeItem key={item.dishId} item={item} navigateTo={navigateTo} />
                ))}
            </section>
        </>
    );
};
export default ListTopNew;
