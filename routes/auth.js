const express = require("express");
const cors = require("cors");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

const router = express.Router();

// router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/employee", authController.postAddEmployee);

router.get("/employees", homeController.getEmployees);

router.delete("/employee/:employeeId", authController.deleteEmployee);

router.put("/employee/:employeeId", authController.putUpdateEmployee);

module.exports = router;
