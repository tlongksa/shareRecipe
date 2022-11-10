import React, { useContext, useState } from 'react';
import './Login.scss';
import { Link, useSearchParams } from 'react-router-dom';
import showPwdImg from '../../assets/img/show-password.png';
import hidePwdImg from '../../assets/img/hide-.svg';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth-context';
import { USER_INFO_STORAGE_KEY } from '../../constants';
import { ROLES } from '../../App';
import { loginRequest } from '../../api/requests';

const Login = () => {
    const { onLoginSuccess } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const redirectUrl = searchParams.get('redirectUrl');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const { data } = await loginRequest({ username, password });
            const roles = data?.roles?.[0];
            const dataToSave = {
                ...data,
                roles,
            };
            setIsProcessing(false);
            if (data?.accessToken) {
                onLoginSuccess(dataToSave);
                localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(dataToSave));
            }
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
            if (redirectUrl) {
                window.location.replace(redirectUrl);
                return;
            }
            if (roles === ROLES.admin) {
                window.location.replace('/admin/accounts');
                return;
            }
            window.location.replace('/');
        } catch (err) {
            setIsProcessing(false);
            if (!err?.response) {
                setErrMsg(err);
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password (400)');
            } else if (err.response?.status === 401) {
                setErrMsg('user or password not value (401)');
            } else {
                setErrMsg('Login Failed');
            }
        }
    };

    return (
        <div className="custom-page__container">
            <form onSubmit={handleSubmit} className="background">
                <h2 className="login__page-title mb-3">Wellcome to OiShii</h2>
                <div className="login-form__container">
                    <div className="left"></div>
                    <div className="right-login bg-gray-custom">
                        <div className="login-background">
                            <div className="login-title">Login</div>
                            <p className={'error-message text-center'}>{errMsg}</p>
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
                                <button className="btnLogin" disabled={isProcessing}>
                                    Login
                                </button>
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
