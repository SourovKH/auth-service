const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../modles/User");
const { validateOTP, sendOTP } = require("../utils/otp");
const AdminUsers = require("../modles/Admin-users");

const handleSignup = async (req, res) => {
  const { email, password, phone, name, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, name, phone });

  try {
    if(userType.toUpperCase() === 'ADMIN') {
        const adminId = parseInt(req.body.adminId);
        
        const adminUser = await AdminUsers.findOne({email});
        if(!adminUser || adminUser.adminId !== adminId)
            return res.status(401).json({message: 'Invalid Credentials'});
            user.adminId = adminId;
    }

    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const validateOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || !validateOTP(otp, user.otp, user.otpExpiry)) {
    return res.status(401).json({ message: "Invalid or expired OTP" });
  }

  res.json({ message: "OTP validated successfully" });
};

const validateUser = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return false;
  }

  if (user.isAdmin) {
    return userData.adminId && parseInt(userData.adminId) === user.adminId;
  }

  return true;
};

const sendOtp = async (req, res) => {
  const userData = req.body;
  const isValidUser = await validateUser(userData);
  if (!isValidUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    await sendOTP(userData.email);
    res.json({message: "OTP sent succeccfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
};

module.exports = { handleSignup, validateOtp, sendOtp };