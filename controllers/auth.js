const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateSignupInput = require("../validation/signup");
const validateLoginInput = require("../validation/login");

const User = require("../models/user");
const Employee = require("../models/employee");

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");

  res.render("/");
};

exports.postSignup = async (req, res, next) => {
  console.log("signing up");
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  const { errors, isValid } = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hashedPw) => {
        if (err) throw err;
        newUser.password = hashedPw;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
};

exports.postLogin = async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 60 * 60 * 24 * 365, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

exports.postAddEmployee = (req, res, next) => {
  const { name } = req.body;
  const { evaluation } = req.body;

  const employee = new Employee({
    name,
    evaluation,
  });

  employee
    .save()
    .then((result) => {
      console.log("Employee added");
      // res.redirect("http://localhost:3001");
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};

exports.deleteEmployee = (req, res, next) => {
  const employeeId = req.params.employee;
  Employee.findByIdAndDelete(employeeId)
    .then((result) => console.log(result))
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      return next(error);
    });
};
