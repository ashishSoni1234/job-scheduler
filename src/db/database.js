const Database = require("better-sqlite3");
const db = new Database("scheduler.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    schedule TEXT,
    api_url TEXT,
    next_run_time INTEGER,
    created_at INTEGER
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS job_executions (
    id TEXT PRIMARY KEY,
    job_id TEXT,
    execution_time INTEGER,
    status_code INTEGER,
    duration_ms INTEGER,
    success INTEGER
  )
`).run();

module.exports = db;
