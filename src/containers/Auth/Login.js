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
import Input from '../../components/common/Input/Input';
import authBannerImgSrc from '../../assets/img/auth_banner.png';

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
        setErrMsg('');
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
            if (err?.response) {
                setErrMsg(err?.response?.data?.message);
            } else {
                setErrMsg('Login Failed');
            }
        }
    };

    return (
        <section className="signin__container">
            <form onSubmit={handleSubmit}>
                <div className="login-form__container">
                    <div className="main-login">
                        <h3 className="login-title">Sign in</h3>
                        <p className="login-desc">accompany us to create the best food</p>
                        {errMsg && <p className="error-message">{errMsg}</p>}
                        <div className="container-login">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Enter your user name"
                                label="User Name"
                                onChange={(e) => setUser(e.target.value)}
                                value={username}
                                touched={true}
                            />
                            <div className="password-container">
                                <Input
                                    type={isRevealPwd ? 'text' : 'password'}
                                    name="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={password}
                                    touched={true}
                                />
                                <img
                                    className="toggle-password__type"
                                    title={isRevealPwd ? 'Hide password' : 'Show password'}
                                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                                    alt=""
                                />
                            </div>
                            <div className="signin-remember d-flex align-items-center justify-content-between">
                                <label className="checkboxContainer">
                                    Remember for next time sign in
                                    <input type="checkbox" />
                                    <span className="checkmarkCheckbox" />
                                </label>
                                <Link to="/forgot-password" className="text-green text-underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <button className="button button-sm button-full button-green mt-4" disabled={isProcessing}>
                                Sign In
                            </button>
                            <div className="login-bottom__txt">
                                Don’t have account?{' '}
                                <Link to="/sign-up" className="text-green text-underline">
                                    Sign up now
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="auth-banner">
                        <img src={authBannerImgSrc} alt="" />
                    </div>
                </div>
            </form>
        </section>
    );
};
export default Login;
