import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
    weight: Yup.number().min(1, 'Min weight is 1'),
    high: Yup.number().min(1, 'Min heigh is 1'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.string().required('Date of birth is required'),
});

export { ProfileSchema };
