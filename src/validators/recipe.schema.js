import * as Yup from 'yup';

const RecipeStep1Schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    numberPeopleForDish: Yup.number().min(1, 'Min number of people is 1'),
    time: Yup.number().min(1, 'Min time is 1'),
    level: Yup.number().oneOf([1, 2, 3]),
});

export { RecipeStep1Schema };
