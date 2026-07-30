const userSchema = require("../models/userSchema");
const { sendEmail } = require("../services/emailServices");
const { emailVerification } = require("../services/emailTemp");
const { generateOtp } = require("../services/helpers");

const signUp = async (req, res) => {
  try {
    const { name, password, email, phone } = req.body;
    if (!name) return res.status(400).send({ message: "name is required" });
    if (!email) return res.status(400).send({ message: "email is required" });
    if (!password)
      return res.status(400).send({ message: "password is required" });
    if (!phone)
      return res.status(400).send({ message: "phone number is required" });

    const existUser = await userSchema.findOne({ email });
    if (existUser)
      return res
        .status(400)
        .send({ message: "user with this email is already registered" });
    const OTP = generateOtp();
    const user = new userSchema({
      name,
      email,
      password,
      phone,
      otp: OTP,
      otpExpires: Date.now() + 2 * 60 * 1000,
    });
    await user.save();
    sendEmail({
      email,
      subject: "Email verification",
      otp: OTP,
      template: emailVerification,
    });
    return res
      .status(200)
      .send({ message: "registration successfull. please verify your email" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp) return res.status(400).send({ message: "otp is required" });
    if (!email) return res.status(400).send({ message: "email is required" });

    const user = await userSchema.findOne({
      email,
      otp: Number(otp),
      otpExpires: { $gt: new Date() },
      isVerified: false,
    });
    if (!user)
      return res.status(400).send({ message: "invalid or expired otp" });
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).send({ message: "verification successfull" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "internal server error" });
  }
};
module.exports = { signUp, verifyOtp };
