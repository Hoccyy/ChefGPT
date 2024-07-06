"use client";
import React from 'react';
import inputStyles from './InputTextArea.module.css';
import FetchIngredients from './FetchIngredients';

type Props = {
    placeHolder?: string
};

const buttonContent = 'Explore';
var typewriterSpeed = 13;

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
                                let submitButton = document.getElementById('submitButton')! as HTMLInputElement;
                                // Visual loading effects to wait on results ~
                                submitButton.setAttribute(
                                    'style',
                                    'background-color: black; color: white;'
                                );
                                submitButton!.disabled = false;
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
                /* eslint-disable strict */
                FetchIngredients({ inputBar: input })
                .then(result => {
                    let recipeOutput = document.getElementById('recipeOutput') as HTMLElement;
                    let recipeOutputDiv = document.getElementById('recipeOutputBG') as HTMLElement;
                    let submitButton = document.getElementById('submitButton') as HTMLElement;


                    if (recipeOutput) {
                        let index = 0;
                        recipeOutput.innerHTML = '';
                        
                        function typeWriter() {
                            if (index < result.length) {
                                recipeOutput.innerHTML += result.charAt(index);
                                recipeOutputDiv.scrollTop = recipeOutputDiv.scrollHeight;
                                index++;
                                setTimeout(typeWriter, typewriterSpeed);
                                let processingMessage = document.getElementById('processingMessage');

                                // Visual loading effects to wait on results ~
                                submitButton.setAttribute(
                                    'style',
                                    'background-color: darkgrey; color: grey;',
                                );
                                processingMessage!.innerHTML = "Finding recipe...";
                            }
                        }
                        
                    }
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