import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/form';
import './forgotPass.scss';
import { forgotPasswordRequest } from '../../api/requests';

const ForgotPassword = (props) => {
    const errRef = useRef();
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
                console.log(error);
            });
        errRef.current.focus();
    };

    return (
        <div className="mt-5 mh-85vh">
            <div className="bgr-fotgot-left"></div>
            <div className="bgr-fotgot-right">
                <div className="d-flex flex-column align-content-end">
                    <div className="auth-body mx-auto">
                        <h1>Forgot Password</h1>
                        <p>Change your password in three easy steps. This will help you to secure your password!</p>
                        <ol className="list-unstyled">
                            <li>
                                <span className="text-primary text-medium">1. </span>Enter your email address below.
                            </li>
                            <li>
                                <span className="text-primary text-medium">2. </span>Our system will send you a
                                temporary link
                            </li>
                            <li>
                                <span className="text-primary text-medium">3. </span>Use the link to reset your password
                            </li>
                        </ol>
                        <div className="">
                            <form className="auth-form" method="POST" onSubmit={forgotPassword} autoComplete={'off'}>
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
                                        {validate.validate && validate.validate.email ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 theme-btn mx-auto"
                                        disabled={isSubmitting}
                                    >
                                        Forgot Password
                                    </button>
                                </div>
                            </form>
                            <p ref={errRef} className={success ? 'sucmsg' : 'offscreen'}>
                                {success}
                            </p>
                            <hr />
                            <p className="">
                                <Link className="text-back" to="/signin">
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
