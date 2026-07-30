const express = require("express");
const { signUp, verifyOtp } = require("../controllers/auth.controller");
const route = express.Router();
route.get("/signUp", signUp);
route.get("/verifyotp", verifyOtp);

module.exports = route;
