import React from 'react'
import RecipeOutputStyles from './RecipeOutput.module.css'

type Props = {
    userName?: string
};

const RecipeOutput = ({
    userName = ''
}:Props) => {
    return (
        <div className={RecipeOutputStyles.OutputBackground}>
            <div id='recipeOutputBG' className={RecipeOutputStyles.OutputMessage}>

                <h1 id='recipeOutput' className={RecipeOutputStyles.Instructions}>
                    Your recipes will come here!
                </h1>

            </div>
        </div>
    );
};

RecipeOutput.defaultProps = {
    userName : '',
};

export default RecipeOutput;