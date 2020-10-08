const express = require("express");
const cors = require("cors");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

const router = express.Router();

// router.get("/signup", authController.getSignup);

router.post("/signup", authController.postSignup);

router.post("/login", authController.postLogin);

router.post("/employee", cors(), authController.postAddEmployee);

router.get("/employees", homeController.getEmployees);

router.delete("/employee/:employee", authController.deleteEmployee);

module.exports = router;
