const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const validateLoginInput = require("../validation/login");
const User = require("../models/user");
const Employee = require("../models/employee");

exports.postLogin = async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = email === "admin@test.com";
  const Model = isAdmin ? User : Employee;

  Model.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          isReviewer: user.isReviewer,
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
