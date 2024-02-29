const express = require('express');
const router = express.Router();
const { getChat, sendMessage } = require('../../controllers/chat/index')

router.get('/', async(req,res) => {
    res.status(201).json('Auth router connected')
})

router.route("/getChat").get(getChat);
router.route("/sendMessage").post(sendMessage);

module.exports = router;
