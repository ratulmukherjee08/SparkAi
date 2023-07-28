const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { connection } = require("./config/db");
const { interviewRouter } = require("./routes/interview.route");
const { questionRouter } = require("./routes/question.route");
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

//Swagger options declaired
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: " SparkAI_Interview API",
      version: "1.0.0",
      description: "API documentation for SparkAI_Interview App",
    },
    servers: [{ url: "http://localhost:4000/" }],
    basePath: "/",
  },
  apis: ["routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//home route
app.get("/", (req, res) => {
  res.send("home route");
});

// questions route
app.use("/questions", questionRouter);

//intervew route
app.use("/interview", interviewRouter);

//app is listening
app.listen(PORT, async () => {
  console.log("app is listening at ", PORT);
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
  }
});
