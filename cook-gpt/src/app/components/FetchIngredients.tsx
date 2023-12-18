import OpenAI from "openai";

const GPT_API_KEY = process.env.NEXT_PUBLIC_GPT_API_KEY13;

const openai = new OpenAI({apiKey : "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", dangerouslyAllowBrowser: true});

type Props = {
    inputBar: HTMLInputElement
};

const FetchIngredients = async ({
    inputBar
}:Props) => {
    let recipeResult = '';

    let submitButton = document.getElementById('submitButton') as HTMLInputElement;
    let processingMessage = document.getElementById('processingMessage');

    submitButton.setAttribute(
        'style',
        'background-color: darkgrey; color: grey;',
    );
    
    processingMessage!.innerHTML = "Finding recipe...";
    submitButton.disabled = true;

    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k-0613",
        messages: [{
            role: "user",
            content: ("If all of following items : [" + (inputBar.value) + "], are food items, ingredient items, or a sentence telling you the type of food they want \
            choose a recipe that can be made with them and describe how to make this meal, without apologizing for anything simply describe the recipe and meal.\
            The ingredients may be separated by various delimiters such as commas, periods, spaces, or ingredients input without any spacing. try your best to split them \
            apart. Also please Try to make ANY meal as long as the ingredients are edible try your best. No meal is off limits including pastries and cakes.\
            \
            \
            ONLY If a single item is not edible or food simple respond \"Sorry, I can't help you with that.\" or else you MUST ALWAYS find a recipe if its ALL edible items.")
        }],
        stream: true,
    });
    for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) recipeResult += (chunk.choices[0].delta.content);
    }
    submitButton.setAttribute(
        'style',
        'background-color: black; color: white;'
    );
    submitButton.disabled = false;
    processingMessage!.innerHTML = ". . .";
    return recipeResult;
};

FetchIngredients.defaultProps = {

};

export default FetchIngredients;