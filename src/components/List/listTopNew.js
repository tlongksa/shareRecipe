import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import HomeRecipeItem from './HomeRecipeItem';
import { getTopNewListRecipeRequest } from '../../api/requests/recipe.request';
import { LoadingOutlined } from '@ant-design/icons';

const ListTopNew = (props) => {
    const [ListTopNew, setListTopNew] = useState([]);
    const navigateTo = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTopNewListRecipeRequest()
            .then(({ data }) => {
                setListTopNew(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrMsg(error?.message);
                setIsLoading(false);
            });
    }, []);

    const [errMsg, setErrMsg] = useState('');

    return (
        <div className="bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow">
            <div className="home-list__title ff-dancing-script">🔥 Món ăn mới nhất</div>
            <p className="error-message">{errMsg}</p>
            <section className="home__list-recipe__container">
                {ListTopNew.map((item) => (
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
export default ListTopNew;
