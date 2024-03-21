const express = require('express');
const router = express.Router();
const { vote, verificationVote } = require('../../controllers/Community/voting')
const { createPost, allPosts, deletePost } = require('../../controllers/Community/createPost');
const { communityPostsArray, verificationPostsArray } = require('../../controllers/Community/getCommunityArray');
const authenticateToken = require('../../middlewares/authanticate');


router.route("/posts").get(authenticateToken, allPosts);
router.route("/createPost").post(authenticateToken, createPost);
router.route("/vote").post(authenticateToken, vote);
router.route("/verificationVote").post(authenticateToken, verificationVote);
router.route("/communityPostsArray").get(authenticateToken, communityPostsArray);
router.route("/verificationPostsArray").get(authenticateToken, verificationPostsArray);
router.route("/deletePost").post(authenticateToken, deletePost);





module.exports = router;
