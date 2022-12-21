import React, { useContext, useState } from 'react';
import './Login.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import AuthContext from '../../context/auth-context';
import { USER_INFO_STORAGE_KEY } from '../../constants';
import { ROLES } from '../../App';
import { loginRequest } from '../../api/requests';
import Input from '../../components/common/Input/Input';
import authBannerImgSrc from '../../assets/img/auth_banner.png';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const Login = () => {
    const { onLoginSuccess } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const redirectUrl = searchParams.get('redirectUrl');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        if (!username || !password) {
            setErrMsg('Vui lòng không để trống tên đăng nhập & mật khẩu');
            return;
        }
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
                        <h3 className="login-title mb-5 text-center">Đăng nhập</h3>
                        <p className="login-desc">Đồng hành cùng chúng tôi để tạo ra những món ăn ngon nhất</p>
                        {errMsg && <p className="error-message">{errMsg}</p>}
                        <div className="container-login">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Tên đăng nhập"
                                label="Tên đăng nhập"
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                    setErrMsg('');
                                }}
                                value={username}
                                touched={true}
                            />
                            <div className="password-container">
                                <Input
                                    type={isRevealPwd ? 'text' : 'password'}
                                    name="password"
                                    label="Mật khẩu"
                                    placeholder="Mật khẩu"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrMsg('');
                                    }}
                                    value={password}
                                    touched={true}
                                />
                                {isRevealPwd ? (
                                    <EyeInvisibleOutlined
                                        className="toggle-password__type"
                                        onClick={() => setIsRevealPwd(false)}
                                        title="Hide password"
                                    />
                                ) : (
                                    <EyeOutlined
                                        className="toggle-password__type"
                                        onClick={() => setIsRevealPwd(true)}
                                        title="Show password"
                                    />
                                )}
                            </div>
                            <div className="signin-remember d-flex justify-content-end">
                                <Link to="/forgot-password" className="text-green text-underline">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <button className="button button-sm button-full button-green mt-4" disabled={isProcessing}>
                                Đăng nhập
                            </button>
                            <div className="login-bottom__txt">
                                Bạn chưa có tài khoản ?
                                <Link to="/sign-up" className="text-green text-underline">
                                    Đăng ký ngay
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
