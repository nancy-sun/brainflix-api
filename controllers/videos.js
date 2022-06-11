const fs = require("fs");
const VIDEO_PATH = "./models/videos.json";
const { readFile, writeFile } = require("../models/videos");
const uniqid = require("uniqid");


function getVideoList(req, res) {
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
}


function postNewVideo(req, res) {
    const { title, description, image } = req.body;
    writeFile(VIDEO_PATH, {
        id: uniqid(),
        title, description, image,
        channel: "default channel",
        views: 0, //(optional)views+1 every time goes to the video url
        likes: 0,
        duration: "4:01",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: []
    })
    res.json(req.body)
}


function getSingleVideo(req, res) {
    readFile(VIDEO_PATH, (data) => {
        const videoDetails = JSON.parse(data);
        const vidFound = videoDetails.find((video) => video.id == req.params.id);
        if (vidFound) {
            res.json(vidFound);
        } else {
            res.status(404).send("video not found");
        }
    })
}

function postComment(req, res) {
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
}

function deleteComment(req, res) {
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
}

function likeVideo(req, res) {
    readFile(VIDEO_PATH, (data) => {
        const videoDetails = JSON.parse(data);
        const vidFound = videoDetails.find((video) => video.id == req.params.id);
        if (vidFound) {
            vidFound.likes += 1;
            fs.writeFile(VIDEO_PATH, JSON.stringify(videoDetails), (err) => { err ? console.log(err) : console.log("file written") });
            res.json(vidFound);
        } else {
            res.status(404).send("video not found");
        }
    })
}

module.exports = { getVideoList, postNewVideo, getSingleVideo, postComment, deleteComment, likeVideo };