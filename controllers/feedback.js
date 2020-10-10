const Feedback = require("../models/feedback");

exports.postFeedback = (req, res, next) => {
  const {
    targetEmployeeId,
    comment,
    createdEmployeeId,
    createdEmployeeName,
  } = req.body;

  const feedback = new Feedback({
    targetEmployeeId,
    comment,
    createdEmployeeId,
    createdEmployeeName,
  });

  feedback
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      const error = createaError(err);
      return next(error);
    });
};

exports.getFeedbacks = (req, res, next) => {
  Feedback.find()
    .then((feedbacks) => {
      res.status(200).send(feedbacks);
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 500;
      next(error);
    });
};
