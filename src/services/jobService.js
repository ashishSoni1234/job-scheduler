const db = require("../db/database");
const { v4: uuid } = require("uuid");
const { getNextRun } = require("../utils/cron");

function createJob(schedule, apiUrl) {
  const id = uuid();
  const nextRun = getNextRun(schedule);
  const now = Date.now();

  db.prepare(`
    INSERT INTO jobs (id, schedule, api_url, next_run_time, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, schedule, apiUrl, nextRun, now);

  return { id, nextRun };
}

function getExecutions(jobId) {
  return db.prepare(`
    SELECT * FROM job_executions
    WHERE job_id = ?
    ORDER BY execution_time DESC
    LIMIT 5
  `).all(jobId);
}

module.exports = { createJob, getExecutions };
