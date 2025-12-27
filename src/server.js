const app = require("./app");
const scheduler = require("./scheduler/scheduler");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  scheduler.start();
});
