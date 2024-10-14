# auth-service
This is authentication service. You can use this for your login or signup system.

## features
1. Signup
2. Login with two factor authentication (Send OTP to email)

---
## Usage procedure:
### 1. Clone the repo
git clone https://github.com/WEBX2024/auth-service

### 2. Install dependencies

npm install

### 3. Create .env file and add the environment variables

PORT=
MONGODB_URL=
EMAIL_USER=
EMAIL_PASS=
OTP_EXPIRY=

### 4. To start the service
npm start

---
## npm packages used in this project

### bcryptjs
To hash password

---
### cors
For cross origin request. Currently it accepts all origins.

---
### dotenv
To read environment variables

---
### express
To create endpoints

---
### jsonwebtoken
To generate authorization token

---
### mongoose
For mongo db connection

---
### morgan
Logging the request

---
### nodemailer
To send mail of OTP

---
### otp-generator
To generate OTP

---
## Status:
Till now you can sign-up,login, otp verification by this projectYet it's not fully completed few developments are ongoing e.g. Data fetch in profile page and forgot password is not in working condition but after completing this project, can be a well mannered and scalable authenticator system.