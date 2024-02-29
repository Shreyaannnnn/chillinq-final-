const express = require('express');
const router = express.Router();
const { vote, verificationVote } = require('../../controllers/Community/voting')
const { createPost, allPosts, deletePost } = require('../../controllers/Community/createPost');
const { communityPostsArray, verificationPostsArray } = require('../../controllers/Community/getCommunityArray');


router.route("/posts").get(allPosts);
router.route("/createPost").post(createPost);
router.route("/vote").post(vote);
router.route("/verificationVote").post(verificationVote);
router.route("/communityPostsArray").get(communityPostsArray);
router.route("/verificationPostsArray").get(verificationPostsArray);
router.route("/deletePost").post(deletePost);





module.exports = router;
