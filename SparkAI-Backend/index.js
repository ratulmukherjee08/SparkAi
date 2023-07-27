const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { interviewRouter } = require("./routes/interview.route");
const { questionRouter } = require("./routes/question.route");
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home route");
});
app.use("/questions", questionRouter);
app.use("/interview", interviewRouter);
// async function chatReply(text) {}

// chatReply("what is the currency of india");

app.listen(PORT, () => {
  console.log("app is listening at ", PORT);
});
