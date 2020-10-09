const express = require("express");
const cors = require("cors");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

const router = express.Router();

// router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/api/admin/employee", authController.postAddEmployee);

router.get("/api/employees", homeController.getEmployees);

router.delete("/api/admin/employee/:employeeId", authController.deleteEmployee);

router.put("/api/admin/employee/:employeeId", authController.putUpdateEmployee);

module.exports = router;
