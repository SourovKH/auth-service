const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const User = require("../modles/User");

const generateOTP = () => {
  return otpGenerator.generate(6);
};

const validateOTP = (inputOTP, storedOTP, expriry) => {
  return inputOTP === storedOTP && Date.now() < expriry;
};

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendOTP = async (to) => {
  const user = await User.findOne({ email: to });
  const otp = generateOTP();
  const otpExpiry = Date.now() + process.env.OTP_EXPIRY * 1000;

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Sent OTP for authentication",
      text: `Your OTP is ${otp}`,
    });

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
  } catch (err) {
    console.log("error", err);
    throw new Error("Unable to send OTP");
  }
};

module.exports = { generateOTP, validateOTP, sendOTP };