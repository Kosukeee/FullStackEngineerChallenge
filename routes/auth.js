const express = require("express");
const authController = require("../controllers/auth");
const feedbackController = require("../controllers/feedback");

const router = express.Router();

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

// add, remove, update, get Empoloyee
router.post("/api/admin/employee", authController.postEmployee);

router.get("/api/employees", authController.getEmployees);

router.delete("/api/admin/employee/:employeeId", authController.deleteEmployee);

router.put("/api/admin/employee/:employeeId", authController.putEmployee);

// add feedbacks
router.post("/api/feedback", feedbackController.postFeedback);

router.get("/api/feedbacks", feedbackController.getFeedbacks);

module.exports = router;
