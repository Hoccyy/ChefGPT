"use client"
import React from 'react';
import inputStyles from './InputTextArea.module.css'
import FetchIngredients from './FetchIngredients'

type Props = {
    placeHolder?: string
};

const buttonContent = '⬆';

const InputTextArea = ({
    placeHolder = ''
}:Props) => {
    return (
        <div className={inputStyles.inputBoxCenter}>
            <input id='userInputArea' className={inputStyles.inputBox} placeholder={placeHolder} shadow-none="true" onKeyDown={()=> {
                let input = document.getElementById('userInputArea') as HTMLInputElement;
                input.addEventListener(
                    "keyup",
                    (event) => {
                      if (event.key == "Enter" || event.code == "Enter") {
                        input.innerHTML = input.innerHTML.trimEnd().replace(/\r?\n/g, '');
                        event.preventDefault;
                        FetchIngredients({ inputBar: input })
                            .then(result => {
                                let recipeOutput = document.getElementById('recipeOutput');
                                if (recipeOutput) recipeOutput.innerHTML = result;
                            })
                            .catch(error => {
                                console.log(error);
                            });
                      }
                    },
                    {once : true}
                  );
            }}>
            </input>
            <button id='submitButton' className={inputStyles.inputButton} onClick={()=> {
                let input = document.getElementById('userInputArea') as HTMLInputElement;

                FetchIngredients({ inputBar: input })
                .then(result => {
                    let recipeOutput = document.getElementById('recipeOutput');
                        if (recipeOutput) recipeOutput.innerHTML = result;
                    })
                    .catch(error => {
                        alert(error);
                    });
            }}>
                {buttonContent}
            </button>
        </div>
    );
};

export default InputTextArea;