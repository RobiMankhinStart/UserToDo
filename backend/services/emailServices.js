const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER || "robileo47@gmail.com",
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ email, subject, otp, template }) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.APP_NAME || "retakeExam"}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: template({ otp }),
    });
  } catch (error) {
    console.log("email-sending-error :", error.message);
    throw error;
  }
};

module.exports = { sendEmail };
