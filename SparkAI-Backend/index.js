const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { interviewRoute } = require("./routes/interview.route");
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home route");
});

app.use("/interview", interviewRoute);
// async function chatReply(text) {}

// chatReply("what is the currency of india");

app.listen(PORT, () => {
  console.log("app is listening at ", PORT);
});
