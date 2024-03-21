const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authanticate');
const { editUserField } = require('../../controllers/user/editUser')
const { getUserProfile } = require('../../controllers/user/getUserProfile')
const { addFriend,acceptFriendRequest } = require('../../controllers/user/addFriend')
const  {blockProfile, unblockProfile } = require("../../controllers/user/block")
const { deleteProfile } = require("../../controllers/user/deleteProfile") 
const { onboardUser } = require("../../controllers/user/onboard")
const { getChatList } = require("../../controllers/user/getChatList") 
const { getFriendsList } = require("../../controllers/user/getFriendsList")
const authenticateToken = require('../../middlewares/authanticate');


router.route("/editUser").put(authenticateToken, editUserField);
// router.route("/getUser").get( getUserProfile);
router.route("/getUser").get(authenticateToken, getUserProfile);
router.route("/addFriend").post(authenticateToken, addFriend);
router.route("/acceptFriendRequest").post(authenticateToken, acceptFriendRequest);
router.route("/blockProfile").post(authenticateToken, blockProfile);
router.route("/unblockProfile").post(authenticateToken, unblockProfile);
router.route("/deleteProfile").post(authenticateToken, deleteProfile);
router.route("/onboardUser").post(authenticateToken, onboardUser);
router.route("/getChatList").get(authenticateToken, getChatList);
router.route("/getFriendsList").get(authenticateToken, getFriendsList);




module.exports = router;
