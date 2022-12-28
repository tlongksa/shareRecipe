import React, { useContext, useEffect, useState, startTransition } from 'react';
import './index.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import AuthContext from '../../../../context/auth-context';
import { fileUploadHandler } from '../../../../hooks/useFileUpload';
import { createRecipeRequest, editRecipeRequest } from '../../../../api/requests';
import RecipeContext from '../../../../context/recipe-context';
import { LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { ROLES } from '../../../../App';
import imgLoader from '../../../../assets/img/loader.png';

const RecipeForm = () => {
    const {
        userInfo: { roles, username },
    } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const step = searchParams.get('step');
    const stepNum = +step;
    const id = searchParams.get('id');
    const [shouldFinish, setShouldFinish] = useState(false);
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [fileError, setFileError] = useState('');
    const [listDishImage, setListDishImage] = useState([]);
    const [video, setVideo] = useState('');
    const {
        recipeDetail: { dataResponse, isLoading, error },
        recipeFormData,
        onFetchDetail,
        onClearDetail,
        onSetFormData,
    } = useContext(RecipeContext);

    const isMod = roles === ROLES.mod;

    useEffect(() => {
        if (roles && roles === ROLES.user) {
            navigate('/');
        }
    }, [roles, navigate]);

    useEffect(() => {
        if (id) {
            onFetchDetail(id);
        }
        return () => {
            onClearDetail();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (id && dataResponse?.name) {
            startTransition(() => {
                onSetFormData({
                    name: dataResponse.name,
                    description: dataResponse?.formula?.describe,
                    level: dataResponse.level,
                    time: dataResponse.time,
                    idDishCategory: dataResponse.listDishCategory,
                    mainIngredients: dataResponse.listIngredientDetail
                        ?.filter((it) => it.mainIngredient === 1)
                        .map((mappedItem) => ({
                            calo: mappedItem.calo,
                            mainIngredient: 1,
                            name: mappedItem.name,
                            quantity: mappedItem.quantity,
                            unit: mappedItem.unit,
                            id: mappedItem.ingredientDetailID,
                        })),
                    extraIngredients: dataResponse?.listIngredientDetail
                        ?.filter((it) => !it.mainIngredient)
                        .map((mappedItem) => ({
                            calo: mappedItem.calo,
                            mainIngredient: 0,
                            name: mappedItem.name,
                            quantity: mappedItem.quantity,
                            unit: mappedItem.unit,
                            id: mappedItem.ingredientDetailID,
                            ingredientChangeList:
                                mappedItem?.listIngredientChange?.map((nestedItem) => ({
                                    name: nestedItem.name,
                                    quantity: nestedItem.quantity,
                                    unit: nestedItem.unit,
                                    calo: nestedItem.calo,
                                    id: nestedItem.ingredientChangeID,
                                })) || [],
                        })),
                    video: dataResponse.video,
                    listDishImage: dataResponse.listDishImage,
                    listStep: dataResponse.listStep,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dataResponse]);

    useEffect(() => {
        if (!step || (step !== '1' && step !== '2' && step !== '3')) {
            navigate('/admin/recipes');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    useEffect(() => {
        if (shouldFinish) {
            uploadRecipeAssetsHandler();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldFinish]);

    useEffect(() => {
        if (
            !fileError &&
            video &&
            listDishImage.length > 0 &&
            (id ? true : listDishImage.length === recipeFormData?.files?.length)
        ) {
            createRecipeHandler();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeFormData?.files, fileError, video, listDishImage.length]);

    function uploadRecipeAssetsHandler() {
        if (id) {
            if (!recipeFormData?.videoFile) {
                setVideo(dataResponse?.video);
            } else {
                fileUploadHandler(
                    recipeFormData.videoFile,
                    setIsUploading,
                    setFileError,
                    (videoUrl) => {
                        setVideo(videoUrl);
                    },
                    'videos/',
                );
            }
            if (![...recipeFormData.files].length) {
                setListDishImage(dataResponse?.listDishImage.map(({ url, note }) => ({ url, note })));
            } else {
                [...recipeFormData.files].forEach((file) => {
                    fileUploadHandler(file, setIsUploading, setFileError, (url) => {
                        setListDishImage((prevState) => [...prevState, { url, note: '' }]);
                    });
                });
            }
        } else {
            fileUploadHandler(
                recipeFormData.videoFile,
                setIsUploading,
                setFileError,
                (videoUrl) => {
                    setVideo(videoUrl);
                },
                'videos/',
            );
            [...recipeFormData.files].forEach((file) => {
                fileUploadHandler(file, setIsUploading, setFileError, (url) => {
                    setListDishImage((prevState) => [...prevState, { url, note: '' }]);
                });
            });
        }
    }

    function createRecipeHandler() {
        setIsCreating(true);
        const payloadToSubmit = {
            video,
            listDishImage,
            name: recipeFormData.name,
            origin: 'vn',
            level: +recipeFormData.level,
            calo: recipeFormData.calo,
            numberPeopleForDish: 1,
            time: recipeFormData.time,
            idDishCategory: recipeFormData.idDishCategory,
            formulaId: {
                describe: recipeFormData.description,
                summary: '',
                listStep: recipeFormData?.listStep.map((step, index) => ({
                    describe: step.describe,
                    title: index + 1,
                })),
                account: {
                    userName: username,
                },
            },
            listIngredientDetail: [
                ...recipeFormData.mainIngredients.map((mainIng) => ({
                    name: mainIng.name,
                    quantity: mainIng.quantity,
                    unit: mainIng.unit,
                    calo: mainIng.calo,
                    mainIngredient: 1,
                    ingredientChangeList: null,
                })),
                ...recipeFormData.extraIngredients.map((extraIng) => ({
                    name: extraIng.name,
                    quantity: extraIng.quantity,
                    unit: extraIng.unit,
                    calo: extraIng.calo,
                    mainIngredient: 0,
                    ingredientChangeList: extraIng.ingredientChangeList.map((replaceIng) => ({
                        name: replaceIng.name,
                        quantity: replaceIng.quantity,
                        unit: replaceIng.unit,
                        calo: replaceIng.calo,
                    })),
                })),
            ],
        };
        if (id) {
            return editRecipeRequest(id, payloadToSubmit)
                .then(({ data }) => {
                    setIsCreating(false);
                    notification.open({
                        message: data?.message,
                    });
                    navigate(isMod ? '/my-recipes' : '/admin/recipes');
                })
                .catch((err) => {
                    console.log(err);
                    setIsCreating(false);
                });
        }
        createRecipeRequest(payloadToSubmit)
            .then(({ data }) => {
                setIsCreating(false);
                notification.open({
                    message: data?.message || data || 'Tạo món ăn thành công',
                });
                navigate(isMod ? '/my-recipes' : '/admin/recipes');
            })
            .catch((err) => {
                console.log(err);
                setIsCreating(false);
            });
    }

    if (isLoading) {
        return (
            <div className="recipe-form__container">
                <div className="global-list__loader-container">
                    <LoadingOutlined className="global-list__loader-icon" />
                </div>
            </div>
        );
    }

    if (!isLoading && error) {
        return (
            <div className="recipe-form__container">
                <p className="error-message">{error || 'Lỗi xảy ra!'}</p>
            </div>
        );
    }

    return (
        <section
            className={`recipe-form__container pb-4 ${isMod ? 'custom-page__container-management mt-4' : ''} ${
                isUploading || isCreating ? 'divDisabled' : ''
            }`}
        >
            <h2 className="recipe-form__title text-center mb-3">{id ? 'Sửa công thức' : 'Tạo công thức'}</h2>
            <div className="recipe-form__steps">
                <button
                    className={`${stepNum === 1 ? 'active-step' : ''}`}
                    onClick={() => navigate(`${isMod ? '' : '/admin'}/recipe-form?step=1${id ? `&id=${id}` : ''}`)}
                >
                    Bước 1
                </button>
                <button
                    className={`${stepNum === 2 ? 'active-step' : ''} ${stepNum >= 2 ? '' : 'divDisabled'}`}
                    onClick={() => navigate(`${isMod ? '' : '/admin'}/recipe-form?step=2${id ? `&id=${id}` : ''}`)}
                >
                    Bước 2
                </button>
                <button
                    className={`${stepNum === 3 ? 'active-step' : ''} ${stepNum >= 3 ? '' : 'divDisabled'}`}
                    onClick={() => navigate(`${isMod ? '' : '/admin'}/recipe-form?step=3${id ? `&id=${id}` : ''}`)}
                >
                    bước 3
                </button>
            </div>
            {fileError && <p className="error-message">{fileError}</p>}
            {step === '1' && (
                <Step1
                    recipeFormData={recipeFormData}
                    setRecipeFormData={onSetFormData}
                    id={id}
                    isLoading={isLoading}
                    initialValues={{
                        name: recipeFormData.name || '',
                        description: recipeFormData.description || '',
                        level: recipeFormData?.level?.toString() || '',
                        time: recipeFormData?.time || 0,
                    }}
                    isMod={isMod}
                />
            )}
            {step === '2' && (
                <Step2 recipeFormData={recipeFormData} setRecipeFormData={onSetFormData} id={id} isMod={isMod} />
            )}
            {step === '3' && (
                <Step3
                    recipeFormData={recipeFormData}
                    setRecipeFormData={onSetFormData}
                    setShouldFinish={setShouldFinish}
                    id={id}
                    isMod={isMod}
                />
            )}
            {(isUploading || isCreating) && (
                <div className="global-loader__animation">
                    <img src={imgLoader} alt="" />
                </div>
            )}
        </section>
    );
};

export default RecipeForm;
