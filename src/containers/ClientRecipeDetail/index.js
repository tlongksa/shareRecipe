import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';
import ViewComments from './ViewComment';
import { Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import RecipeContext from '../../context/recipe-context';
import Slider from '../../components/common/Slider';

const TopRecipeInfo = ({ dataResponse, bigRecipeImg, setBigRecipeImg }) => {
    return (
        <div className="top-info__container">
            <div className="left-view">
                <img src={bigRecipeImg} alt={dataResponse?.dishName} className="img-view-detail" />
                <div
                    style={{
                        maxWidth: 300,
                    }}
                >
                    <Slider slidesToShow={3}>
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
                    </Slider>
                </div>
            </div>
            <div className="right-view flex-fill">
                <h3 className="mb-2">{dataResponse.dishName}</h3>
                <div className="mb-2">
                    <strong>Tổng quan:</strong> {dataResponse.summary || '-'}
                </div>
                <div className="mb-2">
                    <strong>Mô tả:</strong> {dataResponse.formulaDescribe}
                </div>
                <div className="mb-2">
                    <strong>Tổng kalo:</strong> {dataResponse.totalCalo}
                </div>
                <div className="mb-2">
                    <strong>Mức độ:</strong> {dataResponse.level}
                </div>
                <div className="mb-2">
                    <strong>Số người đánh giá:</strong> {dataResponse.numberPeopleForDish}
                </div>
                <div className="mb-2">
                    <strong>Tạo ngày:</strong> {dataResponse.createDate} bởi {dataResponse.verifier}
                </div>
            </div>
        </div>
    );
};

const ClientRecipeDetail = () => {
    const { dishId } = useParams();
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

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Something went wrong!'}</p>;
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
                <TopRecipeInfo
                    bigRecipeImg={bigRecipeImg}
                    dataResponse={dataResponse}
                    setBigRecipeImg={setBigRecipeImg}
                />
                <div className="view-comment">
                    <hr />
                    <h3 className="view-title">Nguyên liệu chính:</h3>
                    <ul className="ms-5">
                        {dataResponse?.ingredientDetailList
                            ?.filter((it) => it.mainIngredient === 1)
                            .map((mappedItem) => (
                                <li key={mappedItem.ingredientDetailId} className="list-bullet">
                                    {mappedItem.name}
                                </li>
                            ))}
                    </ul>
                    <h3 className="view-title">Nguyên liệu phụ:</h3>
                    <ul className="ms-5">
                        {dataResponse?.ingredientDetailList
                            ?.filter((it) => it.mainIngredient !== 1)
                            .map((mappedItem) => (
                                <Fragment key={mappedItem.ingredientDetailId}>
                                    <li className="list-bullet">{mappedItem.name}</li>
                                    {mappedItem.ingredientChangeVoList.length > 0 && (
                                        <div className="ms-3">
                                            <p>Có thể thay thế bằng : </p>
                                            <div className="ms-5">
                                                {mappedItem.ingredientChangeVoList.map((mappedItem) => (
                                                    <li key={mappedItem.ingredientChangeId} className="list-bullet">
                                                        {mappedItem.name}
                                                    </li>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                    </ul>
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
