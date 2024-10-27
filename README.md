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

## Run jaeger
```
docker run --rm --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.62.0
```
### Jaeger-ui
http://localhost:16686

### Setup prometheus
In `prometheus.yml` Update the target IP with your private IP

### Start the containers
```
docker-compose up -d
```