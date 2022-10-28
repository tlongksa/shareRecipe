import React, { useRef, useState } from 'react';
import './Login.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';

import showPwdImg from '../../img/show-password.png';
import hidePwdImg from '../../img/hide-.svg';
import apiUrl from '../../api/apiUrl';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const Login = () => {
    const navigate = useNavigate();
    const navigateTo = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(apiUrl.LOGIN_URL, JSON.stringify({ username, password }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const id = response?.data?.id;
            const img = response?.data?.avatarImage;
            const name = response?.data?.username;

            // localStorage.setItem("imgAVT", response.data.avatarImage);

            localStorage.setItem('token', accessToken);
            localStorage.setItem('roles', roles);
            localStorage.setItem('id', id);
            localStorage.setItem('img', img);
            localStorage.setItem('name', name);

            navigateTo(`/`);
            setUser('');
            setPwd('');
            openNotification();
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg(err);
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password (400)');
            } else if (err.response?.status === 401) {
                setErrMsg('user or password not value (401)');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };
    const openNotification = () => {
        notification.open({
            message: 'Đăng nhập thành công !',
            description:
                'Chào mừng bạn đến thăm quan trang website OiShii của chúng tôi, rất vui lòng được phục vụ quý khách, chúc quá khác có trải nghiệm thật tốt!!!',
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    };

    return (
        <div className="custom-page__container">
            <form onSubmit={handleSubmit} className="background">
                <h2 className="login__page-title">Wellcome to OiShii</h2>
                <div className="login-form__container">
                    <div className="left"></div>
                    <div className="right-login bg-gray-custom">
                        <div className="login-background">
                            <div className="login-title">Login</div>
                            <p ref={errRef} className={'error-message text-center'}>
                                {errMsg}
                            </p>
                            <div className="container-login">
                                <label htmlFor="name" className="label">
                                    User Name:{' '}
                                </label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Enter your user name"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={username}
                                        required
                                    />
                                </div>
                                <label htmlFor="password" className="label">
                                    Password:{' '}
                                </label>
                                <div className="form-group">
                                    <input
                                        type={isRevealPwd ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <img
                                        className="imgEye"
                                        title={isRevealPwd ? 'Hide password' : 'Show password'}
                                        src={isRevealPwd ? hidePwdImg : showPwdImg}
                                        onClick={() => setIsRevealPwd((prevState) => !prevState)}
                                        alt=""
                                    />
                                </div>
                                <button className="btnLogin">Login</button>
                                <div className="login-bottom__txt">
                                    <Link to="/sign-up" className="nav-link">
                                        Register
                                    </Link>
                                    <Link to="/forgot-password" className="nav-link">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Login;
