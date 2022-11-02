import { BMI_GET_DETAIL, BMI_GET_DETAIL_FAILURE, BMI_GET_DETAIL_SUCCESS, BMI_DETAIL_CLEAR } from './types';
import produce from 'immer';
import { defaultValues } from '.';

const bmiReducer = (state = defaultValues, { type, payload }) =>
    produce(state, (draft) => {
        switch (type) {
            case BMI_GET_DETAIL:
                draft.bmiDetail.isLoading = true;
                draft.bmiDetail.error = null;
                break;
            case BMI_GET_DETAIL_SUCCESS:
                draft.bmiDetail.dataResponse = payload;
                draft.bmiDetail.error = null;
                draft.bmiDetail.isLoading = false;
                break;
            case BMI_GET_DETAIL_FAILURE:
                draft.bmiDetail.error = payload;
                draft.bmiDetail.isLoading = false;
                break;
            case BMI_DETAIL_CLEAR:
                draft.bmiDetail = {
                    dataResponse: {},
                    isLoading: false,
                    error: null,
                };
                break;

            default:
                break;
        }
    });

export default bmiReducer;
