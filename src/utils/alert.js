const db = require('../db/database');
const { v4: uuid } = require('uuid');

function notifyFailure(jobId, statusCode, message = null) {
  const now = Date.now();
  const msg = message ? String(message) : `Job failed with status ${statusCode}`;
  try {
    db.prepare(`INSERT INTO alerts VALUES (?, ?, ?, ?, ?)`)
      .run(uuid(), jobId, now, statusCode || 0, msg);
  } catch (e) {
    console.error('Failed to write alert to DB', e && e.message ? e.message : e);
  }

  console.error(`[ALERT] Job ${jobId} failed with status ${statusCode} - ${msg}`);
}

module.exports = { notifyFailure };
