const express = require("express");
require('dotenv').config();
const { PORT } = process.env;
const app = express();
const videos = require("./routes/videos");
app.use("/videos", videos);

app.use(express.static("public"));
app.use(express.json());


app.listen(PORT, () => {
    console.log(`i'm listening at ${PORT}`);
})