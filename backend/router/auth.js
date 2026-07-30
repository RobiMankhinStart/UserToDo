const express = require("express");
const { signUp, verifyOtp } = require("../controllers/auth.controller");
const route = express.Router();

route.post("/signUp", signUp);
route.post("/verifyotp", verifyOtp);

module.exports = route;
