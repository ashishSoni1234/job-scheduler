const PriorityQueue = require("./priorityQueue");
const db = require("../db/database");
const worker = require("../workers/jobWorker");
const { getNextRun } = require("../utils/cron");

const pq = new PriorityQueue();

function addJob(id, nextRun) {
  pq.push({ id, nextRun });
}

async function start() {
  const jobs = db.prepare("SELECT * FROM jobs").all();
  jobs.forEach(j => pq.push({ id: j.id, nextRun: j.next_run_time }));

  while (true) {
    if (pq.size() === 0) {
      await sleep(1000);
      continue;
    }

    const job = pq.peek();
    const now = Date.now();

    if (now >= job.nextRun) {
      pq.pop();
      const fullJob = db.prepare("SELECT * FROM jobs WHERE id=?").get(job.id);
      await worker.execute(fullJob);

      const next = getNextRun(fullJob.schedule);
      db.prepare("UPDATE jobs SET next_run_time=? WHERE id=?")
        .run(next, job.id);

      pq.push({ id: job.id, nextRun: next });
    } else {
      await sleep(job.nextRun - now);
    }
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

module.exports = { start, addJob };
