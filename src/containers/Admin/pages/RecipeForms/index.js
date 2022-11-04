import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import AuthContext from '../../../../context/auth-context';
import { fileUploadHandler } from '../../../../hooks/useFileUpload';
import { createRecipeRequest } from '../../../../api/requests';
// import { RECIPE_FORM_DATA } from '../../../../constants';
import RecipeContext from '../../../../context/recipe-context';
import { LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';

// const initialRecipeFormData = localStorage.getItem(RECIPE_FORM_DATA)
//     ? JSON.parse(localStorage.getItem(RECIPE_FORM_DATA))
//     : null;

const RecipeForm = () => {
    const { userInfo } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const step = searchParams.get('step');
    const id = searchParams.get('id');
    const [recipeFormData, setRecipeFormData] = useState({});
    const [shouldFinish, setShouldFinish] = useState(false);
    const navigate = useNavigate();
    const [_, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [fileError, setFileError] = useState('');
    const [listDishImage, setListDishImage] = useState([]);
    const [video, setVideo] = useState('');
    const {
        recipeDetail: { dataResponse, isLoading, error },
        onFetchDetail,
        onClearDetail,
    } = useContext(RecipeContext);

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
        if (!isLoading && dataResponse?.dishID) {
            setRecipeFormData({
                name: dataResponse?.dishName,
                description: dataResponse?.formulaDescribe,
                numberPeopleForDish: dataResponse?.numberPeopleForDish,
                Level: dataResponse?.level,
                time: dataResponse?.time,
                idDishCategory: dataResponse?.idDishCategory,
                mainIngredients: dataResponse?.ingredientDetailList
                    ?.filter((it) => it.mainIngredient === 1)
                    .map((mappedItem) => ({
                        calo: mappedItem.calo,
                        mainIngredient: 1,
                        name: mappedItem.name,
                        quantity: mappedItem.quantity,
                        unit: mappedItem.unit,
                        id: mappedItem.ingredientDetailId,
                    })),
                extraIngredients: dataResponse?.ingredientDetailList
                    ?.filter((it) => it.mainIngredient === 0)
                    .map((mappedItem) => ({
                        calo: mappedItem.calo,
                        mainIngredient: 0,
                        name: mappedItem.name,
                        quantity: mappedItem.quantity,
                        unit: mappedItem.unit,
                        id: mappedItem.ingredientDetailId,
                        ingredientChangeList:
                            mappedItem?.ingredientChangeVoList?.map((nestedItem) => ({
                                name: nestedItem.name,
                                quantity: nestedItem.quantity,
                                unit: nestedItem.unit,
                                calo: nestedItem.calo,
                                id: nestedItem.ingredientChangeId,
                            })) || [],
                    })),
                video: dataResponse?.video,
                listDishImage: dataResponse?.dishImageList,
                listStep: dataResponse?.stepList,
            });
        }
    }, [dataResponse, isLoading]);

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
        if (!fileError && video && listDishImage.length > 0 && listDishImage.length === recipeFormData?.files?.length) {
            createRecipeHandler();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeFormData?.files, fileError, video, listDishImage.length]);

    function uploadRecipeAssetsHandler() {
        fileUploadHandler(
            recipeFormData.videoFile,
            setIsUploading,
            setProgress,
            setFileError,
            (videoUrl) => {
                setVideo(videoUrl);
                [...recipeFormData.files].forEach((file) => {
                    fileUploadHandler(file, setIsUploading, setProgress, setFileError, (url) => {
                        setListDishImage((prevState) => [...prevState, { url, note: '' }]);
                    });
                });
            },
            'videos/',
        );
    }

    function createRecipeHandler() {
        setIsCreating(true);
        const payloadToSubmit = {
            video,
            listDishImage,
            name: recipeFormData.name,
            origin: 'vn',
            Level: recipeFormData.Level,
            calo: recipeFormData.calo,
            numberPeopleForDish: recipeFormData.numberPeopleForDish,
            time: recipeFormData.time,
            idDishCategory: recipeFormData.idDishCategory,
            formulaId: {
                describe: recipeFormData.description,
                summary: '',
                listStep: recipeFormData.listStep.map((step, index) => ({
                    describe: step.describe,
                    title: index + 1,
                })),
                account: {
                    userName: userInfo?.username,
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
        // localStorage.setItem(RECIPE_FORM_DATA, JSON.stringify(payloadToSubmit));
        createRecipeRequest(payloadToSubmit)
            .then(({ data }) => {
                setIsCreating(false);
                notification.open({
                    message: data,
                });
                navigate('/admin/recipes');
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
                <p className="error-message">{error || 'Something when wrong!'}</p>
            </div>
        );
    }

    return (
        <section className={`recipe-form__container pb-4 ${isUploading || isCreating ? 'divDisabled' : ''}`}>
            {fileError && <p className="error-message">{fileError}</p>}
            {step === '1' && <Step1 recipeFormData={recipeFormData} setRecipeFormData={setRecipeFormData} id={id} />}
            {step === '2' && (
                <Step2
                    recipeFormData={recipeFormData}
                    setRecipeFormData={setRecipeFormData}
                    initialData={dataResponse}
                    id={id}
                />
            )}
            {step === '3' && (
                <Step3
                    recipeFormData={recipeFormData}
                    setRecipeFormData={setRecipeFormData}
                    setShouldFinish={setShouldFinish}
                    id={id}
                />
            )}
        </section>
    );
};

export default RecipeForm;
