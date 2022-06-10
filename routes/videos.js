const express = require("express");
const router = express.Router();
const { getVideoList, postNewVideo, getSingleVideo, postComment, deleteComment } = require("../controllers/videos")



router.route("/")
    .get(getVideoList)
    .post(postNewVideo);

router.get("/:id", getSingleVideo);

router.post("/:id/comments", postComment);

router.delete("/:id/comments/:commentId", deleteComment)

module.exports = router;