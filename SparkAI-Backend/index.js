const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function chatReply(text) {
  try {
    const chatCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 2000,
    });
    console.log(chatCompletion.data.choices[0].text);
  } catch (error) {
    console.log("error", error);
  }
}

chatReply("what is the currency of india");
