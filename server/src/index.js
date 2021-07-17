const app = require("./app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`It didn't crash! Listening on localhost:${port}`);
  /* eslint-enable no-console */
});
