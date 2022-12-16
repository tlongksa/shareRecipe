import { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgotPass.scss';
import { changePasswordRequest } from '../../api/requests';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import authBannerImgSrc from '../../assets/img/auth_banner.png';
import { notification } from 'antd';

const ChangePassword = (props) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const changePassword = async (values) => {
        setIsProcessing(true);
        try {
            const { data } = await changePasswordRequest(values);
            console.log(data);
            setIsProcessing(false);
        } catch (error) {
            setIsProcessing(false);
            notification.open({
                message: error?.response?.data?.messContent || error?.response?.data?.message,
            });
        }
    };

    return (
        <div className="change-password__container">
            <div className="change-password__container d-flex">
                <div className="p-5">
                    <div className="auth-body mx-auto">
                        <h1>Đổi mật khẩu</h1>
                        <p className="mb-2">
                            Thay đổi mật khẩu của bạn trong ba bước đơn giản. Điều này sẽ giúp bạn bảo mật mật khẩu của
                            mình!
                        </p>
                        <ol className="list-unstyled mb-5">
                            <li>
                                <span className="text-green text-medium">1. </span>Nhập mật khẩu cũ của bạn.
                            </li>
                            <li>
                                <span className="text-green text-medium">2. </span>Nhập mật khẩu mới của bạn
                            </li>
                        </ol>
                        <div>
                            <form
                                className="auth-form"
                                method="POST"
                                onSubmit={handleSubmit(changePassword)}
                                autoComplete={'off'}
                            >
                                <div className="auth-input__container mb-3">
                                    <input
                                        type={showOldPassword ? 'text' : 'password'}
                                        placeholder="Nhập mật khẩu cũ"
                                        className="p-3 rounded-2 w-100 d-block auth-input"
                                        {...register('oldPassword', {
                                            required: {
                                                value: true,
                                                message: 'Đây là trường bắt buộc',
                                            },
                                        })}
                                    />
                                    {showOldPassword ? (
                                        <EyeInvisibleOutlined
                                            className="auth-input__icon"
                                            onClick={() => setShowOldPassword(false)}
                                        />
                                    ) : (
                                        <EyeOutlined
                                            className="auth-input__icon"
                                            onClick={() => setShowOldPassword(true)}
                                        />
                                    )}
                                    {errors.oldPassword && (
                                        <p className="error-message">{errors.oldPassword.message}</p>
                                    )}
                                </div>
                                <div className="auth-input__container mb-3">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        {...register('newPassword', {
                                            required: {
                                                value: true,
                                                message: 'Đây là trường bắt buộc',
                                            },
                                            minLength: {
                                                value: 8,
                                                message: 'Mật khẩu phải có ít nhất 8 kí tự',
                                            },
                                            pattern: {
                                                value: /\d/,
                                                message: 'Mật khẩu phải có ít nhất 1 kí tự chữ số',
                                            },
                                            validate: (value) => {
                                                if (!/[A-Z]/.test(value)) {
                                                    return 'Mật khẩu phải có ít nhất 1 kí tự in hoa';
                                                }
                                                return true;
                                            },
                                        })}
                                        placeholder="Nhập mật khẩu mới"
                                        className="p-3 rounded-2 w-100 d-block auth-input"
                                    />
                                    {showNewPassword ? (
                                        <EyeInvisibleOutlined
                                            className="auth-input__icon"
                                            onClick={() => setShowNewPassword(false)}
                                        />
                                    ) : (
                                        <EyeOutlined
                                            className="auth-input__icon"
                                            onClick={() => setShowNewPassword(true)}
                                        />
                                    )}
                                    {errors.newPassword && (
                                        <p className="error-message">{errors.newPassword.message}</p>
                                    )}
                                </div>
                                <div className="text-center mt-5">
                                    <button
                                        type="submit"
                                        className="button button-full button-sm button-green"
                                        disabled={isProcessing}
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </form>
                            <hr />
                            <p className="mt-3">
                                <Link className="text-back text-green" to="/">
                                    Trở về trang chủ
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="auth-banner">
                    <img src={authBannerImgSrc} alt="" />
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
