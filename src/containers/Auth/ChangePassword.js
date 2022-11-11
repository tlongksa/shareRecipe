import { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgotPass.scss';
import { changePasswordRequest } from '../../api/requests';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

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
            console.log(error);
        }
    };

    return (
        <div className="custom-page__container">
            <div className="change-password__container d-flex">
                <div className="bgr-fotgot-left" />
                <div className="bg-gray-custom p-5">
                    <div className="auth-body mx-auto">
                        <h1>Change Password</h1>
                        <p className="mb-2">
                            Change your password in three easy steps. This will help you to secure your password!
                        </p>
                        <ol className="list-unstyled mb-5">
                            <li>
                                <span className="text-primary text-medium">1. </span>Enter your oldPassword.
                            </li>
                            <li>
                                <span className="text-primary text-medium">2. </span>Enter your newPassword
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
                                    <button type="submit" className="button button-full" disabled={isProcessing}>
                                        Change Password
                                    </button>
                                </div>
                            </form>
                            <hr />
                            <p className="mt-3">
                                <Link className="text-back" to="/">
                                    Back to Home
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
