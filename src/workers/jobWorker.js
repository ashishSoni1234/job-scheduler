const axios = require("axios");
const db = require("../db/database");
const { v4: uuid } = require("uuid");
const { notifyFailure } = require("../utils/alert");

async function execute(job) {
  const start = Date.now();
  let success = 0;
  let status = 500;

  const apiUrl = job.api || job.api_url;
  if (!apiUrl) {
    console.error(`Missing api url for job ${job.id}`);
  } else {
    try {
      const res = await axios.post(apiUrl);
      status = res.status;
      success = 1;
    } catch (e) {
        notifyFailure(job.id, status);
      console.error(`Job ${job.id} execution error:`, e && e.message ? e.message : e);
      if (e && e.response && e.response.status) status = e.response.status;
    }
  }

  const duration = Date.now() - start;

  db.prepare(`
    INSERT INTO job_executions
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(uuid(), job.id, Date.now(), status, duration, success);
}

module.exports = { execute };
