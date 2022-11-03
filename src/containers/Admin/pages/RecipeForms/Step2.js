import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../components/common/Input/Input';
import { RecipeStep2Schema } from '../../../../validators';
import produce from 'immer';
import { v4 as uuid_v4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';

const Step2 = ({ recipeFormData, setRecipeFormData, initialData }) => {
    const navigate = useNavigate();
    const [showNewMainIngredientForm, setShowNewMainIngredientForm] = useState(false);
    const [showNewExtraIngredientForm, setShowNewExtraIngredientForm] = useState(false);
    const [showExtraReplaceIngredientForm, setShowExtraReplaceIngredientForm] = useState(false);
    const [mainIngredients, setMainIngredients] = useState([]);
    const [extraIngredients, setExtraIngredients] = useState([]);
    const [selectedMainIng, setSelectedMainIng] = useState({});
    const [selectedExtraIng, setSelectedExtraIng] = useState({});
    const [selectedExtraReplaceIng, setSelectedExtraReplaceIng] = useState({});

    useEffect(() => {
        if (initialData?.listIngredientDetail?.length) {
            setMainIngredients(
                initialData.listIngredientDetail
                    .filter((it) => it.mainIngredient === 1)
                    .map((mappedItem) => ({
                        calo: mappedItem.calo,
                        mainIngredient: 1,
                        name: mappedItem.name,
                        quantity: mappedItem.quantity,
                        unit: mappedItem.unit,
                        id: uuid_v4(),
                    })),
            );
            setExtraIngredients(
                initialData.listIngredientDetail
                    .filter((it) => it.mainIngredient === 0)
                    .map((mappedItem) => ({
                        calo: mappedItem.calo,
                        mainIngredient: 0,
                        name: mappedItem.name,
                        quantity: mappedItem.quantity,
                        unit: mappedItem.unit,
                        id: uuid_v4(),
                        ingredientChangeList: mappedItem?.ingredientChangeList || [],
                    })),
            );
        }
    }, [initialData]);

    const onSubmitMainIngredient = (values, { resetForm }) => {
        if (selectedMainIng?.id) {
            setMainIngredients((prevState) =>
                prevState.map((item) =>
                    item.id === selectedMainIng?.id ? { ...values, id: selectedMainIng?.id, mainIngredient: 1 } : item,
                ),
            );
            setSelectedMainIng({});
            resetForm();
            return;
        }
        setMainIngredients(
            produce((draft) => {
                draft.push({ ...values, id: uuid_v4(), mainIngredient: 1 });
            }),
        );
        resetForm();
    };

    const onSubmitExtraIngredient = (values, { resetForm }) => {
        if (selectedExtraIng?.id) {
            setExtraIngredients((prevState) =>
                prevState.map((item) =>
                    item.id === selectedExtraIng?.id
                        ? { ...values, id: selectedExtraIng?.id, mainIngredient: 0, ingredientChangeList: [] }
                        : item,
                ),
            );
            setSelectedExtraIng({});
            resetForm();
            return;
        }
        setExtraIngredients(
            produce((draft) => {
                draft.push({ ...values, id: uuid_v4(), mainIngredient: 0, ingredientChangeList: [] });
            }),
        );
        resetForm();
    };

    const onSubmitExtraReplaceIngredient = (values, { resetForm }) => {
        if (selectedExtraReplaceIng?.id) {
            setExtraIngredients((prevState) =>
                prevState.map((item) =>
                    item.id === selectedExtraIng?.id
                        ? {
                              ...item,
                              ingredientChangeList: item.ingredientChangeList.map((it) =>
                                  it.id === selectedExtraReplaceIng?.id
                                      ? {
                                            ...values,
                                            id: selectedExtraReplaceIng?.id,
                                        }
                                      : it,
                              ),
                          }
                        : item,
                ),
            );
            setSelectedExtraReplaceIng({});
            resetForm();
            return;
        }
        setExtraIngredients((prevState) =>
            prevState.map((item) =>
                item.id === selectedExtraIng?.id
                    ? {
                          ...item,
                          ingredientChangeList: [
                              ...item.ingredientChangeList,
                              {
                                  ...values,
                                  id: uuid_v4(),
                              },
                          ],
                      }
                    : item,
            ),
        );
        resetForm();
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    quantity: 0,
                    unit: '',
                    calo: 0,
                }}
                onSubmit={onSubmitMainIngredient}
                validationSchema={RecipeStep2Schema}
            >
                {({ errors, touched, values, handleChange, handleReset, setValues }) => (
                    <Form>
                        <div className="main-ingredients__container">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4>Nguyên liệu chính : </h4>
                                <button
                                    className="button button-sm d-flex align-items-center gap-2"
                                    onClick={() => setShowNewMainIngredientForm(true)}
                                    type="button"
                                >
                                    <PlusCircleOutlined /> Thêm nguyên liệu
                                </button>
                            </div>
                            <div className={`d-flex gap-3 ${showNewMainIngredientForm ? '' : 'd-none'}`}>
                                <Input
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                    label="Tên nguyên liệu :"
                                    error={errors.name}
                                    touched={touched.name}
                                    className="w-100"
                                />
                                <Input
                                    name="quantity"
                                    type="number"
                                    onChange={handleChange}
                                    value={values.quantity}
                                    label="Số lượng :"
                                    error={errors.quantity}
                                    touched={touched.quantity}
                                    className="w-100"
                                />
                                <Input
                                    name="unit"
                                    onChange={handleChange}
                                    value={values.unit}
                                    label="Đơn vị :"
                                    error={errors.unit}
                                    touched={touched.unit}
                                    className="w-100"
                                />
                                <Input
                                    name="calo"
                                    type="number"
                                    onChange={handleChange}
                                    value={values.calo}
                                    label="Calo :"
                                    error={errors.calo}
                                    touched={touched.calo}
                                    className="w-100"
                                />
                            </div>
                            <div
                                className={`d-flex justify-content-end gap-4 align-items-center ${
                                    showNewMainIngredientForm ? '' : 'd-none'
                                }`}
                            >
                                <button className="button button-sm" type="submit">
                                    {selectedMainIng?.id ? 'Cập nhật' : 'Tạo'}
                                </button>
                            </div>
                            <ul className="main-ingredient__list">
                                {mainIngredients.map((item, index) => (
                                    <li
                                        className="main-ingredient__list-item mt-3"
                                        key={`main-ingredient__item-${item.id}`}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>
                                                {index + 1}. {item.name} {item.quantity} {item.unit}
                                            </strong>
                                            <span className="d-flex gap-3 align-items-center">
                                                <EditOutlined
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedMainIng(item);
                                                        setValues({
                                                            name: item.name,
                                                            quantity: item.quantity,
                                                            unit: item.unit,
                                                            calo: item.calo,
                                                        });
                                                    }}
                                                />
                                                <DeleteOutlined
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setMainIngredients((prevState) =>
                                                            prevState.filter((it) => it.id !== item.id),
                                                        );
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Form>
                )}
            </Formik>
            <br />
            <Formik
                initialValues={{
                    name: '',
                    quantity: 0,
                    unit: '',
                    calo: 0,
                }}
                onSubmit={onSubmitExtraIngredient}
                validationSchema={RecipeStep2Schema}
            >
                {({ errors, touched, values, handleChange, handleReset, setValues }) => (
                    <Form>
                        <div className="main-ingredients__container">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4>Nguyên liệu phụ : </h4>
                                <button
                                    className="button button-sm d-flex align-items-center gap-2"
                                    onClick={() => setShowNewExtraIngredientForm(true)}
                                    type="button"
                                >
                                    <PlusCircleOutlined /> Thêm nguyên liệu
                                </button>
                            </div>
                            <div className={`d-flex gap-3 ${showNewExtraIngredientForm ? '' : 'd-none'}`}>
                                <Input
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                    label="Tên nguyên liệu :"
                                    error={errors.name}
                                    touched={touched.name}
                                    className="w-100"
                                />
                                <Input
                                    name="quantity"
                                    type="number"
                                    onChange={handleChange}
                                    value={values.quantity}
                                    label="Số lượng :"
                                    error={errors.quantity}
                                    touched={touched.quantity}
                                    className="w-100"
                                />
                                <Input
                                    name="unit"
                                    onChange={handleChange}
                                    value={values.unit}
                                    label="Đơn vị :"
                                    error={errors.unit}
                                    touched={touched.unit}
                                    className="w-100"
                                />
                                <Input
                                    name="calo"
                                    type="number"
                                    onChange={handleChange}
                                    value={values.calo}
                                    label="Calo :"
                                    error={errors.calo}
                                    touched={touched.calo}
                                    className="w-100"
                                />
                            </div>
                            <div
                                className={`d-flex justify-content-end gap-4 align-items-center ${
                                    showNewExtraIngredientForm ? '' : 'd-none'
                                }`}
                            >
                                <button className="button button-sm" type="submit">
                                    {selectedExtraIng?.id ? 'Cập nhật' : 'Tạo'}
                                </button>
                            </div>
                            <ul className="main-ingredient__list">
                                {extraIngredients.map((item, index) => (
                                    <li
                                        className="main-ingredient__list-item mt-3"
                                        key={`main-ingredient__item-${item.id}`}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong>
                                                {index + 1}. {item.name} {item.quantity} {item.unit}
                                            </strong>
                                            <span className="d-flex gap-3 align-items-center">
                                                <PlusCircleOutlined
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedExtraIng(item);
                                                        setShowExtraReplaceIngredientForm(true);
                                                    }}
                                                />
                                                <EditOutlined
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedExtraIng(item);
                                                        setValues({
                                                            name: item.name,
                                                            quantity: item.quantity,
                                                            unit: item.unit,
                                                            calo: item.calo,
                                                        });
                                                    }}
                                                />
                                                <DeleteOutlined
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setExtraIngredients((prevState) =>
                                                            prevState.filter((it) => it.id !== item.id),
                                                        );
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="d-flex justify-content-end gap-4 align-items-center mt-4">
                <button
                    className="button button-sm button-secondary"
                    type="button"
                    onClick={() => navigate('/admin/recipe-form?step=1')}
                >
                    Trở về
                </button>
                <button
                    className="button button-sm"
                    type="button"
                    onClick={() => {
                        setRecipeFormData((prevState) => ({
                            ...prevState,
                            mainIngredients,
                            extraIngredients,
                        }));
                        navigate('/admin/recipe-form?step=3');
                    }}
                >
                    Tiếp theo
                </button>
            </div>
            <Modal
                show={showExtraReplaceIngredientForm && selectedExtraIng?.id}
                onHide={() => {
                    setShowExtraReplaceIngredientForm(false);
                    setSelectedExtraReplaceIng({});
                    setSelectedExtraIng({});
                }}
                fullscreen={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{selectedExtraIng?.name} Có thể thay thế bằng : </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            quantity: 0,
                            unit: '',
                            calo: 0,
                        }}
                        onSubmit={onSubmitExtraReplaceIngredient}
                        validationSchema={RecipeStep2Schema}
                    >
                        {({ errors, touched, values, handleChange, handleReset, setValues }) => (
                            <Form>
                                <div className="main-ingredients__container">
                                    <div className="d-flex gap-3">
                                        <Input
                                            name="name"
                                            onChange={handleChange}
                                            value={values.name}
                                            label="Tên nguyên liệu :"
                                            error={errors.name}
                                            touched={touched.name}
                                            className="w-100"
                                        />
                                        <Input
                                            name="quantity"
                                            type="number"
                                            onChange={handleChange}
                                            value={values.quantity}
                                            label="Số lượng :"
                                            error={errors.quantity}
                                            touched={touched.quantity}
                                            className="w-100"
                                        />
                                        <Input
                                            name="unit"
                                            onChange={handleChange}
                                            value={values.unit}
                                            label="Đơn vị :"
                                            error={errors.unit}
                                            touched={touched.unit}
                                            className="w-100"
                                        />
                                        <Input
                                            name="calo"
                                            type="number"
                                            onChange={handleChange}
                                            value={values.calo}
                                            label="Calo :"
                                            error={errors.calo}
                                            touched={touched.calo}
                                            className="w-100"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end gap-4 align-items-center">
                                        <button className="button button-sm" type="submit">
                                            {selectedExtraReplaceIng?.id ? 'Cập nhật' : 'Tạo'}
                                        </button>
                                    </div>
                                    <ul className="main-ingredient__list">
                                        {extraIngredients
                                            .find((extraIng) => extraIng.id === selectedExtraIng?.id)
                                            ?.ingredientChangeList?.map((item, index) => (
                                                <li
                                                    className="main-ingredient__list-item mt-3"
                                                    key={`main-ingredient__item-${item.id}`}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <strong>
                                                            {index + 1}. {item.name} {item.quantity} {item.unit}
                                                        </strong>
                                                        <span className="d-flex gap-3 align-items-center">
                                                            <EditOutlined
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    setSelectedExtraReplaceIng(item);
                                                                    setValues({
                                                                        name: item.name,
                                                                        quantity: item.quantity,
                                                                        unit: item.unit,
                                                                        calo: item.calo,
                                                                    });
                                                                }}
                                                            />
                                                            <DeleteOutlined
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    setExtraIngredients((prevState) =>
                                                                        prevState.map((item) =>
                                                                            item.id === selectedExtraIng?.id
                                                                                ? {
                                                                                      ...item,
                                                                                      ingredientChangeList:
                                                                                          item.ingredientChangeList.filter(
                                                                                              (it) => it.id !== item.id,
                                                                                          ),
                                                                                  }
                                                                                : item,
                                                                        ),
                                                                    );
                                                                }}
                                                            />
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Step2;
