const express = require("express");
const router = express.Router();
const jobService = require("../services/jobService");
const scheduler = require("../scheduler/scheduler");

router.post("/", (req, res) => {
  const { schedule, api } = req.body;

  const job = jobService.createJob(schedule, api);
  scheduler.addJob(job.id, job.nextRun);

  res.json({ jobId: job.id });
});

router.get("/:id/executions", (req, res) => {
  const data = jobService.getExecutions(req.params.id);
  res.json(data);
});

module.exports = router;
