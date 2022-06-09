const fs = require("fs");
const express = require("express");
const router = express.Router();
const VIDEO_PATH = "./data/videos.json";
const uniqid = require("uniqid");


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
router.route("/:id")
    .get((req, res) => {
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
    //post comment to that video id
    .post((req, res) => {
        const { comment } = req.body;
        readFile(VIDEO_PATH, (data) => {
            const videoDetails = JSON.parse(data);
            const vidFound = videoDetails.find((video) => video.id == req.params.id);
            if (vidFound) {
                vidFound.comments.push({
                    id: uniqid(),
                    name: "anonymous",
                    comment,
                    likes: 0,
                    timestamp: Date.now()
                })
                writeFile(VIDEO_PATH, videoDetails, (err) => console.log(err));
                res.json(vidFound);
            } else {
                res.status(404).send("video not found");
            }
        })
    })

module.exports = router;