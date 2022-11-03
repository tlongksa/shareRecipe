import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';
import ViewComments from './ViewComment';
import { Button, Checkbox, Divider } from 'antd';
import { getRecipeDetailRequest, getRecipeIngredientChangeRequest } from '../../api/requests';
import { LoadingOutlined } from '@ant-design/icons';

const ClientRecipeDetail = () => {
    const { dishId } = useParams();
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ingredient, setIngredient] = useState([]);
    const [replacementIngredientList, setReplacementIngredientList] = useState([]);

    const [checkedIngredientList, setCheckedIngredientList] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [bigRecipeImg, setBigRecipeImg] = useState('');

    const getDataDetail = () => {
        setLoading(true);
        getRecipeDetailRequest(dishId)
            .then(({ data }) => {
                setRecipe(data);
                setIngredient(data?.ingredientDetailList);
                setBigRecipeImg(data?.dishImageList?.[0]?.url);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    useEffect(() => {
        getDataDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mapReplacementIngredient = (rootIngId) => {
        return replacementIngredientList.find((item) => item.ingredientDetailId === rootIngId);
    };

    const ShowRecipe = () => {
        const [loadings] = useState([]);

        const changeIngredient = () => {
            getRecipeIngredientChangeRequest(checkedIngredientList.join(','))
                .then((response) => {
                    setReplacementIngredientList(response.data);
                })
                .catch((error) => console.log(error));
        };

        return (
            <div className="recipe-detail__container">
                <div className="custom-page__container">
                    <div className="top-info__container">
                        <div className="left-view">
                            <img src={bigRecipeImg} alt={recipe.dishName} className="img-view-detail" />
                            <div className="flex-full d-flex">
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
                        <div className="right-view flex-fill">
                            <h1 className="mb-3">{recipe.dishName}</h1>
                            <div className="mb-3">Tổng quan:{recipe.summary}</div>
                            <div className="mb-3">Mô tả: {recipe.formulaDescribe}</div>
                            <div className="mb-3">Tổng kalo: {recipe.totalCalo} </div>
                            <div className="mb-3">Mức độ: {recipe.level}</div>
                            <div className="mb-3">Số người đánh giá: {recipe.numberPeopleForDish}</div>
                            <div className="mb-3">
                                Tạo ngày: {recipe.createDate} bởi {recipe.verifier}
                            </div>
                        </div>
                    </div>
                    <div className="view-comment">
                        <hr />
                        <h3 className="view-title">Nguyên liệu:</h3>
                        <Checkbox
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setCheckedIngredientList(ingredient.map((ing) => ing.ingredientDetailId));
                                } else {
                                    setCheckedIngredientList([]);
                                }
                                setCheckAll(e.target.checked);
                            }}
                            checked={checkAll}
                        >
                            Check all
                        </Checkbox>
                        <Divider />
                        {ingredient?.map((listIngredient) => (
                            <div className="view-ingredient" key={listIngredient.ingredientDetailId}>
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
                                            mapReplacementIngredient(listIngredient.ingredientDetailId)
                                                ?.ingredientChangeId
                                                ? ` - được thay thế bởi ${
                                                      mapReplacementIngredient(listIngredient.ingredientDetailId)?.name
                                                  } ${
                                                      mapReplacementIngredient(listIngredient.ingredientDetailId)
                                                          ?.quantity
                                                  } ${
                                                      mapReplacementIngredient(listIngredient.ingredientDetailId)?.unit
                                                  }`
                                                : ' - Không tìm thấy nguyên liệu thay thế cho nguyên liệu này'
                                        }`}
                                </Checkbox>
                            </div>
                        ))}
                        <br />
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>Nguyên liệu thay thế:</h3>
                            <Button
                                style={{ borderRadius: '5px' }}
                                type="primary"
                                loading={loadings[1]}
                                onClick={() => changeIngredient()}
                                checked={checkAll}
                            >
                                Tìm kiếm
                            </Button>
                        </div>
                        {replacementIngredientList?.map((list) => (
                            <div key={list.ingredientDetailId}>
                                {list.name} {list.quantity} {list.unit}
                            </div>
                        ))}
                        <Divider />
                        <h3 className="view-title">Cách làm :</h3>
                        <h3 className="view-title">Video Hướng Dẫn :</h3>
                        <hr />
                        <ViewComments />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {loading ? (
                <div className="recipe-detail__container">
                    <div className="global-list__loader-container">
                        <LoadingOutlined className="global-list__loader-icon" />
                    </div>
                </div>
            ) : (
                <ShowRecipe />
            )}
        </>
    );
};
export default ClientRecipeDetail;
