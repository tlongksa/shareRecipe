import { DislikeOutlined, LikeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import './bmi.scss';
import Input from '../../components/common/Input/Input';
import AuthContext from '../../context/auth-context';
import BmiContext from '../../context/bmi-context';
import { BmiInfoSchema } from '../../validators';
import { IMAGE_PLACEHODLER_URI } from '.././../constants';
import { updateUserBmiInfoRequest } from '../../api/requests';
import { Link } from 'react-router-dom';

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

const BmiForm = ({ item, userInfo }) => {
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
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    return (
        <div className={`bmi-form__info p-4 bg-gray-custom flex-fill rounded ${isProcessing ? 'divDisabled' : ''}`}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p>Tên : {item?.name}</p>
                <p>Ngày sinh: 2000-11-14</p>
                <p>Giới tính: {item?.gender}</p>
            </div>
            <Formik
                initialValues={{
                    high: item?.high,
                    weight: item?.weight,
                    target: item?.target,
                    mobility: item?.mobility,
                }}
                onSubmit={onSubmit}
                validationSchema={BmiInfoSchema}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p>Chiều cao : </p>
                            <div className="w-50">
                                <Input
                                    name="high"
                                    onChange={handleChange}
                                    placeholder="Vui lòng nhập chiều cao của bạn "
                                    value={values.high}
                                    error={errors.high}
                                    touched={touched.high}
                                    containerNoMarginBottom
                                    className="flex-fill"
                                />
                            </div>
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p>Cân nặng : </p>
                            <div className="w-50">
                                <Input
                                    name="weight"
                                    onChange={handleChange}
                                    placeholder="Vui lòng nhập cân nặng của bạn "
                                    value={values.weight}
                                    error={errors.weight}
                                    touched={touched.weight}
                                    containerNoMarginBottom
                                    className="flex-fill"
                                />
                            </div>
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p>Mục tiêu : </p>
                            <Input
                                type="select"
                                name="target"
                                onChange={handleChange}
                                value={values.target}
                                error={errors.target}
                                touched={touched.target}
                                containerNoMarginBottom
                                className="flex-fill"
                            >
                                <option value="Giảm cân">Giảm cân</option>
                                <option value="Giữ nguyên">Giữ nguyên</option>
                                <option value="Tăng cân">Tăng cân</option>
                            </Input>
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p>Chỉ số R : </p>
                            <Input
                                type="select"
                                name="mobility"
                                onChange={handleChange}
                                value={values.mobility}
                                error={errors.mobility}
                                touched={touched.mobility}
                                containerNoMarginBottom
                                className="flex-fill"
                            >
                                {mobilityOptions.map(({ value, label }) => (
                                    <option value={value} key={value}>
                                        {label}
                                    </option>
                                ))}
                            </Input>
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p>Tổng số calo: </p>
                            <p>{item?.totalCalo} calo</p>
                        </div>
                        {item?.messContent && <p className="mb-3 error-message">{item?.messContent}</p>}
                        <div className="d-flex justify-content-end">
                            <button className="button button-sm" type="submit" disabled={item?.messContent}>
                                Lưu
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const BmiInfo = () => {
    const { userInfo, isLoading: isLoadingUserInfo } = useContext(AuthContext);
    const {
        bmiDetail: { dataResponse, isLoading },
        mainIngredients: { dataResponse: mainIngredientList },
        recipes: { dataResponse: recipeList },
        onFetchDetail,
        onFetchRecipes,
        onFetchMainIngredients,
        onFetchRecipesByFavourite,
    } = useContext(BmiContext);
    const [recipeType, setRecipeType] = useState('total');
    const [meal, setMeal] = useState('');
    const [mainIngredient, setMainIngredient] = useState('');

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

    return (
        <section className="client-bmi__info">
            <div className="custom-page__container">
                <div className="d-flex gap-3 mb-4">
                    <img
                        src={userInfo?.avatarImage || IMAGE_PLACEHODLER_URI}
                        alt=""
                        className="w-200px object-fit-contain align-self-baseline"
                    />
                    <BmiForm item={dataResponse} userInfo={userInfo} />
                </div>
                <button
                    className={`button button-sm me-3 ${recipeType === 'total' ? '' : 'button-secondary'}`}
                    onClick={() => {
                        onFetchRecipes(dataResponse?.totalCalo);
                        setRecipeType('total');
                        setMeal('');
                        setMainIngredient('');
                    }}
                >
                    Total calories
                </button>
                <button
                    className={`button button-sm ${recipeType === 'favourite' ? '' : 'button-secondary'}`}
                    onClick={() => setRecipeType('favourite')}
                >
                    Favourite
                </button>
                {recipeType === 'favourite' && (
                    <div className="p-4 bg-gray-custom rounded mt-4">
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
                        <h5 className="mb-4">Chọn nguyên liệu chính</h5>
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
                                className="button button-sm"
                                disabled={!meal || !mainIngredient}
                                onClick={() => onFetchRecipesByFavourite(dataResponse?.totalCalo, meal, mainIngredient)}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                )}
                <ul className="mt-4">
                    {recipeList?.map((item, index) => (
                        <li className="bmi-recipe__list-item mb-4" key={item.dishID + index}>
                            <div className="d-flex gap-3">
                                <img
                                    src={item?.dishImageList?.[0]?.url || IMAGE_PLACEHODLER_URI}
                                    alt=""
                                    className="rounded-circle recipe-list_item-avatar"
                                />
                                <div className="bg-gray-custom flex-fill py-3 px-4 rounded-1">
                                    <div className="recipe-list_item-content mb-2">
                                        <h5>
                                            <Link to={`/recipe-detail/${item.dishID}`}>{item.dishName}</Link>
                                        </h5>
                                        <p>{item.formulaDescribe}</p>
                                        <p className="d-flex align-items-center gap-3">
                                            <strong>By {item.verifier}</strong>
                                            <span className="text-muted">{item?.createDate || '-'}</span>
                                        </p>
                                    </div>
                                    <div className={`recipe-list_item-actions d-flex gap-3 align-items-center`}>
                                        <button onClick={() => {}}>
                                            <LikeOutlined />
                                            <span>{item.totalLike}</span>
                                        </button>
                                        <button onClick={() => {}}>
                                            <DislikeOutlined />
                                            <span>{item.totalDisLike}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default BmiInfo;
