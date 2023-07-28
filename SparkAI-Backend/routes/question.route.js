const express = require("express");
const questionRouter = express.Router();

const { questionModel } = require("../models/questions.model");

//adding questions - POST route

/**
 * @swagger
 * https://sparai-backend-app.onrender.com/questions/add:
 *   post:
 *     summary: Adding new questions
 *     description: adding new questions to database with perticular topics via POST route
 *     tags:
 *       - questions
 *     parameters:
 *       - in: query
 *         name: questions
 *         description: questions data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             topic:
 *               type: string
 *               description: The topic of question we want to add
 *             question:
 *               type: string
 *               description: The question we want to add.
 *         example:
 *           topic: "NodeJS?"
 *           question: "What is Node.js?"
 *
 *     responses:
 *       200:
 *         description: Question added to DB successfully
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

questionRouter.post("/add", async (req, res) => {
  try {
    const { topic, question } = req.body;
    const newquestion = new questionModel(req.body);
    await newquestion.save();
    res.status(200).send({ msg: "question is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//getting questions - GET route
/**
 * @swagger
 * https://sparai-backend-app.onrender.com/questions/:
 *   get:
 *     summary: Getting questions
 *     description: Getting questions related to a perticular topic from database via GET route
 *     tags:
 *       - questions
 *     parameters:
 *       - in: body
 *         name: questions
 *         description: questions data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             topic:
 *               type: string
 *               description: The topic of question we want to get
 *
 *         example:
 *           topic: "NodeJS?"
 *           question: "What is Node.js?"
 *     responses:
 *       200:
 *         description: Question we got
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

questionRouter.get("/", async (req, res) => {
  try {
    const topic = req.query.topic;
    console.log(topic);
    if (!topic) {
      const getQuestion = await questionModel.find();
      res.status(200).send({ msg: getQuestion });
    } else {
      const getQuestion = await questionModel.find({ topic: topic });
      res.status(200).send({ msg: getQuestion });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//updating a question - PATCH route

/**
 * @swagger
 * https://sparai-backend-app.onrender.com/questions/update/:id:
 *   patch:
 *     summary: Updateing a question
 *     description: Updating a question with it's id from database via PATCH route
 *     tags:
 *       - questions
 *     parameters:
 *       - in: params
 *         name: questions
 *         description: question's id
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The id of question we want to update
 *
 *
 *     responses:
 *       200:
 *         description: Question is updated
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
questionRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await questionModel.findByIdAndUpdate(id, req.body);

    res.status(200).send({ msg: "question is updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//deleting a question - DELETE route
/**
 * @swagger
 * https://sparai-backend-app.onrender.com/questions/delete/:id:
 *   delete:
 *     summary: deleteing a question
 *     description: Updating a question with it's id from database via PATCH route
 *     tags:
 *       - questions
 *     parameters:
 *       - in: params
 *         name: questions
 *         description: question's id
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The id of question we want to delete
 *
 *
 *     responses:
 *       200:
 *         description: Question is deleted
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
questionRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await questionModel.findByIdAndDelete({ _id: id });

    res.status(200).send({ msg: "question is deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { questionRouter };
