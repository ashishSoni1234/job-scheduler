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

// Update job (schedule or api). Uses `api` in body.
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { schedule, api } = req.body;

  try {
    const updated = jobService.updateJob(id, schedule, api);
    // update scheduler queue
    scheduler.updateJob(id, updated.nextRun);
    res.json({ jobId: id, nextRun: updated.nextRun });
  } catch (e) {
    res.status(500).json({ error: e && e.message ? e.message : String(e) });
  }
});

router.get("/:id/executions", (req, res) => {
  const data = jobService.getExecutions(req.params.id);
  res.json(data);
});

// Get job metadata
router.get('/:id', (req, res) => {
  const db = require('../db/database');
  const row = db.prepare('SELECT id, schedule, api_url, next_run_time, created_at FROM jobs WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'job not found' });
  res.json(row);
});
// (removed duplicate handler)

module.exports = router;
