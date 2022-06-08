const fs = require("fs");
const express = require("express");
const router = express.Router();

function readVideoList(file, callback) {
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
        readVideoList("./data/videos.json", (data) => {
            //send only partial of array of obj data
            // for (let i of data) {
            //     let list = 
            //     res.send(list);
            // }
            res.send(data);
        })
    })
//     .post((req, res) => {
//         // res.send()
//     })

// router.get("/:id", (req, res) => {
//     // send the data of that item in the json arr
// })


module.exports = router;

// fs.readFile("./data/videos.json", "utf-8", (err, fileData) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(fileData);
// })