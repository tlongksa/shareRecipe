import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
    weight: Yup.number().min(1, 'Vui lòng nhập cân nặng => 1'),
    high: Yup.number().min(1, 'Vui lòng nhập cân chiều cao => 1'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
    gender: Yup.string().required('Vui lòng chọn giới tính'),
    dob: Yup.string().required('Vui lòng chọn ngày tháng năm sinh'),
});

export { ProfileSchema };
