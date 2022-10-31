import * as Yup from 'yup';

const RecipeStep1Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    numberPeopleForDish: Yup.number().min(1, 'Min number of people is 1'),
    time: Yup.number().min(1, 'Min time is 1'),
});

const RecipeStep2Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    unit: Yup.string().required('Unit is required'),
    quantity: Yup.number().min(1, 'Min quantity is 1'),
    calo: Yup.number().min(1, 'Min calo is 1'),
});

export { RecipeStep1Schema, RecipeStep2Schema };
