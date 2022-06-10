const express = require("express");
require('dotenv').config();
const { PORT } = process.env;
const app = express();
const videos = require("./routes/videos");
const cors = require('cors');

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/videos", videos);

app.listen(PORT, () => {
    console.log(`i'm listening at ${PORT}`);
})