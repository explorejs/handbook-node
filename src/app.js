const Express = require("express");
const app = Express();

app.get("/", (req, res) => {
  res.send({ data: "Hi There" });
});

module.exports = app;
