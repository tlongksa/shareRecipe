import { LoadingOutlined, StarOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import './bmi.scss';
import Input from '../../components/common/Input/Input';
import AuthContext from '../../context/auth-context';
import BmiContext from '../../context/bmi-context';
import { BmiInfoSchema } from '../../validators';
import { IMAGE_PLACEHODLER_URI } from '.././../constants';
import { updateUserBmiInfoRequest } from '../../api/requests';
import { SearchDataList } from './Blogs';
import Slider from '../../components/common/Slider';
import { useMediaQuery } from 'react-responsive';
import { showNumOfBmiItemsBaseOnScreenSize, showRecipeLevelText } from '../../utils';
import BreakfastIcon, { LunchIcon, DinnerIcon } from '../../assets/svg-icons/breakfast';
import clockImg from '../../assets/img/clock.png';
import starImg from '../../assets/img/star.png';
import lightningImg from '../../assets/img/lightning.png';

export const mobilityOptions = [
    {
        value: 1,
        label: 'Ít hoạt động, chỉ ăn đi làm về ngủ',
    },
    {
        value: 1.375,
        label: 'Có tập nhẹ nhàng, tuần 1-3 buổi',
    },
    {
        value: 1.5,
        label: 'Có vận động vừa 4-5 buổi',
    },
    {
        value: 1.72,
        label: 'Vận động nhiều 6-7 buổi',
    },
    {
        value: 1.9,
        label: 'Vận động rất nhiều ngày tập 2 lần',
    },
];

export const MEALS = ['Bữa sáng', 'Bữa trưa', 'Bữa tối'];

const BmiInfo = () => {
    const { userInfo, isLoading: isLoadingUserInfo } = useContext(AuthContext);
    const {
        bmiDetail: { dataResponse, isLoading },
        mainIngredients: { dataResponse: mainIngredientList },
        recipes: { dataResponse: recipeList, error, isLoading: isLoadingRecipes },
        onFetchDetail,
        onFetchRecipes,
        onFetchMainIngredients,
        onFetchRecipesByFavourite,
        onClearRecipeList,
    } = useContext(BmiContext);
    const [recipeType, setRecipeType] = useState('total');
    const [meal, setMeal] = useState('');
    const [mainIngredient, setMainIngredient] = useState('');
    const [search, setSearch] = useState('');
    const [showFetchMoreFavouriteRecipes, setShowFetchMoreFavouriteRecipes] = useState(true);

    const breakfastList = recipeList.filter((it) => it.dishCate === 'Bữa sáng');
    const lunchList = recipeList.filter((it) => it.dishCate === 'Bữa trưa');
    const dinnerList = recipeList.filter((it) => it.dishCate === 'Bữa tối');
    const dessertList = recipeList.filter((it) => it.dishCate === 'Tráng miệng');

    const isTablet = useMediaQuery({ query: '(max-width: 991px)' });
    const isSmallTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isExtraSmallTablet = useMediaQuery({ query: '(max-width: 630px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 465px)' });

    const remainCalo = recipeType === 'favourite' ? recipeList?.[recipeList?.length - 1]?.totalRemainingCalo : 0;

    useEffect(() => {
        if (userInfo?.username) {
            onFetchDetail(userInfo?.username);
            onFetchMainIngredients();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    useEffect(() => {
        if (dataResponse?.totalCalo) {
            onFetchRecipes(dataResponse?.totalCalo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataResponse]);

    if (isLoadingUserInfo || isLoading) {
        return (
            <section className="client-bmi__info">
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            </section>
        );
    }

    const renderRecipeList = (list) => {
        if (recipeType === 'total') {
            if (list.length < (isSmallTablet ? 3 : 4)) {
                return (
                    <div className="d-flex">
                        {list?.map((item, index) => (
                            <BmiRecipeItem key={item.dishID + index} item={item} />
                        ))}
                    </div>
                );
            }
            return (
                <Slider
                    slidesToShow={showNumOfBmiItemsBaseOnScreenSize(
                        isMobile,
                        isExtraSmallTablet,
                        isSmallTablet,
                        isTablet,
                    )}
                >
                    {list?.map((item, index) => (
                        <BmiRecipeItem key={item.dishID + index} item={item} />
                    ))}
                </Slider>
            );
        }
        return (
            <ul className="mt-2">
                {list?.map((item, index) => (
                    <RecipeItem key={item.dishID + index} item={item} />
                ))}
            </ul>
        );
    };

    return (
        <section className="client-bmi__info">
            <div className="custom-page__container">
                <div className="d-flex gap-3 mb-4 bmi-form__wrapper">
                    <img
                        src={userInfo?.avatarImage || IMAGE_PLACEHODLER_URI}
                        alt=""
                        className="object-fit-contain align-self-baseline rounded-4"
                    />
                    <BmiForm
                        item={dataResponse}
                        userInfo={userInfo}
                        onRefetch={() => {
                            onFetchDetail(userInfo?.username);
                        }}
                    />
                </div>
                <div className="bmi-option__titles">
                    <h3>💡Gợi ý cho bạn</h3>
                    <p>Thực đơn sẽ được lọc theo chỉ số BMI của bạn</p>
                </div>
                <div>
                    <button
                        className={`button button-sm button-rounded-6 me-3 ${
                            recipeType === 'total' ? 'button-outlined-hover-green has-border' : 'button-light'
                        }`}
                        onClick={() => {
                            onClearRecipeList();
                            onFetchRecipes(dataResponse?.totalCalo);
                            setRecipeType('total');
                            setMeal('');
                            setMainIngredient('');
                        }}
                    >
                        {recipeType === 'total' ? '✅' : ''} Thực đơn phù hợp
                    </button>
                    <button
                        className={`button button-sm button-rounded-6 me-3 ${
                            recipeType === 'favourite' ? 'button-outlined-hover-green has-border' : 'button-light'
                        }`}
                        onClick={() => {
                            onClearRecipeList();
                            setRecipeType('favourite');
                            setMeal('');
                            setMainIngredient('');
                        }}
                    >
                        {recipeType === 'favourite' ? '✅' : ''} Thực đơn theo bữa
                    </button>
                </div>
                {error && <p className="error-message mt-4">{error?.messContent}</p>}
                {recipeType === 'favourite' && (
                    <div className="p-4 bg-green-blur rounded mt-4">
                        <h5 className="mb-4">Chọn bữa</h5>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            {MEALS.map((value) => (
                                <label key={value} className="custom-radio__container">
                                    {value}
                                    <input
                                        type="radio"
                                        onChange={(e) => {
                                            setMeal(e.target.value);
                                        }}
                                        value={value}
                                        checked={value === meal}
                                    />
                                    <span className="radioCheckmark" />
                                </label>
                            ))}
                        </div>
                        <div className="d-flex align-items-center gap-3 bmi__choose-main-ing__row">
                            <h5 className="mb-0">Chọn nguyên liệu chính</h5>
                            <SearchDataList
                                search={search}
                                setSearch={setSearch}
                                callback={() => {
                                    if (search.trim()) {
                                        onFetchMainIngredients(search);
                                    }
                                }}
                                emptySearchCallback={() => onFetchMainIngredients('')}
                                className="bg-white"
                            />
                        </div>
                        <br />
                        <div className="main-ingredient__list mb-3">
                            {mainIngredientList?.map((value) => (
                                <label key={value} className="custom-radio__container">
                                    {value}
                                    <input
                                        type="radio"
                                        onChange={(e) => {
                                            setMainIngredient(e.target.value);
                                        }}
                                        value={value}
                                        checked={value === mainIngredient}
                                    />
                                    <span className="radioCheckmark" />
                                </label>
                            ))}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                className="button button-sm button-green"
                                disabled={!meal || !mainIngredient}
                                onClick={() => {
                                    onFetchRecipesByFavourite(dataResponse?.totalCalo, meal, mainIngredient);
                                    setShowFetchMoreFavouriteRecipes(true);
                                }}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                )}
                {recipeType === 'favourite' && remainCalo && remainCalo > 0 && (
                    <div
                        className={`d-flex align-items-center gap-3 mt-3 ${
                            showFetchMoreFavouriteRecipes ? '' : 'd-none'
                        }`}
                    >
                        {remainCalo < 200 ? (
                            <p>
                                Hiện tại lượng calo còn lại của bạn là <strong>{remainCalo}</strong> đang dưới 200, bạn
                                có muốn tìm món Tráng miệng hay không?
                            </p>
                        ) : (
                            <p>
                                Bạn còn thiếu : <strong>{remainCalo}</strong> calo, bạn có muốn hiển thị thêm công thức
                                không ?
                            </p>
                        )}

                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="button button-sm button-green"
                                onClick={() => {
                                    if (remainCalo < 200) {
                                        setShowFetchMoreFavouriteRecipes(false);
                                    }
                                    onFetchRecipesByFavourite(
                                        remainCalo,
                                        meal,
                                        mainIngredient,
                                        true,
                                        recipeList.map((it) => it.dishID).join(','),
                                    );
                                }}
                            >
                                Có
                            </button>
                            <button
                                className="button button-sm button-secondary"
                                onClick={() => setShowFetchMoreFavouriteRecipes(false)}
                            >
                                Không
                            </button>
                        </div>
                    </div>
                )}
                <div
                    className={`${
                        recipeType === 'total' ? 'bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow mt-4' : ''
                    }`}
                >
                    {breakfastList?.length > 0 && (
                        <h4 className={`mb-3 ${recipeType === 'total' ? '' : 'd-none'}`}>
                            <BreakfastIcon /> Bữa sáng {breakfastList?.reduce((acc, it) => acc + it.totalCalo, 0)} calo
                        </h4>
                    )}
                    <ul className="mt-2">{renderRecipeList(breakfastList)}</ul>
                </div>
                <div
                    className={`${
                        recipeType === 'total' ? 'bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow mt-4' : ''
                    }`}
                >
                    {lunchList?.length > 0 && (
                        <h4 className={`mt-4 mb-3 ${recipeType === 'total' ? '' : 'd-none'}`}>
                            <LunchIcon /> Bữa trưa {lunchList?.reduce((acc, it) => acc + it.totalCalo, 0)} calo
                        </h4>
                    )}
                    <ul className="mt-2">{renderRecipeList(lunchList)}</ul>
                </div>
                <div
                    className={`${
                        recipeType === 'total' ? 'bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow mt-4' : ''
                    }`}
                >
                    {dinnerList?.length > 0 && (
                        <h4 className={`mt-4 mb-3 ${recipeType === 'total' ? '' : 'd-none'}`}>
                            <DinnerIcon /> Bữa tối {dinnerList?.reduce((acc, it) => acc + it.totalCalo, 0)} calo
                        </h4>
                    )}
                    <ul className="mt-2">{renderRecipeList(dinnerList)}</ul>
                </div>
                <div
                    className={`${
                        recipeType === 'total' ? 'bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow mt-4' : ''
                    }`}
                >
                    {dessertList?.length > 0 && (
                        <h4 className={`mt-4 mb-3 ${recipeType === 'total' ? '' : 'd-none'}`}>
                            Tráng miệng {dessertList?.reduce((acc, it) => acc + it.totalCalo, 0)} calo
                        </h4>
                    )}
                    <ul className="mt-2">{renderRecipeList(dessertList)}</ul>
                </div>
                {isLoadingRecipes && (
                    <div className="global-list__loader-container">
                        <LoadingOutlined className="global-list__loader-icon" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default BmiInfo;

const RecipeItem = ({ item }) => (
    <li className="global-recipe__list-item mb-4 bg-green-blur custom-shadow rounded-3 py-3 px-3">
        <div className="d-flex gap-3">
            <img
                src={item?.dishImageList?.[0]?.url || IMAGE_PLACEHODLER_URI}
                alt=""
                className="rounded-2 recipe-list_item-avatar"
            />
            <div className="flex-fill">
                <div className="recipe-list_item-content mb-2">
                    <h5>
                        <Link
                            to={`/recipe-detail/${item.dishID}`}
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                })
                            }
                        >
                            {item.dishName}
                        </Link>
                    </h5>
                    <p>{item.formulaDescribe}</p>
                    <p className="d-flex align-items-center gap-3">
                        <strong>By {item.verifier}</strong>
                        <span className="text-muted">{item?.createDate || '-'}</span>
                    </p>
                    <div>
                        <strong>Calo : </strong> <span>{item.totalCalo}</span>
                    </div>
                </div>
                {item.avgStarRate === 0 ? (
                    <p>Chưa có đánh giá</p>
                ) : (
                    <div className="d-flex align-items-center gap-2">
                        Đánh giá công thức : {item.avgStarRate}{' '}
                        <StarOutlined
                            style={{
                                color: '#fcdd0d',
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    </li>
);

const BmiForm = ({ item, userInfo, onRefetch }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const onSubmit = (values) => {
        setIsProcessing(true);
        updateUserBmiInfoRequest({
            target: values.target,
            high: values.high,
            weight: values.weight,
            r: values.mobility,
            username: userInfo?.username,
            gender: item?.gender,
            dob: item.dob,
        })
            .then(({ data }) => {
                setIsProcessing(false);
                onRefetch();
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    return (
        <div className={`bmi-form__info p-4 bg-white flex-fill rounded-4 border ${isProcessing ? 'divDisabled' : ''}`}>
            <h3 className="bmi-form__info-title">
                Thông tin cá nhân{' '}
                <Link to={`/profile/${userInfo?.id}`} className="text-green ms-4 text-small">
                    Chỉnh sửa
                </Link>
            </h3>
            <div className="d-flex justify-content-between align-items-center mb-3 bmi-form__info-unedit">
                <p>
                    <strong>Tên</strong> : {item?.name}
                </p>
                <p>
                    <strong>Ngày sinh</strong> : {item?.dob?.join('-')}
                </p>
                <p>
                    <strong>Giới tính</strong> : {item?.gender}
                </p>
            </div>
            <hr />
            <Formik
                initialValues={{
                    high: item?.high,
                    weight: item?.weight,
                    target: item?.target,
                    mobility: item?.mobility || 1,
                }}
                onSubmit={onSubmit}
                validationSchema={BmiInfoSchema}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <h3 className="bmi-form__info-title">Chỉ số BMI </h3>
                        <div className="d-flex gap-3">
                            <Input
                                name="high"
                                onChange={handleChange}
                                placeholder="Chiều cao :"
                                label="Chiều cao(cm) :"
                                value={values.high}
                                error={errors.high}
                                touched={touched.high}
                                className="flex-fill"
                            />
                            <Input
                                name="weight"
                                onChange={handleChange}
                                placeholder="Cân nặng"
                                label="Cân nặng(kg) :"
                                value={values.weight}
                                error={errors.weight}
                                touched={touched.weight}
                                className="flex-fill"
                            />
                        </div>
                        <div className="d-flex gap-3">
                            <Input
                                type="select"
                                name="target"
                                label="Mục tiêu"
                                onChange={handleChange}
                                value={values.target}
                                error={errors.target}
                                touched={touched.target}
                                className="flex-fill"
                                inputClassName="full"
                            >
                                <option value="Giảm cân">Giảm cân</option>
                                <option value="Giữ nguyên">Giữ nguyên</option>
                                <option value="Tăng cân">Tăng cân</option>
                            </Input>
                            <Input
                                type="select"
                                name="mobility"
                                label="Chỉ số R"
                                onChange={handleChange}
                                value={values.mobility}
                                error={errors.mobility}
                                touched={touched.mobility}
                                className="flex-fill"
                                inputClassName="full"
                                title={
                                    'Chỉ số khối cơ thể (BMI - Body mass index) là một phép tính dựa trên chiều cao và cân nặng, giúp xác định xem một người có cân nặng chuẩn, nhẹ cân, thừa cân hay béo phì.'
                                }
                            >
                                {mobilityOptions.map(({ value, label }) => (
                                    <option value={value} key={value}>
                                        {label}
                                    </option>
                                ))}
                            </Input>
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <strong className="min-width-120">Tổng số calo: </strong>
                            <p>
                                <strong>{item?.totalCalo}</strong> calo
                            </p>
                        </div>
                        {item?.messContent && <p className="mb-3 error-message">{item?.messContent}</p>}
                        <div className="d-flex justify-content-end">
                            <button
                                className="button button-sm button-green"
                                type="submit"
                                disabled={item?.messContent}
                            >
                                Lưu
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const BmiRecipeItem = ({ item }) => (
    <li className="bmi-recipe__item">
        <img
            className="bmi-recipe__item-img"
            src={item?.dishImageList?.[0]?.url || 'https://via.placeholder.com/150'}
            alt=""
        />
        <div className="p-2 pb-4">
            <Link
                to={`/recipe-detail/${item.dishID}`}
                className="d-block"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        left: 0,
                    })
                }
            >
                {item.dishName}
            </Link>
            <div className="d-flex gap-2 justify-content-between mt-3">
                <div className="recipe-item__extra-info">
                    <img src={lightningImg} alt="" /> {showRecipeLevelText(item.level)}
                </div>
                <div className="recipe-item__extra-info">
                    <img src={clockImg} alt="" /> {item.time} phút
                </div>
                <div className="recipe-item__extra-info">
                    <img src={starImg} alt="" /> {item.avgStarRate}/5
                </div>
            </div>
            <p className="mt-2">
                By <strong>{item.verifier}</strong> <span className="text-muted">{item.createDate}</span>
            </p>
        </div>
    </li>
);
