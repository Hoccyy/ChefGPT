import OpenAI from "openai";
import { FetchAPIKey } from './FetchAPIKey';


const GPT_API_KEY = FetchAPIKey();

const openai = new OpenAI({
    apiKey : GPT_API_KEY,
    dangerouslyAllowBrowser: true
});

type Props = {
    inputBar: HTMLInputElement
};

const FetchIngredients = async ({
    inputBar
}:Props) => {
    let recipeResult = '';

    let submitButton = document.getElementById('submitButton')! as HTMLInputElement;

    if (submitButton == null) {
        return recipeResult;
    }

    let processingMessage = document.getElementById('processingMessage');

    // Visual loading effects to wait on results ~
    submitButton.setAttribute(
        'style',
        'background-color: darkgrey; color: grey;',
    );
    processingMessage!.innerHTML = "Finding recipe...";
    submitButton.disabled = true;

    // Processes the user's request through the OpenAI API with selective prompting
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [{
                role: "user",
                content: ("If all of following items : [" + (inputBar.value) + "], are food items, ingredient items, or a sentence telling you the type of food they want \
                choose a recipe that can be made with them and describe how to make this meal, without apologizing for anything simply describe the recipe and meal.\
                Start with the recipe name at the top by itself before the instructions.\
                The ingredients may be separated by various delimiters such as commas, periods, spaces, or ingredients input without any spacing. try to split them \
                apart. Try to make ANY meal as long as the ingredients are edible. No meal is off limits including pastries and cakes.\
                \
                ONLY If a single item is inedible or food simple respond \"Sorry, I can't help you with that.\" or else you MUST ALWAYS find a recipe if its ALL edible items.\
                Raw food items do not count as inedible since the meal will be cooked.")
            }],
            stream: true,
        });

        for await (const chunk of stream) {
            if (chunk.choices[0].delta.content) recipeResult += (chunk.choices[0].delta.content);
        }
        
    } catch (error: any) {
        console.log("Error Msg: ", error)
        // Visual loading effects to wait on results ~
        submitButton.setAttribute(
            'style',
            'background-color: black; color: white;'
        );
        submitButton!.disabled = false;
        processingMessage!.innerHTML = ". . .";
    }

    // Visual loading effects to wait on results ~
    submitButton.setAttribute(
        'style',
        'background-color: black; color: white;'
    );
    submitButton!.disabled = false;
    processingMessage!.innerHTML = ". . .";
    return recipeResult;
};

export default FetchIngredients;