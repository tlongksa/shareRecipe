import * as Yup from 'yup';

const RecipeStep1Schema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên công thức'),
    description: Yup.string().required('Vui lòng nhập mô tả công thức'),
    numberPeopleForDish: Yup.number().min(1, 'Vui lòng nhập sô lượng người ăn >= 1'),
    time: Yup.number().min(1, 'Vui lòng nhập thời gian nấu >= 1 phút'),
    level: Yup.string().required('Vui lòng chọn độ khó công thức'),
});

const RecipeStep2Schema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên nguyên liệu'),
    unit: Yup.string().required('Vui lòng nhập đơn vị'),
    quantity: Yup.number().min(0, 'Vui lòng nhập số lượng >= 0'),
    calo: Yup.number().min(0, 'Vui lòng nhập kcal >= 0'),
});

export { RecipeStep1Schema, RecipeStep2Schema };
