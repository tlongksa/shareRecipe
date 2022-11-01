import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import AuthContext from '../../../../context/auth-context';
import { fileUploadHandler } from '../../../../hooks/useFileUpload';
import { createRecipeRequest } from '../../../../api/requests';

const RecipeForm = () => {
    const { userInfo } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const step = searchParams.get('step');
    const [recipeFormData, setRecipeFormData] = useState({});
    const [shouldFinish, setShouldFinish] = useState(false);
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [fileError, setFileError] = useState('');
    const [listDishImage, setListDishImage] = useState([]);
    const [video, setVideo] = useState('');

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
        createRecipeRequest({
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
                describe: '',
                summary: '',
                listStep: recipeFormData.listStep,
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
                    extraIngredient: 0,
                    ingredientChangeList: extraIng.ingredientChangeList.map((replaceIng) => ({
                        name: replaceIng.name,
                        quantity: replaceIng.quantity,
                        unit: replaceIng.unit,
                        calo: replaceIng.calo,
                    })),
                })),
            ],
        })
            .then(({ data }) => {
                setIsCreating(false);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                setIsCreating(false);
            });
    }

    return (
        <section className={`recipe-form__container ${isUploading || isCreating ? 'divDisabled' : ''}`}>
            {fileError && <p className="error-message">{fileError}</p>}
            {step === '1' && <Step1 recipeFormData={recipeFormData} setRecipeFormData={setRecipeFormData} />}
            {step === '2' && <Step2 recipeFormData={recipeFormData} setRecipeFormData={setRecipeFormData} />}
            {step === '3' && (
                <Step3
                    recipeFormData={recipeFormData}
                    setRecipeFormData={setRecipeFormData}
                    setShouldFinish={setShouldFinish}
                />
            )}
        </section>
    );
};

export default RecipeForm;
