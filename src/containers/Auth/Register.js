/* eslint-disable no-useless-escape */
import { useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { signupRequest } from '../../api/requests';
import authBannerImgSrc from '../../assets/img/auth_banner.png';
import Input from '../../components/common/Input/Input';

const USER_REGEX = /^[A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Register = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [fullname, setFulName] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrMsg('');
        setIsProcessing(true);
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry');
            return;
        }
        try {
            await signupRequest({ username, password, email, fullname });
            setIsProcessing(false);
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            openNotification();
            navigate('/signin');
        } catch (err) {
            setIsProcessing(false);
            if (err?.response) {
                setErrMsg(err?.response?.data?.message || err?.response?.data?.messContent);
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
        }
    };
    const openNotification = () => {
        notification.open({
            message: 'Đăng ký thành công !',
            description:
                'Chúc mùng bạn đã có tài khoản đăng nhập FSRS, bạn hãy đăng nhập tài khoản để có trải nghiệm thú vị nất',
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
        <section className="signup__container">
            <div className="register-body">
                {success ? (
                    <section>
                        <h1 className="mb-2">Đăng kí thành công!</h1>
                        <p>
                            <Link className="button button-sm" to="/signin">
                                Đăng nhập
                            </Link>
                        </p>
                    </section>
                ) : (
                    <section className="register-section__container">
                        <div className="main-register">
                            <p className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                                {errMsg}
                            </p>
                            <h1 className="register-title">Đăng ký</h1>
                            <p className="register-desc mb-3">
                                Đồng hành cùng chúng tôi để tạo ra những món ăn ngon nhất
                            </p>
                            <div className="mb-3">
                                <span className="text-red">*</span> Trường bắt buộc
                            </div>
                            <form onSubmit={handleSubmit} className="register-form">
                                <Input
                                    label="Họ và tên"
                                    onChange={(e) => setFulName(e.target.value)}
                                    value={fullname}
                                    shouldHasAsterisk
                                />
                                <label className="register-form__label">
                                    <span>
                                        Tên đăng nhập <span className="text-red">*</span>
                                    </span>
                                    <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validName || !username ? 'hide' : 'invalid'}
                                    />
                                </label>
                                <Input
                                    onChange={(e) => setUser(e.target.value)}
                                    value={username}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p
                                    className={`error-message mb-2 ${
                                        userFocus && username && !validName ? 'instructions' : 'offscreen'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Nhiều kí tự hơn.
                                    <br />
                                    Phải bắt đầu bằng một chữ cái.
                                    <br />
                                    Cho phép chữ cái, số, dấu gạch dưới, dấu gạch nối.
                                </p>
                                <label className="register-form__label">
                                    <span>
                                        Nhập mật khẩu <span className="text-red">*</span>
                                    </span>
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validPwd || !password ? 'hide' : 'invalid'}
                                    />
                                </label>
                                <Input
                                    type="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={password}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p
                                    className={`error-message mb-2 ${
                                        pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 đến 24 ký tự.
                                    <br />
                                    Phải bao gồm chữ hoa và chữ thường, một số và một ký tự đặc biệt.
                                    <br />
                                </p>

                                <label className="register-form__label">
                                    <span>
                                        Xác nhận mật khẩu <span className="text-red">*</span>
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={validMatch && matchPwd ? 'valid' : 'hide'}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                                    />
                                </label>
                                <Input
                                    type="password"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p
                                    className={`error-message mb-2 ${
                                        matchFocus && !validMatch ? 'instructions' : 'offscreen'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Phải khớp với trường nhập mật khẩu đầu tiên.
                                </p>

                                <label className="register-form__label">
                                    <span>
                                        E-mail <span className="text-red">*</span>
                                    </span>
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validEmail || !email ? 'hide' : 'invalid'}
                                    />
                                </label>
                                <Input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p
                                    className={`error-message ${
                                        emailFocus && !validEmail ? 'instructions' : 'offscreen'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Phải bao gồm @gmail.com
                                    <br />
                                </p>
                                <button
                                    type="submit"
                                    className="button button-full button-sm button-green mt-2"
                                    disabled={!validName || !validPwd || !validMatch || isProcessing ? true : false}
                                >
                                    Đăng ký
                                </button>
                            </form>
                            <Link to="/signin" className="text-green text-underline text-center d-block">
                                Bạn đã có tài khoản
                            </Link>
                        </div>
                        <div className="auth-banner">
                            <img src={authBannerImgSrc} alt="" />
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
};

export default Register;
