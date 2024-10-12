const otpGenerator = require('otp-generator');

const generateOTP = () => {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};

const validateOTP = (inputOTP, storedOTP) => {
    return inputOTP === storedOTP;
};

module.exports = { generateOTP, validateOTP };