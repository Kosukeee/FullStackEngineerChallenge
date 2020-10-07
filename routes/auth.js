const express = require("express");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

const router = express.Router();

// router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/add-employee", authController.postAddEmployee);

router.get("/get-employees", homeController.getEmployees);

module.exports = router;
