const express = require("express");
const questiontRouter = express.Router();

const { questionModel } = require("../models/questions.model");

questionRouter.post("/add", async (req, res) => {
  console.log(req.body);
  const { title, body, device, no_of_comments, userId } = req.body;
  try {
    const newquestion = new questionModel(req.body);
    await newquestion.save();
    res.status(200).send({ msg: "question is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

questionRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.body, id);
  try {
    await questionModel.findByIdAndUpdate(id, req.body);

    res.status(200).send({ msg: "question is update" });
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
