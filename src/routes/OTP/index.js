const express = require('express');
const router = express.Router();
const { sendOTP,verifyOTP} = require('../../controllers/otp/index')

router.route("/sendOTP").post(sendOTP);
router.route("/verifyOTP").post(verifyOTP);

module.exports = router;
