import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.scss';
import RecipeComments from './RecipeComments';
import { notification } from 'antd';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import RecipeContext from '../../context/recipe-context';
import Slider from '../../components/common/Slider';
import { addRecipeToFavouriteList } from '../../api/requests';
import AuthContext from '../../context/auth-context';
import Modal from 'react-bootstrap/Modal';
import ListTopNew from '../../components/List/listTopNew';
import { showRecipeLevelText } from '../../utils';

const TopRecipeInfo = ({ dataResponse, bigRecipeImg, setBigRecipeImg, onAddToFavourite, dishId }) => {
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showFavouriteOptionModal, setShowFavouriteOptionModal] = useState(false);

    return (
        <div className="top-info__container">
            <div className="left-view bg-green-blur custom-shadow p-3 rounded-4">
                <img src={bigRecipeImg} alt={dataResponse?.dishName} className="img-view-detail rounded-4" />
                <div
                    style={{
                        maxWidth: 500,
                    }}
                >
                    {dataResponse?.dishImageList?.length > 5 ? (
                        <Slider slidesToShow={5}>
                            {dataResponse?.dishImageList?.map((listImg) => (
                                <div key={listImg.dishImageID}>
                                    <img
                                        className="img-recipe__gallery-item rounded-2"
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
                                        className="img-recipe__gallery-item rounded-2"
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
            <div className="right-recipe__detail flex-fill">
                <div className="bg-green-blur custom-shadow p-3 rounded-4">
                    <div className="d-flex justify-content-between gap-3 mb-3">
                        <h3 className="mb-2 recipe-name">{dataResponse.dishName}</h3>
                        <button
                            className="button button-sm button-green d-flex align-items-center gap-2 recipe-detail__add-to__favourite-btn"
                            onClick={() => {
                                accessToken ? onAddToFavourite() : setShowFavouriteOptionModal(true);
                            }}
                        >
                            <PlusCircleOutlined />
                            <span>Yêu thích</span>
                        </button>
                    </div>
                    <div className="mb-2 recipe-info__item">
                        <strong>Calo :</strong> {dataResponse.totalCalo}
                    </div>
                    <div className="mb-2 recipe-info__item">
                        <strong>Độ khó :</strong> {showRecipeLevelText(dataResponse.level)}
                    </div>
                    <div className="mb-2 mt-2 recipe-info__item">
                        <strong>Thời gian nấu :</strong> {dataResponse.time} phút
                    </div>
                    <Modal
                        show={showFavouriteOptionModal}
                        fullscreen={'md-down'}
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
                <RecipeIngredients dataResponse={dataResponse} />
            </div>
        </div>
    );
};

const RecipeSteps = ({ dataResponse }) => (
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
);

const RecipeIngredients = ({ dataResponse }) => (
    <>
        <h3 className="recipe-ing__title mt-3">Thành phần nguyên liệu :</h3>
        <div className="bg-green-blur custom-shadow p-3 rounded-4">
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
        </div>
    </>
);

const ClientRecipeDetail = () => {
    const { dishId } = useParams();
    const [bigRecipeImg, setBigRecipeImg] = useState('');
    const {
        recipeDetail: { dataResponse, isLoading, error },
        onFetchDetail,
    } = useContext(RecipeContext);
    const [activeTab, setActiveTab] = useState('desc');
    const [showModalDetail, setShowModalDetail] = useState(false);

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
                <div className="bg-green-blur custom-shadow p-3 rounded-4 mt-3 mb-3">
                    <div className="d-flex gap-3">
                        <div className="recipe-detail__menu pt-3">
                            <ul>
                                <li
                                    className={`${activeTab === 'desc' ? 'is-active' : ''}`}
                                    onClick={() => setActiveTab('desc')}
                                >
                                    Mô tả
                                </li>
                                <li
                                    className={`${activeTab === 'guide' ? 'is-active' : ''}`}
                                    onClick={() => setActiveTab('guide')}
                                >
                                    Hướng dẫn chế biến
                                </li>
                                <li
                                    className={`${activeTab === 'protect' ? 'is-active' : ''}`}
                                    onClick={() => setActiveTab('protect')}
                                >
                                    Hướng dẫn bảo quản
                                </li>
                            </ul>
                        </div>
                        <div className="recipe-detail__desc">
                            {activeTab === 'desc' && (
                                <>
                                    <div
                                        className="recipe-desc"
                                        dangerouslySetInnerHTML={{
                                            __html: dataResponse?.formulaDescribe?.replaceAll('\n', '<br />'),
                                        }}
                                    />
                                </>
                            )}
                            {activeTab === 'guide' && <RecipeSteps dataResponse={dataResponse} />}
                            {activeTab === 'protect' && (
                                <ul className="protect-guide">
                                    <li>
                                        1.Phương pháp đông lạnh. Đông lạnh được sử dụng tốt cho hầu như bất kỳ loại thực
                                        phẩm nào. ...
                                    </li>
                                    <li>
                                        2.Hút chân không. Hút chân không dùng đóng gói các thực phẩm trong một môi
                                        trường chân không, thường là trong một túi kín hoặc trong chai. ...
                                    </li>
                                    <li>3.Đóng hộp, chai, lọ ...</li>
                                    <li>4.Muối chua. ...</li>
                                    <li>5.Hun khói. ...</li>
                                    <li>6.Sấy khô</li>
                                </ul>
                            )}
                            <div className="d-flex justify-content-center">
                                <button
                                    className="button button-light button-sm"
                                    onClick={() => setShowModalDetail(true)}
                                >
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                        <Modal
                            show={showModalDetail}
                            fullscreen={true}
                            onHide={() => setShowModalDetail(false)}
                            centered
                        >
                            <Modal.Header closeButton className="bg-green-blur">
                                <Modal.Title>Mô tả</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="p-0">
                                <div className="bg-green-blur p-4">
                                    <div className="recipe-detail__desc">
                                        <div
                                            className="recipe-desc"
                                            dangerouslySetInnerHTML={{
                                                __html: dataResponse?.formulaDescribe?.replaceAll('\n', '<br />'),
                                            }}
                                        />
                                    </div>
                                    <RecipeIngredients dataResponse={dataResponse} />
                                    <h3 className="view-title mt-3">Cách chế biến:</h3>
                                    <RecipeSteps dataResponse={dataResponse} />
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className="view-comment">
                    <video src={dataResponse?.video} width="100%" height={400} controls></video>
                    <hr />
                    <RecipeComments dishId={dishId} />
                </div>
                <ListTopNew />
            </div>
        </div>
    );
};
export default ClientRecipeDetail;
