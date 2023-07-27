const express = require("express");
const interviewRouter = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//post route
interviewRouter.post("/post", async (req, res) => {
  try {
    const text = req.body.text;
    console.log(text);
    const aiCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 2000,
    });
    res.json({ res: aiCompletion.data.choices[0].text });
  } catch (error) {
    console.log("error", error);
  }
});
module.exports = { interviewRouter };
