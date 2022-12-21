import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/form';
import './forgotPass.scss';
import { forgotPasswordRequest } from '../../api/requests';
import authBannerImgSrc from '../../assets/img/auth_banner.png';
import { notification } from 'antd';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState();
    const [validate, setValidate] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateforgotPassword = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true,
            },
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors,
            });

            isValid = false;
        }
        return isValid;
    };

    const forgotPassword = async (e) => {
        e.preventDefault();
        const validate = validateforgotPassword();
        if (validate) {
            setEmail('');
        }
        setIsSubmitting(true);
        forgotPasswordRequest(email)
            .then(({ data }) => {
                setIsSubmitting(false);
                setEmail(email);
                setSuccess(data?.messContent);
                navigate('/new-password');
            })
            .catch((error) => {
                setIsSubmitting(false);
                notification.open({
                    message: error?.response?.data?.messContent,
                });
            });
    };

    return (
        <div className="mt-5 mh-85vh">
            <div className="custom-page__container">
                <div className="forgot-password__container d-flex">
                    <div className="bgr-fotgot-right p-3 px-5">
                        <div className="auth-body">
                            <h1 className="mb-5 text-center">Quên mật khẩu</h1>
                            <p>
                                Thay đổi mật khẩu của bạn trong ba bước đơn giản. Điều này sẽ giúp bạn bảo mật mật khẩu
                                của mình!
                            </p>
                            <ol className="list-unstyled">
                                <li className="mt-3">
                                    <span className="text-green text-medium">1. </span>Nhập địa chỉ email của bạn vào
                                    bên dưới.
                                </li>
                                <li className="mt-3">
                                    <span className="text-green text-medium">2. </span>Hệ thống của chúng tôi sẽ gửi cho
                                    bạn một liên kết tạm thời
                                </li>
                                <li className="mt-3">
                                    <span className="text-green text-medium">3. </span>Sử dụng liên kết để đặt lại mật
                                    khẩu của bạn
                                </li>
                            </ol>
                            <div>
                                <form
                                    className="auth-form"
                                    method="POST"
                                    onSubmit={forgotPassword}
                                    autoComplete={'off'}
                                >
                                    <div className="email mb-3">
                                        <input
                                            type="email"
                                            className={`form-control ${
                                                validate.validate && validate.validate.email ? 'is-invalid ' : ''
                                            }`}
                                            id="email"
                                            name="email"
                                            value={email}
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div
                                            className={`invalid-feedback text-start ${
                                                validate.validate && validate.validate.email ? 'd-block' : 'd-none'
                                            }`}
                                        >
                                            {validate.validate && validate.validate.email
                                                ? validate.validate.email?.[0]
                                                : ''}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="button button-full button-green"
                                            disabled={isSubmitting}
                                        >
                                            Quên mật khẩu
                                        </button>
                                    </div>
                                </form>
                                <p className={success ? 'sucmsg' : 'offscreen'}>{success}</p>
                                <hr />
                                <p className="">
                                    <Link className="text-back text-green" to="/signin">
                                        Quay lại đăng nhập
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
        </div>
    );
};

export default ForgotPassword;
