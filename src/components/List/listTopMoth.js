import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import apiUrl from '../../api/apiUrl';

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
        errRef.current.focus();
    }, []);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    return (
        <div>
            <div className="home-list__title ff-dancing-script">Top With Month</div>
            <section className="view-container">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                    {errMsg}
                </p>
                {ListTopMonth.map((list) => {
                    return (
                        <div
                            key={list.dishId}
                            onClick={() => {
                                navigateTo(`/view-detail/${list.dishID}`);
                            }}
                            className="home-dish__item"
                        >
                            <div className="view-week">
                                <img className="view-img" src={list.urlImage} alt="img" />

                                <div className="text-view">
                                    <h5>{list.name} </h5>
                                    <div className="view-top">Độ khó: {list.level}</div>
                                    <div className="view-top">Mô tả: {list.summary}</div>
                                    <div className="view-top">Thời gian: {list.time}</div>
                                    <div className="view-top">Đánh giá: {list.avgStarRate} ⭐</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};
export default ListTopMonth;
