import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import topBanner from '../../assets/img/profile_background.png';
import './index.scss';
import AuthContext from '../../context/auth-context';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import { updateAccountProfileRequest, updateProfileImageRequest } from '../../api/requests';
import Input from '../../components/common/Input/Input';
import { ProfileSchema } from '../../validators';
import FavouriteRecipes from './FavouriteRecipes';
import { IMAGE_PLACEHODLER_URI } from '../../constants';
import { generateImageUrl } from '../../utils';
import { fileUploadHandler } from '../../hooks/useFileUpload';
import { notification } from 'antd';

const EditProfileForm = ({ item, callback, setShouldUpdate }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const onSubmit = (values) => {
        if (new Date() < new Date(values.dob)) {
            notification.open({
                message: 'Vui lòng chọn ngày sinh không vượt quá ngày hiện tại',
            });
            return;
        }
        setIsProcessing(true);

        updateAccountProfileRequest(item.profileId, {
            phone: values.phone,
            high: parseInt(values.high.toString(), 10),
            weight: parseInt(values.weight.toString(), 10),
            address: values.address,
            name: item?.name,
            gender: values.gender,
            dob: values.dob,
            avatarImage: item.avatarImage,
            email: item.email,
        })
            .then(({ data }) => {
                setIsProcessing(false);
                callback({
                    ...values,
                    high: parseInt(values.high.toString(), 10),
                    weight: parseInt(values.weight.toString(), 10),
                });
            })
            .catch((err) => {
                setIsProcessing(false);
                console.log(err);
            });
    };

    return (
        <div className={`bmi-form__info flex-fill rounded ${isProcessing ? 'divDisabled' : ''}`}>
            <Formik
                initialValues={{
                    high: item?.high || '',
                    weight: item?.weight || '',
                    dob: item?.dob || '',
                    gender: item?.gender || 'Nam',
                    phone: item?.phone || '',
                    address: item?.address || '',
                }}
                onSubmit={onSubmit}
                validationSchema={ProfileSchema}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <div className="d-flex align-items-center gap-5 mb-3">
                            <div className="d-flex gap-4 align-items-center edit-profile__field-row w-100">
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
                            <div className="d-flex gap-4 align-items-center edit-profile__field-row w-100">
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
                        </div>
                        <div className="d-flex align-items-center gap-5 mb-3">
                            <div className="d-flex gap-4 align-items-center edit-profile__field-row w-100">
                                <p className="w-150px">Chiều cao(cm) : </p>
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
                            <div className="d-flex gap-4 align-items-center edit-profile__field-row w-100">
                                <p className="w-150px">Cân nặng(kg) : </p>
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
                        </div>
                        <div className="d-flex align-items-center gap-5 mb-3">
                            <div className="d-flex gap-4 align-items-center edit-profile__field-row w-100">
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
                            <div className="d-flex gap-4 align-items-center edit-profile__field-row w-100">
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

const UserProfile = () => {
    const { id } = useParams();
    const {
        profile: { dataResponse, isLoading, error },
        onFetchProfile,
        onUpdateProfile,
        onUpdateAvatarUrl,
    } = useContext(AuthContext);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [file, setFile] = useState(null);
    const profileImageRef = useRef();
    const [imgError, setImgError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [fileError, setFileError] = useState('');
    const [showEditAvatar, setShowEditAvatar] = useState(false);

    useEffect(() => {
        if (id) {
            onFetchProfile(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const uploadProfileImage = () => {
        fileUploadHandler(file, setIsUploading, setFileError, (url) => {
            setIsUploading(true);
            updateProfileImageRequest(id, url)
                .then(({ data }) => {
                    onUpdateAvatarUrl(url);
                    onFetchProfile(id);
                    notification.open({
                        message: data,
                    });
                    setFile(null);
                    setImgError('');
                    setFileError('');
                    setIsUploading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsUploading(false);
                });
        });
    };

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
        return <p className="error-message">{error?.message || 'Lỗi xảy ra!'}</p>;
    }

    return (
        <div className="mh-90vh">
            <div className="profile__banner-top">
                <img src={topBanner} alt="" className="w-100" />
                <div className="profile-avatar__container">
                    <img
                        src={
                            file
                                ? generateImageUrl(file, setImgError)
                                : dataResponse?.avatarImage || IMAGE_PLACEHODLER_URI
                        }
                        alt=""
                        className="profile-avatar"
                        onMouseEnter={() => setShowEditAvatar(true)}
                    />
                    {!imgError && file && generateImageUrl(file, setImgError) ? (
                        <button
                            className={`button button-sm profile-avatar__upload ${isUploading ? 'divDisabled' : ''}`}
                            onClick={uploadProfileImage}
                        >
                            Upload
                        </button>
                    ) : (
                        <EditOutlined
                            style={{
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#289AE7',
                            }}
                            className={`profile-avatar__upload ${showEditAvatar ? '' : 'd-none'}`}
                            onClick={() => {
                                profileImageRef.current?.click();
                            }}
                        />
                    )}
                </div>
            </div>
            {fileError && <p className="error-message text-center">{fileError}</p>}
            {imgError && <p className="error-message text-center">{imgError}</p>}
            <div className="custom-page__container custom-page__container-no__margin-top">
                <div className="profile-name__container mb-4">
                    <h3 className="text-center">{dataResponse?.name}</h3>
                </div>
                <div className="bg-green-blur p-4 rounded-4 text-larger">
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
                            <div className="d-flex align-items-center gap-5 mb-3">
                                <div className="w-100">
                                    <strong>Ngày sinh: </strong> {dataResponse?.dob}
                                </div>
                                <div className="w-100">
                                    <strong>Giới tính: </strong> {dataResponse?.gender}
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-5 mb-3">
                                <div className="w-100">
                                    <strong>Cân nặng: </strong> {dataResponse?.weight} kg
                                </div>
                                <div className="w-100">
                                    <strong>Chiều cao: </strong> {dataResponse?.high} cm
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-5 mb-3">
                                <div className="w-100">
                                    <strong>Số điện thoại: </strong> {dataResponse?.phone}
                                </div>
                                <div className="w-100">
                                    <strong>Địa chỉ: </strong> {dataResponse?.address}
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    className="button button-sm button-green"
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
            <input
                type="file"
                className="d-none"
                ref={profileImageRef}
                onChange={(e) => setFile(e.target?.files?.[0])}
            />
        </div>
    );
};

export default UserProfile;
