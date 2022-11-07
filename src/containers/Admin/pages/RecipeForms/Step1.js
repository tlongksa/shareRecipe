import { LoadingOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/common/Input/Input';
import { RECIPE_LEVELS } from '../../../../constants';
import RecipeContext from '../../../../context/recipe-context';
import { RecipeStep1Schema } from '../../../../validators';

const Step1 = ({ recipeFormData, setRecipeFormData, id, step, isLoading, initialValues, isMod }) => {
    const { onFetchRecipeCategories, categories } = useContext(RecipeContext);
    const navigate = useNavigate();
    const [idDishCategory, setIdDishCategory] = useState([]);

    useEffect(() => {
        if (recipeFormData?.idDishCategory) {
            setIdDishCategory(recipeFormData.idDishCategory);
        }
    }, [recipeFormData]);

    useEffect(() => {
        onFetchRecipeCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCheckRecipeCategory = (e) => {
        const value = parseInt(e.target.value);
        if (idDishCategory.find((item) => item.dishCategoryID === value)) {
            setIdDishCategory((prevState) => prevState.filter((item) => item.dishCategoryID !== value));
        } else {
            setIdDishCategory((prevState) => [...prevState, { dishCategoryID: value }]);
        }
    };

    const onSubmit = (values) => {
        setRecipeFormData((prevState) => ({
            ...prevState,
            ...values,
            idDishCategory,
        }));
        navigate(`/admin/recipe-form?step=2${id ? `&id=${id}` : ''}`);
    };

    if (step !== '1') {
        return null;
    }

    if (isLoading) {
        return (
            <div className="global-list__loader-container">
                <LoadingOutlined className="global-list__loader-icon" />
            </div>
        );
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={RecipeStep1Schema}
            enableReinitialize={true}
        >
            {({ errors, touched, values, handleChange }) => (
                <Form>
                    <Input
                        name="name"
                        onChange={handleChange}
                        placeholder="Vui lòng nhập tên món ăn"
                        value={values.name}
                        label="Nhập tên món ăn :"
                        error={errors.name}
                        touched={touched.name}
                    />
                    <Input
                        type="textarea"
                        name="description"
                        onChange={handleChange}
                        placeholder="Vui lòng mô tả chi tiết công thức nấu ăn của bạn"
                        value={values.description}
                        error={errors.description}
                        touched={touched.description}
                        label="Mô tả công thức :"
                    />
                    <div className="recipe-category__container">
                        <h5 className="recipe-field__label">Thể loại món ăn</h5>
                        <div className="recipe-category__list">
                            {categories.list.map(({ dishCategoryID, name }, index) => (
                                <label key={`${dishCategoryID}-${index}`} className="checkboxContainer">
                                    {name}
                                    <input
                                        type="checkbox"
                                        value={dishCategoryID}
                                        onChange={onCheckRecipeCategory}
                                        checked={idDishCategory.find((item) => item.dishCategoryID === dishCategoryID)}
                                    />
                                    <span className="checkmarkCheckbox" />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="recipe-level__container">
                        <h5 className="recipe-field__label">Độ khó của món ăn :</h5>
                        <div className="recipe-level__list">
                            {RECIPE_LEVELS.map(({ value, label }) => (
                                <label key={value} className="custom-radio__container">
                                    {label}
                                    <input type="radio" name="Level" onChange={handleChange} value={value} />
                                    <span className="radioCheckmark" />
                                </label>
                            ))}
                        </div>
                        {errors.Level && touched.Level && <p className="error-message">{errors.Level}</p>}
                    </div>
                    <div className="mt-3 d-flex gap-5">
                        <Input
                            name="numberPeopleForDish"
                            type="number"
                            onChange={handleChange}
                            value={values.numberPeopleForDish}
                            label="Số người ăn :"
                            error={errors.numberPeopleForDish}
                            touched={touched.numberPeopleForDish}
                            className="w-100"
                        />
                        <Input
                            name="time"
                            type="number"
                            onChange={handleChange}
                            value={values.time}
                            label="Thời gian nấu :"
                            error={errors.time}
                            touched={touched.time}
                            className="w-100"
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-4 align-items-center mt-4">
                        <button
                            className="button button-sm button-secondary"
                            type="button"
                            onClick={() => {
                                setRecipeFormData({});
                                setIdDishCategory([]);
                                navigate(isMod ? '/my-recipes' : '/admin/recipes');
                            }}
                        >
                            Hủy bỏ
                        </button>
                        <button className="button button-sm" type="submit">
                            Tiếp theo
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Step1;
