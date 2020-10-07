const Employee = require("../models/employee");

exports.getEmployees = (req, res, next) => {
  Employee.find()
    .then((employees) => {
      return res.json({ employees });
    })
    .catch((err) => {
      const errors = new Error(err);
      errors.statusCode = 500;
      next(errors);
    });
};
