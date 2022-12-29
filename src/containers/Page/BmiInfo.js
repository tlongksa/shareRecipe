import {
    // DeleteOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
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
import breakfastIconImg from '../../assets/img/breakfast.png';
import lunchIconImg from '../../assets/img/lunch.png';
import dinnerIconImg from '../../assets/img/dinner.png';
import clockImg from '../../assets/img/clock.png';
import starImg from '../../assets/img/star.png';
import lightningImg from '../../assets/img/lightning.png';
import starImgIcon from '../../assets/img/star.png';

export const mobilityOptions = [
    {
        value: 1.2,
        label: 'Ít hoạt động, chỉ ăn đi làm về ngủ',
    },
    {
        value: 1.375,
        label: 'Có tập nhẹ nhàng, tuần 1-3 buổi',
    },
    {
        value: 1.55,
        label: 'Có vận động vừa 4-5 buổi',
    },
    {
        value: 1.725,
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
        onRemoveRecipe,
    } = useContext(BmiContext);
    const [recipeType, setRecipeType] = useState('total');
    const [meal, setMeal] = useState('');
    const [mainIngredient, setMainIngredient] = useState('');
    const [search, setSearch] = useState('');
    const [showFetchMoreFavouriteRecipes, setShowFetchMoreFavouriteRecipes] = useState(true);

    const dessertList = recipeList.filter((it) => it.dishCate === 'Món Tráng Miệng');
    const breakfastList = recipeList
        .filter((it) => it.dishCate === 'Bữa Sáng')
        .concat(dessertList?.[0] ? [{ ...dessertList?.[0] }] : []);
    const extraList = recipeList.filter((it) => it.dishCate === 'Món Canh');
    const lunchList = recipeList
        .filter((it) => it.dishCate === 'Bữa Trưa')
        .concat(
            dessertList?.[1]
                ? [
                      {
                          ...dessertList?.[1],
                      },
                  ]
                : [],
        )
        .concat(
            extraList?.[0]
                ? [
                      {
                          ...extraList?.[0],
                      },
                  ]
                : [],
        );
    const dinnerList = recipeList
        .filter((it) => it.dishCate === 'Bữa Tối')
        .concat(
            dessertList?.[2]
                ? [
                      {
                          ...dessertList?.[2],
                      },
                  ]
                : [],
        )
        .concat(
            extraList?.[1]
                ? [
                      {
                          ...extraList?.[1],
                      },
                  ]
                : [],
        );

    const isTablet = useMediaQuery({ query: '(max-width: 991px)' });
    const isSmallTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isExtraSmallTablet = useMediaQuery({ query: '(max-width: 630px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 465px)' });
    const [deletedList, setDeletedList] = useState([]);
    const [remainCalo, setRemainCalo] = useState(0);

    useEffect(() => {
        if (recipeType === 'favourite') {
            setRemainCalo(recipeList?.[recipeList?.length - 1]?.totalRemainingCalo || 0);
        }
    }, [recipeType, recipeList]);

    useEffect(() => {
        if (userInfo?.username) {
            onFetchDetail(userInfo?.username);
            onFetchMainIngredients('', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    useEffect(() => {
        if (dataResponse?.totalCalo && recipeType === 'total') {
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
            if (list.length < (isTablet ? 3 : 4)) {
                return (
                    <div className="d-flex">
                        {list?.map((item, index) => (
                            <BmiRecipeItem
                                key={item.dishID + index}
                                item={item}
                                className={index === 0 ? 'ms-0' : ''}
                            />
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
                        <BmiRecipeItem key={item.dishID + index} item={item} className={index === 0 ? 'ms-0' : ''} />
                    ))}
                </Slider>
            );
        }
        return (
            <ul className="mt-2">
                {list?.map((item, index) => (
                    <RecipeItem
                        key={item.dishID + index}
                        item={item}
                        onDeleteFromList={(id) => {
                            setDeletedList((prevState) => [...prevState, id]);
                            onRemoveRecipe(id);
                            setRemainCalo((prevState) => prevState + item.totalCalo);
                        }}
                    />
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
                    <h3 className="ff-dancing-script">💡Gợi ý cho bạn</h3>
                    <p className="ff-dancing-script">Thực đơn sẽ được lọc theo chỉ số BMI của bạn</p>
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
                            setRemainCalo(0);
                            setDeletedList([]);
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
                                            setMainIngredient('');
                                            onFetchMainIngredients('', e.target.value);
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
                                        onFetchMainIngredients(search, '');
                                    }
                                }}
                                emptySearchCallback={() => onFetchMainIngredients('', '')}
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
                {recipeType === 'favourite' && !!remainCalo && remainCalo > 0 && (
                    <div
                        className={`d-flex align-items-center gap-3 mt-3 ${
                            showFetchMoreFavouriteRecipes ? '' : 'd-none'
                        }`}
                    >
                        {remainCalo < 300 ? (
                            <p>
                                Hiện tại lượng kcal còn lại của bạn là <strong>{remainCalo.toFixed(2)}</strong> đang
                                dưới 300, bạn có muốn tìm món Tráng miệng hay không?
                            </p>
                        ) : (
                            <p>
                                Bạn còn thiếu : <strong>{remainCalo.toFixed(2)}</strong> kcal, bạn có muốn hiển thị thêm
                                công thức không ?
                            </p>
                        )}

                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="button button-sm button-green"
                                onClick={() => {
                                    if (remainCalo < 300) {
                                        setShowFetchMoreFavouriteRecipes(false);
                                    }
                                    onFetchRecipesByFavourite(
                                        remainCalo,
                                        meal,
                                        mainIngredient,
                                        true,
                                        recipeList
                                            .map((it) => it.dishID)
                                            .concat(deletedList)
                                            .join(','),
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
                            <img src={breakfastIconImg} alt="" /> Bữa sáng cần : {breakfastList?.[0]?.totalCaloBreak}{' '}
                            kcal
                        </h4>
                    )}
                    <ul className="mt-2">{renderRecipeList(breakfastList)}</ul>
                    {recipeType === 'total' && isLoadingRecipes && (
                        <div className="global-list__loader-container">
                            <LoadingOutlined className="global-list__loader-icon" />
                        </div>
                    )}
                    {recipeType === 'total' && (
                        <div className="d-flex justify-content-end">
                            <h3>
                                Tổng kcal của các món :{' '}
                                {breakfastList?.reduce((acc, cur) => acc + cur.totalCalo, 0) || 0} kcal
                            </h3>
                        </div>
                    )}
                </div>
                <div
                    className={`${
                        recipeType === 'total' ? 'bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow mt-4' : ''
                    }`}
                >
                    {lunchList?.length > 0 && (
                        <h4 className={`mt-4 mb-3 ${recipeType === 'total' ? '' : 'd-none'}`}>
                            <img src={lunchIconImg} alt="" /> Bữa trưa cần {breakfastList?.[0]?.totalCaloLunch} kcal
                        </h4>
                    )}
                    <ul className="mt-2">{renderRecipeList(lunchList)}</ul>
                    {recipeType === 'total' && isLoadingRecipes && (
                        <div className="global-list__loader-container">
                            <LoadingOutlined className="global-list__loader-icon" />
                        </div>
                    )}
                    {recipeType === 'total' && (
                        <div className="d-flex justify-content-end">
                            <h3>
                                Tổng kcal của các món : {lunchList?.reduce((acc, cur) => acc + cur.totalCalo, 0) || 0}{' '}
                                kcal
                            </h3>
                        </div>
                    )}
                </div>
                <div
                    className={`${
                        recipeType === 'total' ? 'bg-green-blur rounded-4 py-2 px-3 mb-3 pb-4 custom-shadow mt-4' : ''
                    }`}
                >
                    {dinnerList?.length > 0 && (
                        <h4 className={`mt-4 mb-3 ${recipeType === 'total' ? '' : 'd-none'}`}>
                            <img src={dinnerIconImg} alt="" /> Bữa tối cần : {breakfastList?.[0]?.totalCaloDinner} kcal
                        </h4>
                    )}
                    <ul className="mt-2">{renderRecipeList(dinnerList)}</ul>
                    {recipeType === 'total' && isLoadingRecipes && (
                        <div className="global-list__loader-container">
                            <LoadingOutlined className="global-list__loader-icon" />
                        </div>
                    )}
                    {recipeType === 'total' && (
                        <div className="d-flex justify-content-end">
                            <h3>
                                Tổng kcal của các món : {dinnerList?.reduce((acc, cur) => acc + cur.totalCalo, 0) || 0}{' '}
                                kcal
                            </h3>
                        </div>
                    )}
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

const RecipeItem = ({ item, onDeleteFromList }) => (
    <li className="global-recipe__list-item mb-4 bg-green-blur custom-shadow rounded-3 py-3 px-3">
        <div className="d-flex gap-3">
            <img
                src={item?.dishImageList?.[0]?.url || IMAGE_PLACEHODLER_URI}
                alt=""
                className="rounded-2 recipe-list_item-avatar"
            />
            <div className="flex-fill">
                <div className="recipe-list_item-content mb-2 position-relative">
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
                    <p className="break-line-2">{item.formulaDescribe}</p>
                    <p className="d-flex align-items-center gap-3">
                        <strong>By {item.verifier}</strong>
                        <span className="text-muted">{item?.createDate || '-'}</span>
                    </p>
                    <div>
                        <strong>Kcal : </strong> <span>{item.totalCalo}</span>
                    </div>
                    {/* <DeleteOutlined
                        className="global-list_item-actions_icon position-absolute right-0 top-5"
                        onClick={() => onDeleteFromList(item.dishID)}
                    /> */}
                </div>
                {item.avgStarRate === 0 ? (
                    <p>Chưa có đánh giá</p>
                ) : (
                    <div className="d-flex align-items-center gap-2">
                        Đánh giá công thức : {item.avgStarRate} <img src={starImgIcon} alt="" />
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
            targetIndex: values.target === 'Giữ nguyên' ? '' : values.targetIndex,
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
                <p className="bmi-info__fixed-data">
                    <strong>Tên</strong> : {item?.name}
                </p>
                <p className="bmi-info__fixed-data">
                    <strong>Ngày sinh</strong> : {item?.dob?.join('-')}
                </p>
                <p className="bmi-info__fixed-data">
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
                    targetIndex: item?.tagetIndex || '',
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
                        <div className="mb-3">
                            <div className="bmi-note__info">
                                Chỉ số BMI của bạn là : {item?.bmiindex} bạn đang {item?.bmistatus}
                                <span className="bmi-note__info-popup">{item?.bminote}</span>
                            </div>
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
                                    'R là 1 hệ số chỉ mức độ hoạt động thể chất của cơ thể. Bạn luyện tập càng nhiều thì hệ số này càng cao'
                                }
                            >
                                {mobilityOptions.map(({ value, label }) => (
                                    <option value={value} key={value}>
                                        {label}
                                    </option>
                                ))}
                            </Input>
                        </div>
                        {values.target === 'Giữ nguyên' ? null : (
                            <Input
                                type="select"
                                name="targetIndex"
                                label="Số lượng kilogram muốn tăng(giảm)/ tuần"
                                onChange={handleChange}
                                value={values.targetIndex}
                                error={errors.targetIndex}
                                touched={touched.targetIndex}
                                className="flex-fill"
                            >
                                <option value={0.5}>0,5 kg / tuần</option>
                                <option value={1}>1 kg / tuần</option>
                                <option value={1.5}>1,5 kg / tuần</option>
                            </Input>
                        )}

                        <div className="d-flex align-items-center mb-3">
                            <strong>
                                {'☛ Bạn cần '} {item?.totalCalo} {' kcal/ngày để'} {item?.target} {' cân nặng'}
                            </strong>
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

const BmiRecipeItem = ({ item, className }) => (
    <li className={`bmi-recipe__item ${className || ''}`}>
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
                    <img src={starImg} alt="" /> {item.avgStartRate}/5
                </div>
            </div>
            <p className="mt-1">Lượng kcal: {item.totalCalo} </p>
            <p className="mt-1">
                By <strong>{item.verifier}</strong> <span className="text-muted">{item.createDate}</span>
            </p>
        </div>
    </li>
);
