import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import RecipeComments from './RecipeComments';
import { Divider, notification } from 'antd';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import RecipeContext from '../../context/recipe-context';
import Slider from '../../components/common/Slider';
import { addRecipeToFavouriteList } from '../../api/requests';
import AuthContext from '../../context/auth-context';
import Modal from 'react-bootstrap/Modal';

const TopRecipeInfo = ({ dataResponse, bigRecipeImg, setBigRecipeImg, onAddToFavourite, dishId }) => {
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showFavouriteOptionModal, setShowFavouriteOptionModal] = useState(false);

    return (
        <div className="top-info__container">
            <div className="left-view">
                <img src={bigRecipeImg} alt={dataResponse?.dishName} className="img-view-detail" />
                <div
                    style={{
                        maxWidth: 300,
                    }}
                >
                    {dataResponse?.dishImageList?.length > 3 ? (
                        <Slider slidesToShow={3}>
                            {dataResponse?.dishImageList?.map((listImg) => (
                                <div key={listImg.dishImageID}>
                                    <img
                                        className="img-recipe__gallery-item"
                                        src={listImg.url}
                                        alt="img"
                                        onClick={() => setBigRecipeImg(listImg.url)}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="flex-full d-flex">
                            {dataResponse?.dishImageList?.map((listImg) => (
                                <div key={listImg.dishImageID}>
                                    <img
                                        className="img-recipe__gallery-item"
                                        src={listImg.url}
                                        alt="img"
                                        onClick={() => setBigRecipeImg(listImg.url)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="right-view flex-fill">
                <div className="d-flex justify-content-between gap-3">
                    <h3 className="mb-2">{dataResponse.dishName}</h3>
                    <button
                        className="button button-sm d-flex align-items-center gap-2"
                        onClick={() => {
                            accessToken ? onAddToFavourite() : setShowFavouriteOptionModal(true);
                        }}
                    >
                        <PlusCircleOutlined />
                        <span>Yêu thích</span>
                    </button>
                </div>
                <div className="mb-2 mt-2">
                    <strong>Mô tả :</strong> {dataResponse.formulaDescribe}
                </div>
                <div className="mb-2">
                    <strong>Tổng kalo :</strong> {dataResponse.totalCalo}
                </div>
                <div className="mb-2">
                    <strong>Mức độ :</strong> {dataResponse.level}
                </div>
                <div className="mb-2">
                    <strong>Số người đánh giá :</strong> {dataResponse.numberPeopleForDish}
                </div>
                <div className="mb-2">
                    <strong>Tạo ngày :</strong> {dataResponse.createDate} bởi <strong>{dataResponse.verifier}</strong>
                </div>
                <Modal
                    show={showFavouriteOptionModal}
                    fullscreen={'sm-down'}
                    onHide={() => setShowFavouriteOptionModal(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Vui lòng đăng nhập để thêm vào danh sách yêu thích</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex gap-2 align-items-center py-3">
                            <button
                                className="button button-sm"
                                type="button"
                                onClick={() => {
                                    navigate(`/signin?redirectUrl=/recipe-detail/${dishId}`);
                                }}
                            >
                                Đăng nhập
                            </button>
                            <button
                                className="button button-sm"
                                type="button"
                                onClick={() => setShowFavouriteOptionModal(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
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

    const onAddToFavouriteListHandler = () => {
        addRecipeToFavouriteList(dishId)
            .then(({ data }) => {
                notification.open({
                    message: data?.messContent,
                });
            })
            .catch((err) => console.log(err));
    };

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
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
                    onAddToFavourite={onAddToFavouriteListHandler}
                    dishId={dishId}
                />
                <div className="view-comment">
                    <hr />
                    <h3 className="view-title">Nguyên liệu chính:</h3>
                    <ul className="ms-5">
                        {dataResponse?.ingredientDetailList
                            ?.filter((it) => it.mainIngredient === 1)
                            .map((mappedItem) => (
                                <li key={mappedItem.ingredientDetailId} className="list-bullet">
                                    {mappedItem.name} {mappedItem.quantity} {mappedItem.unit}
                                </li>
                            ))}
                    </ul>
                    <h3 className="view-title">Nguyên liệu phụ:</h3>
                    <ul className="ms-5">
                        {dataResponse?.ingredientDetailList
                            ?.filter((it) => it.mainIngredient !== 1)
                            .map((mappedItem) => (
                                <Fragment key={mappedItem.ingredientDetailId}>
                                    <li className="list-bullet">
                                        {mappedItem.name} {mappedItem.quantity} {mappedItem.unit}
                                    </li>
                                    {mappedItem.ingredientChangeVoList.length > 0 && (
                                        <div className="ms-3">
                                            <p>Có thể thay thế bằng : </p>
                                            <div className="ms-5">
                                                {mappedItem.ingredientChangeVoList.map((mappedItem) => (
                                                    <li key={mappedItem.ingredientChangeId} className="list-bullet">
                                                        {mappedItem.name} {mappedItem.quantity} {mappedItem.unit}
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
                                <strong>Bước {index + 1} : </strong>
                                <div
                                    className={`recipe-step-item__content`}
                                    dangerouslySetInnerHTML={{
                                        __html: item.describe,
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                    <h3 className="view-title">Video Hướng Dẫn :</h3>
                    <video src={dataResponse?.video} width="100%" controls></video>
                    <hr />
                    <RecipeComments dishId={dishId} />
                </div>
            </div>
        </div>
    );
};
export default ClientRecipeDetail;
