const express = require("express");
const authController = require("../controllers/auth");
const feedbackController = require("../controllers/feedback");
const employeeController = require("../controllers/employee");

const router = express.Router();

// Authentication route
router.post("/login", authController.postLogin);

// Empoloyee route
router.post("/api/admin/employee", employeeController.postEmployee);

router.get("/api/employees", employeeController.getEmployees);

router.delete(
  "/api/admin/employee/:employeeId",
  employeeController.deleteEmployee
);

router.put("/api/admin/employee/:employeeId", employeeController.putEmployee);

// Feedbacks route
router.post("/api/feedback", feedbackController.postFeedback);

router.get("/api/feedbacks", feedbackController.getFeedbacks);

module.exports = router;
