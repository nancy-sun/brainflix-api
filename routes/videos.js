const fs = require("fs");
const express = require("express");
const router = express.Router();
const VIDEO_PATH = "./data/videos.json";

function readFile(file, callback) {
    fs.readFile(file, "utf-8", (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
        } else {
            console.log("data read");
        }
        callback(data);
    })
}

router.route("/")
    .get((req, res) => {
        readFile(VIDEO_PATH, (data) => {
            //send only partial of array of obj data
            const vidList = JSON.parse(data).map((video) => {
                return {
                    id: video.id,
                    title: video.title,
                    channel: video.channel,
                    image: video.image
                }
            })
            res.send(vidList);
        })
    })
//     .post((req, res) => {
//         // res.send()
//     })

// router.get("/:id", (req, res) => {
//     // send the data of that item in the json arr
// })


module.exports = router;