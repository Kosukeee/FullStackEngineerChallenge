const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSignupInput(data) {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confirmPw = isEmpty(data.confirmPw) ? "" : data.confirmPw;

  // Empty fields check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.confirmPw)) {
    errors.confirmPw = "Confirm password field is required";
  }

  // Password must be at least 4 characters
  if (!Validator.isLength(data.password, { min: 4 })) {
    errors.password = "Password must be at least 4 characters";
  }

  // Password and Confirm passeord check
  if (!Validator.equals(data.password, data.confirmPw)) {
    errors.confirmPw = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
