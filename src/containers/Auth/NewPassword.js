import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetNewPasswordRequest } from '../../api/requests';
import Input from '../../components/common/Input/Input';
import { NewPasswordSchema } from '../../validators';
import './new-password.scss';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const NewPassword = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (values) => {
        setIsProcessing(true);
        resetNewPasswordRequest(values)
            .then(({ data }) => {
                notification.open({
                    message: data?.messContent,
                    icon: (
                        <SmileOutlined
                            style={{
                                color: '#108ee9',
                            }}
                        />
                    ),
                });
                setIsProcessing(false);
                navigate('/signin');
            })
            .catch((err) => {
                setIsProcessing(false);
                notification.open({
                    message: err?.response?.data?.messContent,
                    icon: (
                        <SmileOutlined
                            style={{
                                color: '#108ee9',
                            }}
                        />
                    ),
                });
            });
    };

    return (
        <section className="new-password__container">
            <h1>Create New Password</h1>
            <Formik
                initialValues={{
                    password: '',
                    token: '',
                }}
                onSubmit={onSubmit}
                validationSchema={NewPasswordSchema}
            >
                {({ errors, touched, isValidating, values, handleChange, isSubmitting }) => (
                    <Form>
                        <Input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="New password"
                            value={values.password}
                            label="Enter new password"
                            error={errors.password}
                            touched={touched.password}
                        />
                        <Input
                            name="token"
                            onChange={handleChange}
                            placeholder="Verify Token"
                            value={values.token}
                            error={errors.token}
                            touched={touched.token}
                            label="Enter verify token from e-mail"
                        />
                        <button className="button button-sm" type="submit" disabled={isProcessing}>
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    );
};

export default NewPassword;
