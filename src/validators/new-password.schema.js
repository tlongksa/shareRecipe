import * as Yup from 'yup';

const NewPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    token: Yup.string().required('Authentication token is required'),
});

export { NewPasswordSchema };
