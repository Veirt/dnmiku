import express from "express";

const app = express();

app.use("/", require("./routes/router"));

app.listen(8081, () => console.log("Listening on http://localhost:8081"));
