import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const GPT_API_KEY = process.env.GPT_API_KEY13 || '1313';

const openai = new OpenAI({apiKey : GPT_API_KEY, dangerouslyAllowBrowser: true});

type Props = {
    inputBar: HTMLInputElement
};

const FetchIngredients = async ({
    inputBar
}:Props) => {
    let recipeResult = '';

    let submitButton = document.getElementById('submitButton') as HTMLInputElement;
    submitButton.setAttribute(
        'style',
        'background-color: darkgrey; color: grey;',
    );
    submitButton.disabled = true;

    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k-0613",
        messages: [{
            role: "user",
            content: ("If all of following items : [" + (inputBar.value) + "], are food items, ingredient items, or a sentence telling you the type of food they want \
            randomly choose a recipe that can be made with them and \
            describe how to make this meal. If a single item is not edible or food simple respond \"Sorry, I can't help you with that.\"")

            /*
            content: ("If all of following items : [" + (inputBar.value) + "], are food items, ingredient items, or EDIBLE give a \
            concise non wordy recipe for a meal that could be made. otherwise simply return \"Sorry, I can't help you with that.\"")
            */
        }],
        stream: true,
    });
    //alert (inputBar.value);
    for await (const chunk of stream) {
        if (chunk.choices[0].delta.content) recipeResult += (chunk.choices[0].delta.content);
        //process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
    submitButton.setAttribute(
        'style',
        'background-color: black; color: white;'
    );
    submitButton.disabled = false;
    return recipeResult;
};

FetchIngredients.defaultProps = {

};

export default FetchIngredients;
/*
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
     "model": "gpt-3.5-turbo-16k-0613",
     "messages": [{"role": "user", "content": "3+3"}],
     "temperature": 0.7
   }'

*/