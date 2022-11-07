import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import topBanner from '../../assets/img/profile_background.png';
import './index.scss';
import AuthContext from '../../context/auth-context';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import { updateAccountProfileRequest } from '../../api/requests';
import Input from '../../components/common/Input/Input';
import { ProfileSchema } from '../../validators';
import FavouriteRecipes from './FavouriteRecipes';
import { IMAGE_PLACEHODLER_URI } from '../../constants';

const EditProfileForm = ({ item, callback, setShouldUpdate }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const onSubmit = (values) => {
        setIsProcessing(true);
        updateAccountProfileRequest(item.profileId, {
            phone: values.phone,
            high: values.high,
            weight: values.weight,
            address: values.address,
            name: item?.name,
            gender: values.gender,
            dob: values.dob,
            avatarImage: item.avatarImage,
            email: item.email,
        })
            .then(({ data }) => {
                setIsProcessing(false);
                callback(values);
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    return (
        <div className={`bmi-form__info p-4 bg-gray-custom flex-fill rounded ${isProcessing ? 'divDisabled' : ''}`}>
            <Formik
                initialValues={{
                    high: item?.high || 0,
                    weight: item?.weight || 0,
                    dob: item?.dob || '',
                    gender: item?.gender || '',
                    phone: item?.phone || '',
                    address: item?.address || '',
                }}
                onSubmit={onSubmit}
                validationSchema={ProfileSchema}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p className="w-150px">Ngày sinh: </p>
                            <Input
                                type="date"
                                name="dob"
                                onChange={handleChange}
                                placeholder="Vui lòng nhập chiều cao của bạn "
                                value={values.dob}
                                error={errors.dob}
                                touched={touched.dob}
                                containerNoMarginBottom
                                className="flex-fill"
                                errorNormalPosition
                                inputClassName="w-50"
                            />
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p className="w-150px">Giới tính: </p>
                            <Input
                                type="select"
                                name="gender"
                                onChange={handleChange}
                                value={values.gender}
                                error={errors.gender}
                                touched={touched.gender}
                                containerNoMarginBottom
                                className="flex-fill"
                                errorNormalPosition
                            >
                                {['Nam', 'Nữ'].map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </Input>
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p className="w-150px">Chiều cao : </p>
                            <Input
                                name="high"
                                onChange={handleChange}
                                placeholder="Vui lòng nhập chiều cao của bạn "
                                value={values.high}
                                error={errors.high}
                                touched={touched.high}
                                containerNoMarginBottom
                                className="flex-fill"
                                errorNormalPosition
                                inputClassName="w-50"
                            />
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p className="w-150px">Cân nặng : </p>
                            <Input
                                name="weight"
                                onChange={handleChange}
                                placeholder="Vui lòng nhập cân nặng của bạn "
                                value={values.weight}
                                error={errors.weight}
                                touched={touched.weight}
                                containerNoMarginBottom
                                className="flex-fill"
                                errorNormalPosition
                                inputClassName="w-50"
                            />
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p className="w-150px">Số điện thoại: </p>
                            <Input
                                name="phone"
                                onChange={handleChange}
                                value={values.phone}
                                error={errors.phone}
                                touched={touched.phone}
                                containerNoMarginBottom
                                className="flex-fill"
                                errorNormalPosition
                                inputClassName="w-50"
                            />
                        </div>
                        <div className="d-flex gap-4 align-items-center mb-3">
                            <p className="w-150px">Địa chỉ: </p>
                            <Input
                                name="address"
                                onChange={handleChange}
                                value={values.address}
                                error={errors.address}
                                touched={touched.address}
                                containerNoMarginBottom
                                className="flex-fill"
                                errorNormalPosition
                            />
                        </div>
                        {item?.messContent && <p className="mb-3 error-message">{item?.messContent}</p>}
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                className="button button-sm button-secondary"
                                type="button"
                                onClick={() => setShouldUpdate(false)}
                            >
                                Hủy
                            </button>
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

const UserProfile = () => {
    const { id } = useParams();
    const {
        profile: { dataResponse, isLoading, error },
        onFetchProfile,
        onUpdateProfile,
    } = useContext(AuthContext);
    const [shouldUpdate, setShouldUpdate] = useState(false);

    useEffect(() => {
        if (id) {
            onFetchProfile(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (isLoading) {
        return (
            <div className="mh-90vh">
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            </div>
        );
    }

    if (!isLoading && error) {
        return <p className="error-message">{error?.message || 'Something went wrong!'}</p>;
    }

    return (
        <div className="mh-90vh">
            <div className="profile__banner-top">
                <img src={topBanner} alt="" className="w-100" />
                <div className="profile-avatar__container">
                    <img src={dataResponse?.avatarImage || IMAGE_PLACEHODLER_URI} alt="" className="profile-avatar" />
                    <EditOutlined
                        style={{
                            cursor: 'pointer',
                            fontSize: 18,
                            color: '#289AE7',
                        }}
                        className="profile-avatar__upload"
                        onClick={() => {}}
                    />
                </div>
            </div>
            <div className="custom-page__container custom-page__container-no__margin-top">
                <div className="profile-name__container mb-4">
                    <h3 className="text-center">{dataResponse?.name}</h3>
                </div>
                <div className="bg-gray-custom p-4 rounded-2">
                    {shouldUpdate ? (
                        <EditProfileForm
                            item={dataResponse}
                            callback={(newValues) => {
                                setShouldUpdate(false);
                                onUpdateProfile(newValues);
                            }}
                            setShouldUpdate={setShouldUpdate}
                        />
                    ) : (
                        <>
                            <div className="mb-3">
                                <strong>Ngày sinh: </strong> {dataResponse?.dob}
                            </div>
                            <div className="mb-3">
                                <strong>Giới tính: </strong> {dataResponse?.gender}
                            </div>
                            <div className="mb-3">
                                <strong>Cân nặng: </strong> {dataResponse?.weight}
                            </div>
                            <div className="mb-3">
                                <strong>Chiều cao: </strong> {dataResponse?.high}
                            </div>
                            <div className="mb-3">
                                <strong>Số điện thoại: </strong> {dataResponse?.phone}
                            </div>
                            <div className="mb-3">
                                <strong>Địa chỉ: </strong> {dataResponse?.address}
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="button button-sm"
                                    type="button"
                                    onClick={() => setShouldUpdate(true)}
                                >
                                    Cập nhật thông tin
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <FavouriteRecipes />
            </div>
        </div>
    );
};

export default UserProfile;
