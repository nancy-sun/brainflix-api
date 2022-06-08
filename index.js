const express = require("express");
const app = express();
const PORT = 8080;
const videos = require("./routes/videos");
app.use("/videos", videos);

app.use(express.static("public"));
app.use(express.json());


app.listen(PORT, () => {
    console.log("i'm listening");
})