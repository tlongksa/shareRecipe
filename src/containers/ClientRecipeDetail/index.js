import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';
import ViewComments from './ViewComment';
import { Button, Checkbox, Divider } from 'antd';
import { getRecipeIngredientChangeRequest } from '../../api/requests';
import { LoadingOutlined } from '@ant-design/icons';
import RecipeContext from '../../context/recipe-context';

const ClientRecipeDetail = () => {
    const { dishId } = useParams();
    const [replacementIngredientList, setReplacementIngredientList] = useState([]);
    const [checkedIngredientList, setCheckedIngredientList] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [bigRecipeImg, setBigRecipeImg] = useState('');
    const {
        recipeDetail: { dataResponse, isLoading, error },
        onFetchDetail,
    } = useContext(RecipeContext);

    useEffect(() => {
        onFetchDetail(dishId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dishId]);

    useEffect(() => {
        if (dataResponse?.dishImageList?.[0]?.url) {
            setBigRecipeImg(dataResponse?.dishImageList?.[0]?.url);
        }
    }, [dataResponse]);

    const mapReplacementIngredient = (rootIngId) => {
        return replacementIngredientList.find((item) => item.ingredientDetailId === rootIngId);
    };

    const changeIngredient = () => {
        getRecipeIngredientChangeRequest(checkedIngredientList.join(','))
            .then((response) => {
                setReplacementIngredientList(response.data);
            })
            .catch((error) => console.log(error));
    };

    if (!isLoading && error) {
        return <p className="error-message">{error || 'Something went wrong!'}</p>;
    }

    return isLoading ? (
        <div className="recipe-detail__container">
            <div className="global-list__loader-container">
                <LoadingOutlined className="global-list__loader-icon" />
            </div>
        </div>
    ) : (
        <div className="recipe-detail__container">
            <div className="custom-page__container">
                <div className="top-info__container">
                    <div className="left-view">
                        <img src={bigRecipeImg} alt={dataResponse?.dishName} className="img-view-detail" />
                        <div className="flex-full d-flex flex-wrap">
                            {dataResponse?.dishImageList?.map((listImg) => (
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
                        <h3 className="mb-3">{dataResponse.dishName}</h3>
                        <div className="mb-3">Tổng quan:{dataResponse.summary}</div>
                        <div className="mb-3">Mô tả: {dataResponse.formulaDescribe}</div>
                        <div className="mb-3">Tổng kalo: {dataResponse.totalCalo} </div>
                        <div className="mb-3">Mức độ: {dataResponse.level}</div>
                        <div className="mb-3">Số người đánh giá: {dataResponse.numberPeopleForDish}</div>
                        <div className="mb-3">
                            Tạo ngày: {dataResponse.createDate} bởi {dataResponse.verifier}
                        </div>
                    </div>
                </div>
                <div className="view-comment">
                    <hr />
                    <h3 className="view-title">Nguyên liệu:</h3>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setCheckedIngredientList(
                                    dataResponse?.ingredientDetailList?.map((ing) => ing.ingredientDetailId),
                                );
                            } else {
                                setCheckedIngredientList([]);
                            }
                            setCheckAll(e.target.checked);
                        }}
                        checked={checkAll}
                    >
                        Check all
                    </Checkbox>
                    <br /> <br />
                    {dataResponse?.ingredientDetailList?.map((listIngredient) => (
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
                                        mapReplacementIngredient(listIngredient.ingredientDetailId)?.ingredientChangeId
                                            ? ` - được thay thế bởi ${
                                                  mapReplacementIngredient(listIngredient.ingredientDetailId)?.name
                                              } ${
                                                  mapReplacementIngredient(listIngredient.ingredientDetailId)?.quantity
                                              } ${mapReplacementIngredient(listIngredient.ingredientDetailId)?.unit}`
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
                    <ul>
                        {dataResponse?.stepList?.map((item, index) => (
                            <li className="step__list-item mt-3" key={`step__item-${item.stepID}`}>
                                <div className="">
                                    <strong>
                                        Bước {index + 1}: {item.describe}
                                    </strong>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3 className="view-title">Video Hướng Dẫn :</h3>
                    <video src={dataResponse?.video} width="100%" controls></video>
                    <hr />
                    <ViewComments />
                </div>
            </div>
        </div>
    );
};
export default ClientRecipeDetail;
