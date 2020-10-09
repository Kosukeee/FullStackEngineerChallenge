const Employee = require("../models/employee");

exports.getEmployees = (req, res, next) => {
  Employee.find()
    .then((employees) => {
      return res.json({ employees });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      next(error);
    });
};
