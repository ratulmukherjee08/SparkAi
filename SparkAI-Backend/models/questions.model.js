const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    topic: { type: String, required: true },
    question: { type: String, required: true },
  },
  {
    versionkey: false,
  }
);

const questionModel = mongoose.model("question", questionSchema);
module.exports = { questionModel };

// {
//   "topic": "React",
//   "question: "Explain react in your language"
// }
