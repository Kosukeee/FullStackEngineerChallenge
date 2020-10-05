const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const MONGODB_URI =
  "mongodb+srv://KosukeMuramatsu:AlexMcq5249@cluster0.6nofq.mongodb.net/employees";
const PORT = 8080;

app.use(bodyParser.json());
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = app.listen(PORT);
    console.log(`App is listening on localhost:${PORT}`);
  })
  .catch((err) => console.log(err));
