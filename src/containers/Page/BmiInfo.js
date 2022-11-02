import { LoadingOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import Input from '../../components/common/Input/Input';
import AuthContext from '../../context/auth-context';
import BmiContext from '../../context/bmi-context';
import { BmiInfoSchema } from '../../validators';
import './index.scss';

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

const BmiForm = ({ item }) => {
    const onSubmit = (values) => {};

    return (
        <div className="bmi-form__info p-4 bg-gray-custom flex-fill rounded">
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
                        <div className="d-flex gap-4 align-items-center">
                            <p>Tổng số calo: </p>
                            <p>{item?.totalCalo} calo</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="button button-sm">Lưu</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const BmiInfo = () => {
    const { userInfo } = useContext(AuthContext);
    const {
        bmiDetail: { dataResponse, isLoading },
        onFetchDetail,
    } = useContext(BmiContext);
    const [recipeType, setRecipeType] = useState('total');

    useEffect(() => {
        if (userInfo?.username) {
            onFetchDetail(userInfo?.username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    if (isLoading) {
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
                <div className="d-flex gap-4 mb-4">
                    <img
                        src={userInfo?.avatarImage}
                        alt=""
                        className="w-200px object-fit-contain align-self-baseline"
                    />
                    <BmiForm item={dataResponse} />
                </div>
                <button
                    className={`button button-sm me-3 ${recipeType === 'total' ? '' : 'button-secondary'}`}
                    onClick={() => setRecipeType('total')}
                >
                    Total calories
                </button>
                <button
                    className={`button button-sm ${recipeType === 'favourite' ? '' : 'button-secondary'}`}
                    onClick={() => setRecipeType('favourite')}
                >
                    Favourite
                </button>
            </div>
        </section>
    );
};

export default BmiInfo;
