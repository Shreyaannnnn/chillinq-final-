const express = require('express');
const router = express.Router();
const { authanticateUser, loginUser, refreshToken} = require('../../controllers/auth/index');
const { verifyUser } = require('../../controllers/auth/verifyUser');

router.get('/', async(req,res) => {
    res.status(201).json('Auth router connected')
})

router.route("/authanticate").post(authanticateUser);
router.route("/login").post(loginUser);
router.route("/refreshToken").post(refreshToken);
router.route("/verifyUser").post(verifyUser);


module.exports = router;
