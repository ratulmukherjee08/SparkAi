const express = require("express");
const questionRouter = express.Router();

const { questionModel } = require("../models/questions.model");

//adding questions - POST route
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
questionRouter.get("/", async (req, res) => {
  try {
    const { topic } = req.body;
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
questionRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.body, id);
  try {
    await questionModel.findByIdAndUpdate(id, req.body);

    res.status(200).send({ msg: "question is updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
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
