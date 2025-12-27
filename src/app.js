const express = require("express");
const jobsRouter = require("./routes/jobs");

const app = express();

app.use(express.json());
app.use("/jobs", jobsRouter);

// 👇 DUMMY TEST API (scheduler target)
app.post("/test", (req, res) => {
  setTimeout(() => {
    res.status(200).send("OK");
  }, 500);
});

module.exports = app;
