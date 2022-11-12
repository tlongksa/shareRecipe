import * as Yup from 'yup';

const BmiInfoSchema = Yup.object().shape({
    weight: Yup.number().min(1, 'Vui lòng nhập giá trị cân nặng hợp lệ'),
    high: Yup.number().min(1, 'Vui lòng nhập giá trị chiều cao hợp lệ'),
});

export { BmiInfoSchema };
