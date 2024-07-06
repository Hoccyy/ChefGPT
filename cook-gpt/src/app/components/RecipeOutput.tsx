import React from 'react';
import RecipeOutputStyles from './RecipeOutput.module.css';

type Props = {
    userName?: string
};

var outputPlaceHolder : string = "Your recipes will come here!"

const RecipeOutput = ({
    userName = ''
}:Props) => {
    return (
        <div className={RecipeOutputStyles.OutputBackground}>
            <div id='recipeOutputBG' className={RecipeOutputStyles.OutputMessage}>

                <h1 id='recipeOutput' className={RecipeOutputStyles.Instructions}>
                    {outputPlaceHolder}
                </h1>

            </div>
        </div>
    );
};

export default RecipeOutput;