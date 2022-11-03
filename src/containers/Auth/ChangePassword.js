import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './forgotPass.scss';
import { changePasswordRequest } from '../../api/requests';

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [success, setSuccess] = useState();
    const errRef = useRef();

    const changePassword = async (e) => {
        e.preventDefault();
        const { data } = await changePasswordRequest({ oldPassword, newPassword });
        setSuccess(data.messContent);
    };

    return (
        <div className="custom-page__container">
            <div className="change-password__container d-flex">
                <div className="bgr-fotgot-left" />
                <div className="bg-gray-custom p-5">
                    <div className="auth-body mx-auto">
                        <h1>Change Password</h1>
                        <p>Change your password in three easy steps. This will help you to secure your password!</p>
                        <ol class="list-unstyled mb-5">
                            <li>
                                <span class="text-primary text-medium">1. </span>Enter your oldPassword.
                            </li>
                            <li>
                                <span class="text-primary text-medium">2. </span>Enter your newPassword
                            </li>
                            <li>
                                <span class="text-primary text-medium">3. </span>Enter your re-newPassword
                            </li>
                        </ol>
                        <div>
                            <form className="auth-form" method="POST" onSubmit={changePassword} autoComplete={'off'}>
                                <div className="email mb-3">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={oldPassword}
                                        placeholder="Nhập mật khẩu cũ"
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="border-1 border-dark p-2 rounded-2 w-100 d-block"
                                    />
                                </div>
                                <div className="email mb-3">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={newPassword}
                                        placeholder="Nhập mật khẩu mới"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="border-1 border-dark p-2 rounded-2 w-100 d-block"
                                    />
                                </div>
                                <div className="text-center mt-5">
                                    <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">
                                        Change Password
                                    </button>
                                </div>
                            </form>
                            <p ref={errRef} className={success ? 'sucmsg' : 'offscreen'}>
                                {success}
                            </p>

                            <hr />
                            <p className="">
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
