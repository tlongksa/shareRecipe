import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './index.scss';
import apiUrl from '../../api/apiUrl';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ListCategory = (props) => {
    const [listCategory, setListCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const res = await axios.get(apiUrl.CATEGORY_URL);
            setLoading(false);
            return res;
        }
        getData()
            .then((res) => setListCategory(res?.data))
            .catch((error) => setErrMsg(error.message));
        errRef.current.focus();
    }, []);

    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const ShowCategory = () => {
        return (
            <div>
                <div className="home-category-list__title">Catergory</div>
                <section className="view-container">
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                        {errMsg}
                    </p>
                    {listCategory.map((list) => (
                        <Link key={list.dishCategoryID} to={`/list-recipe-by-category/${list.dishCategoryID}`}>
                            <div className="category-list__item">
                                <img className="view-img-category" src={list.dishCategoryImage} alt="img" />
                                <h5 className="recipe__category-name">{list.name}</h5>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        );
    };
    return (
        <>
            <div className="row">
                {loading ? (
                    <div className="global-list__loader-container">
                        <LoadingOutlined className="global-list__loader-icon" />
                    </div>
                ) : (
                    <ShowCategory />
                )}
            </div>
        </>
    );
};
export default ListCategory;
