import React, { useState } from 'react';
import './index.scss';
import { useSearchParams } from 'react-router-dom';
import Step1 from './Step1';

const RecipeForm = () => {
    const [searchParams] = useSearchParams();
    const step = searchParams.get('step');
    const [recipeFormData, setRecipeFormData] = useState({});

    return (
        <section className="recipe-form__container">
            {step === '1' && <Step1 recipeFormData={recipeFormData} setRecipeFormData={setRecipeFormData} />}
        </section>
    );
};

export default RecipeForm;
