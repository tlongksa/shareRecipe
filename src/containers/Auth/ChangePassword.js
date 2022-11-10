import { useState } from 'react';
import { Link } from 'react-router-dom';
import './forgotPass.scss';
import { changePasswordRequest } from '../../api/requests';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [success, setSuccess] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const changePassword = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const { data } = await changePasswordRequest({ oldPassword, newPassword });
            setIsProcessing(false);
            setSuccess(data?.messContent);
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
                        <p>Change your password in three easy steps. This will help you to secure your password!</p>
                        <ol className="list-unstyled mb-5">
                            <li>
                                <span className="text-primary text-medium">1. </span>Enter your oldPassword.
                            </li>
                            <li>
                                <span className="text-primary text-medium">2. </span>Enter your newPassword
                            </li>
                            <li>
                                <span className="text-primary text-medium">3. </span>Enter your re-newPassword
                            </li>
                        </ol>
                        <div>
                            <form className="auth-form" method="POST" onSubmit={changePassword} autoComplete={'off'}>
                                <div className="auth-input__container mb-3">
                                    <input
                                        type={showOldPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={oldPassword}
                                        placeholder="Nhập mật khẩu cũ"
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="p-2 rounded-2 w-100 d-block auth-input"
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
                                </div>
                                <div className="auth-input__container mb-3">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={newPassword}
                                        placeholder="Nhập mật khẩu mới"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="p-2 rounded-2 w-100 d-block auth-input"
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
                                </div>
                                <div className="text-center mt-5">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 theme-btn mx-auto"
                                        disabled={isProcessing}
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>
                            <p className={success ? 'sucmsg' : 'offscreen'}>{success}</p>
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
