import * as Yup from 'yup';

const BmiInfoSchema = Yup.object().shape({
    mobility: Yup.number().min(1.1, 'Moblility is required'),
    weight: Yup.number().min(1, 'Min weight is 1'),
    high: Yup.number().min(1, 'Min heigh is 1'),
});

export { BmiInfoSchema };
