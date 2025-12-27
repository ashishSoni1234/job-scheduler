const { parseExpression } = require("cron-parser");

function getNextRun(cron) {
  try {
    const interval = parseExpression(cron);
    return interval.next().getTime();
  } catch (e) {
    console.error('Failed to parse cron:', cron, e && e.message ? e.message : e);
    // Fallback: run after 1 second to avoid stalling scheduler
    return Date.now() + 1000;
  }
}

module.exports = { getNextRun };
