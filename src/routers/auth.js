const express = require("express");
const User = require("../modles/User");
const jwt = require("jsonwebtoken");
const handlers = require("../handlers/auth-handlers");

const router = express.Router();

router.post("/signup", handlers.handleSignup);

router.post("/login", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });  

  if(otp !== user.otp)
    return res.status(401).json({message: 'OTP mismatch'});

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({message: 'Login successfull', token});
});

router.post("/validate-otp", handlers.validateOtp);
router.post("/send-otp", handlers.sendOtp);

module.exports = router;