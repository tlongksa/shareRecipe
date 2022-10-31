import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSearchParams } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const RecipeForm = () => {
    const [searchParams] = useSearchParams();
    const step = searchParams.get('step');
    const [recipeFormData, setRecipeFormData] = useState({});
    const [shouldFinish, setShouldFinish] = useState(false);

    useEffect(() => {
        if (shouldFinish) {
            console.log(recipeFormData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldFinish]);

    return (
        <section className="recipe-form__container">
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
