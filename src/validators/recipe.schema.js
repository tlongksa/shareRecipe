import * as Yup from 'yup';

const RecipeStep1Schema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên công thức'),
    description: Yup.string().required('Vui lòng nhập mô tả công thức'),
    numberPeopleForDish: Yup.number().min(1, 'Vui lòng nhập sô lượng người ăn >= 1'),
    time: Yup.number().min(1, 'Vui lòng nhập thời gian nấu >= 1 phút'),
    level: Yup.string().required('Vui lòng chọn độ khó công thức'),
});

const RecipeStep2Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    unit: Yup.string().required('Unit is required'),
    quantity: Yup.number().min(1, 'Min quantity is 1'),
    calo: Yup.number().min(1, 'Min calo is 1'),
});

export { RecipeStep1Schema, RecipeStep2Schema };
