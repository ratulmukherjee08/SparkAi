const express = require("express");
const interviewRouter = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//post route

/**
 * @swagger
 * http://localhost:4000/interview/post:
 *   post:
 *     summary: sending request to OpenAI getting feedback
 *     description: Get feedback for a question and it's answer
 *     tags:
 *       - Feedback
 *     parameters:
 *       - in: body
 *         name: feedback
 *         description: Feedback data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             question:
 *               type: string
 *               description: The question.
 *             answer:
 *               type: string
 *               description: The answer.
 *         example:
 *           question: "what is node js?"
 *           answer: "Node.js is an open-source, cross-platform JavaScript runtime environment..."
 *
 *     responses:
 *       200:
 *         description: Feedback sent successfully
 *         schema:
 *           type: object
 *           properties:
 *             bot:
 *               type: string
 *               description: The response from the bot.
 *           example:
 *             bot: "The bot's response"
 *       400:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: The error message.
 *           example:
 *             error: "Something went wrong"
 */
interviewRouter.post("/post", async (req, res) => {
  try {
    const { question, answer } = req.body;
    console.log({ question, answer });
    const aiCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `the question is-${question} and answer is-${answer}
      provide me the feedback on scale of 10 on basis of answer,and if answer is null or empty string it means you have to give 0 marks for that particular question only. In next line give the detailed feedback and suggestions about the answer with the improvement needed.
      `,
      max_tokens: 2000,
    });
    res.json({ res: aiCompletion.data.choices[0].text });
  } catch (error) {
    console.log("error", error);
  }
});
module.exports = { interviewRouter };
