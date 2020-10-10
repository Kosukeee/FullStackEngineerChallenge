const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  targetEmployeeId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdEmployeeId: {
    type: String,
    required: true,
  },
  createdEmployeeName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
