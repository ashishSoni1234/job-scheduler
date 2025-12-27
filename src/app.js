const express = require("express");
const jobsRouter = require("./routes/jobs");
const alertsRouter = require("./routes/alerts");

const app = express();

app.use(express.json());
// simple request logger for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});
app.use("/jobs", jobsRouter);
app.use("/alerts", alertsRouter);

// 👇 DUMMY TEST API (scheduler target)
app.post("/test", (req, res) => {
  setTimeout(() => {
    res.status(200).send("OK");
  }, 500);
});

// 👇 DUMMY FAILURE API (returns 500) for testing alerts
app.post("/test-fail", (req, res) => {
  setTimeout(() => {
    res.status(500).send("FAIL");
  }, 200);
});

module.exports = app;
