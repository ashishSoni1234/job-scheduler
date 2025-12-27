const p = require('cron-parser');
console.log('keys:', Object.keys(p));
console.log('CronExpression keys:', Object.getOwnPropertyNames(p.CronExpression));
try {
  const expr = new p.CronExpression('* * * * * *');
  console.log('constructed');
  console.log('has next:', typeof expr.next);
  console.log('next:', expr.next().toString());
} catch (e) {
  console.error('ERR constructing:', e && e.message ? e.message : e);
}
try {
  if (typeof p.parseExpression === 'function') {
    console.log('has parseExpression');
    const i = p.parseExpression('* * * * * *');
    console.log('parseExpression next:', i.next().toString());
  }
} catch (e) { console.error('ERR parseExpression:', e && e.message ? e.message : e); }
