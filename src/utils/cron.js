const parser = require("cron-parser");

function getNextRun(cron) {
  try {
    // cron-parser vX exports CronExpressionParser with a static parse method
    const parserImpl = parser.CronExpressionParser || parser.default || parser;
    const interval = parserImpl.parse
      ? parserImpl.parse(cron)
      : // fallback to older API if present
        (parser.parseExpression ? parser.parseExpression(cron) : null);

    if (!interval) throw new Error('No parser implementation available');

    return interval.next().getTime();
  } catch (e) {
    console.error('Failed to parse cron:', cron, e && e.message ? e.message : e);
    // Fallback: run after 1 second to avoid stalling scheduler
    return Date.now() + 1000;
  }
}

module.exports = { getNextRun };
