import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import ViewComments from '../ViewComment/ViewComment';
import { Button, Checkbox, Divider } from 'antd';

const ViewDetail = () => {
    const { dishId } = useParams();
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ingredient, setIngredient] = useState([]);
    const [replacementIngredientList, setReplacementIngredientList] = useState([]);

    const [checkedIngredientList, setCheckedIngredientList] = useState([]);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [bigRecipeImg, setBigRecipeImg] = useState('');

    const getDataDetail = () => {
        axios
            .get(`/getRecipeDetail?dishId=${dishId}`)
            .then((response) => {
                setRecipe(response.data);
                setIngredient(response.data.ingredientDetailList);
                // setCheckedIngredientList(indeterminate.ingredientDetailId);
                setBigRecipeImg(response.data?.dishImageList?.[0]?.url);
            })
            .catch((error) => console.log(error));
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getDataDetail();
    }, []);

    const mapReplacementIngredient = (rootIngId) => {
        return replacementIngredientList.find((item) => item.ingredientDetailId === rootIngId);
    };

    const Loading = () => {
        return <>Loading.....</>;
    };

    const ShowRecipe = () => {
        const [loadings, setLoadings] = useState([]);

        const enterLoading = (index) => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = true;
                return newLoadings;
            });
            setTimeout(() => {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[index] = false;
                    return newLoadings;
                });
            }, 2000);
        };

        const changeIngredient = () => {
            axios
                .get(`/getIngredientChange?ingredientDetailId=${checkedIngredientList.join(',')}`)
                .then((response) => {
                    setReplacementIngredientList(response.data);
                })
                .catch((error) => console.log(error));
            setLoading(false);
        };
        return (
            <>
                <div className="container-list" key={recipe.dishId}>
                    <div className="left-view">
                        <img src={bigRecipeImg} alt={recipe.dishName} className="img-view-detail" />
                        <div>
                            {recipe.dishImageList?.map((listImg) => (
                                <div key={listImg.dishImageID}>
                                    <img
                                        className="img-view-show"
                                        src={listImg.url}
                                        alt="img"
                                        onClick={() => setBigRecipeImg(listImg.url)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="right-view">
                        <h1 className="h1-text">{recipe.dishName}</h1>
                        <div className="text-view">T???ng quan:{recipe.summary}</div>
                        <div className="text-view">M?? t???: {recipe.formulaDescribe}</div>
                        <div className="text-view">T???ng kalo: {recipe.totalCalo} </div>
                        <div className="text-view">M???c ?????: {recipe.level}</div>
                        <div className="text-view">S??? ng?????i ????nh gi??: {recipe.numberPeopleForDish}</div>
                        <div className="text-view">
                            T???o ng??y: {recipe.createDate} b???i {recipe.verifier}{' '}
                        </div>
                    </div>
                </div>
                <div className="view-comment">
                    <hr />
                    <h3 className="view-title">Nguy??n li???u:</h3>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setCheckedIngredientList(ingredient.map((ing) => ing.ingredientDetailId));
                            } else {
                                setCheckedIngredientList([]);
                            }
                            setIndeterminate(false);
                            setCheckAll(e.target.checked);
                        }}
                        checked={checkAll}
                    >
                        Check all
                    </Checkbox>
                    <Divider />
                    {ingredient?.map((listIngredient) => (
                        <div className="view-ingredien" key={listIngredient.ingredientDetailId}>
                            <Checkbox
                                checked={checkedIngredientList.includes(listIngredient.ingredientDetailId)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCheckedIngredientList((prevState) => [
                                            ...prevState,
                                            listIngredient.ingredientDetailId,
                                        ]);
                                    } else {
                                        setCheckedIngredientList((prevState) =>
                                            prevState.filter((item) => item !== listIngredient.ingredientDetailId),
                                        );
                                    }
                                }}
                            >
                                {listIngredient.name}: {listIngredient.quantity} {listIngredient.unit}{' '}
                                {replacementIngredientList.length > 0 &&
                                    `${
                                        mapReplacementIngredient(listIngredient.ingredientDetailId)?.ingredientChangeId
                                            ? ` - ???????c thay th??? b???i ${
                                                  mapReplacementIngredient(listIngredient.ingredientDetailId)?.name
                                              } ${
                                                  mapReplacementIngredient(listIngredient.ingredientDetailId)?.quantity
                                              } ${mapReplacementIngredient(listIngredient.ingredientDetailId)?.unit}`
                                            : ' - Kh??ng t??m th???y nguy??n li???u thay th??? cho nguy??n li???u n??y'
                                    }`}
                            </Checkbox>
                        </div>
                    ))}
                    Nguy??n li???u thay th???:
                    {replacementIngredientList?.map((list) => {
                        return (
                            <div key={list.ingredientDetailId}>
                                {list.name} {list.quantity} {list.unit}
                            </div>
                        );
                    })}
                    <Button
                        style={{ float: 'right', marginRight: '20%', borderRadius: '5px' }}
                        type="primary"
                        loading={loadings[1]}
                        onClick={() => changeIngredient()}
                        checked={checkAll}
                    >
                        T??m ki???m
                    </Button>
                    <Divider />
                    <h3 className="view-title">C??ch l??m :</h3>
                    <div className="view-ingredien">B1: .....Loading......</div>
                    <div className="view-ingredien">B2:.....Loading......</div>
                    <div className="view-ingredien">B3:.....Loading......</div>
                    <h3 className="view-title">Video H?????ng D???n :</h3>
                    {/* <div className="view-video">
                        link video this this here
                        <iframe
                            width="562"
                            height="395"
                            src={src}
                            title="Youtube Player"
                            frameborder="0"
                        />
                    </div> */}
                    <hr />
                    <div>
                        <ViewComments />
                    </div>
                </div>
            </>
        );
    };

    // handleTab = (index) => {
    //     this.setState({ index: index })
    //     const images = this.myRef.current.children;
    //     for (let i = 0; i < images.length; i++) {
    //         images[i].className = images[i].className.replace("active", "");
    //     }
    //     images[index].className = "active";
    // };

    return (
        <>
            <div className="container">
                <div className="row">{loading ? <Loading /> : <ShowRecipe />}</div>
            </div>
        </>
    );
};
export default ViewDetail;
