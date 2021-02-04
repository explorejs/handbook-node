const app = require("./src/app");

/**
 * When deploying the environment may manage the port
 * Locally we can default to 8080
 */
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("server started");
});
