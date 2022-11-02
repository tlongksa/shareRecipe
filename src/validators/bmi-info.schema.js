import * as Yup from 'yup';

const BmiInfoSchema = Yup.object().shape({
    mobility: Yup.number().min(1.2, 'Min mobility is 1.2'),
    weight: Yup.number().min(1, 'Min weight is 1'),
    high: Yup.number().min(1, 'Min heigh is 1'),
});

export { BmiInfoSchema };
