const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("./config/db");
const { interviewRouter } = require("./routes/interview.route");
const { questionRouter } = require("./routes/question.route");
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

//home route
app.get("/", (req, res) => {
  res.send("home route");
});

// questions route
app.use("/questions", questionRouter);

//intervew route
app.use("/interview", interviewRouter);

app.listen(PORT, async () => {
  console.log("app is listening at ", PORT);
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
  }
});
