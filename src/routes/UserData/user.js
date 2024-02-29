const express = require('express');
const router = express.Router();
const { editUserField } = require('../../controllers/user/editUser')
const { getUserProfile } = require('../../controllers/user/getUserProfile')
const { addFriend,acceptFriendRequest } = require('../../controllers/user/addFriend')
const  {blockProfile, unblockProfile } = require("../../controllers/user/block")
const { deleteProfile } = require("../../controllers/user/deleteProfile") 
const { onboardUser } = require("../../controllers/user/onboard")
const { getChatList } = require("../../controllers/user/getChatList") 
const { getFriendsList } = require("../../controllers/user/getFriendsList")


router.route("/editUser").put(editUserField);
router.route("/getUser").get(getUserProfile);
router.route("/addFriend").post(addFriend);
router.route("/acceptFriendRequest").post(acceptFriendRequest);
router.route("/blockProfile").post(blockProfile);
router.route("/unblockProfile").post(unblockProfile);
router.route("/deleteProfile").post(deleteProfile);
router.route("/onboardUser").post(onboardUser);
router.route("/getChatList").get(getChatList);
router.route("/getFriendsList").get(getFriendsList);







module.exports = router;
