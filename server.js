const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const MONGODB_URI = require("./config/keys").mongoURI;
const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(authRoutes);

app.use(passport.initialize());

require("./config/passport")(passport);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is connected successfully.");
  })
  .catch((err) => console.log(err));

// const server = app.listen(PORT);
// console.log(`App is listening on localhost:${PORT}`);

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
