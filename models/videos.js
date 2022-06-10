const fs = require("fs");

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

module.exports = { readFile, writeFile };