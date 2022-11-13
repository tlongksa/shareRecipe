import * as Yup from 'yup';

const NewPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
    token: Yup.string().required('Vui lòng nhập mã xác thực nhận được từ e-mail'),
});

export { NewPasswordSchema };
