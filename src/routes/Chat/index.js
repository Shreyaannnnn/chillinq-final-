const express = require('express');
const router = express.Router();
const { getChat, sendMessage } = require('../../controllers/chat/index')
const authenticateToken = require('../../middlewares/authanticate');

router.get('/', async(req,res) => {
    res.status(201).json('Auth router connected')
})

router.route("/getChat").get(authenticateToken, getChat);
router.route("/sendMessage").post(authenticateToken ,sendMessage);

module.exports = router;
