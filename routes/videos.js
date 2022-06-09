const fs = require("fs");
const express = require("express");
const router = express.Router();
const VIDEO_PATH = "./data/videos.json";
const uniqid = require("uniqid");
const { json } = require("express/lib/response");


function readFile(file, callback) {
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("data read");
        }
        callback(data);
    })
}

function writeFile(file, newData) {
    readFile(file, (data) => {
        const videoDetails = JSON.parse(data);
        videoDetails.push(newData);

        fs.writeFile(file, JSON.stringify(videoDetails), (err) => { err ? console.log(err) : console.log("file written") })
    })
}


router.route("/")
    .get((req, res) => {
        readFile(VIDEO_PATH, (data) => {
            const vidList = JSON.parse(data).map((video) => {
                return {
                    id: video.id,
                    title: video.title,
                    channel: video.channel,
                    image: video.image
                };
            })
            res.json(vidList);
        })
    })
    .post((req, res) => {
        const { title, description } = req.body;
        writeFile(VIDEO_PATH, {
            id: uniqid(),
            title, description,
            channel: "default channel",
            image: "./public/images/upload-video-preview.jpg",
            views: 0, //(optional)views+1 every time goes to the video url
            likes: 0,
            duration: "4:01",
            video: "https://project-2-api.herokuapp.com/stream",
            timestamp: Date.now(),
            comments: []
        })
        res.json(req.body)
    })

//find single video
router.get("/:id", (req, res) => {
    readFile(VIDEO_PATH, (data) => {
        const videoDetails = JSON.parse(data);
        const vidFound = videoDetails.find((video) => video.id == req.params.id);
        if (vidFound) {
            res.json(vidFound);
        } else {
            res.status(404).send("video not found");
        }
    })
})
//post comment to that video id - wip, need to post single comment instead of everything
router.post("/:id/comments", (req, res) => {
    const { comment } = req.body;
    readFile(VIDEO_PATH, (data) => {
        const videoDetails = JSON.parse(data);
        const vidFound = videoDetails.find((video) => video.id == req.params.id);
        const newComment = {
            id: uniqid(),
            name: "anonymous",
            comment,
            likes: 0,
            timestamp: Date.now()
        };
        if (vidFound) {
            vidFound.comments.push(newComment);
            fs.writeFile(VIDEO_PATH, JSON.stringify(videoDetails), (err) => { err ? console.log(err) : console.log("file written") });
            res.json(newComment);
        } else {
            res.status(404).send("video not found");
        }
    })
})
//delete comment by comment id
router.delete("/:id/comments/:commentId", (req, res) => {
    readFile(VIDEO_PATH, (data) => {
        const videos = JSON.parse(data);
        const vidFound = videos.find((video) => video.id == req.params.id);
        const comments = vidFound.comments;
        if (vidFound) {
            const commentFound = comments.find((comment) => comment.id == req.params.commentId);
            if (commentFound) {
                const commentIndex = comments.indexOf(commentFound);
                comments.splice(commentIndex, 1);
                fs.writeFile(VIDEO_PATH, JSON.stringify(videos), (err) => { err ? console.log(err) : console.log("file written") });
                res.json(vidFound)
            }
        } else {
            res.status(404).send("video not found");
        }
    })
})

module.exports = router;