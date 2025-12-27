const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM alerts ORDER BY alert_time DESC LIMIT 50').all();
  res.json(rows);
});

router.get('/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  const rows = db.prepare('SELECT * FROM alerts WHERE job_id = ? ORDER BY alert_time DESC LIMIT 50').all(jobId);
  res.json(rows);
});

module.exports = router;
