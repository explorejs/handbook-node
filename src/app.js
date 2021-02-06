const Express = require("express");
const cors = require("cors");
const app = Express();

const mongoRouter = require("./routes/mongoRouter");

const corsOptions = {
  origin: "https://handbook-dev.netlify.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(Express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/mongo", mongoRouter);

app.get("/", cors(corsOptions), (req, res) => {
  res.send({ data: "Hi There" });
});

module.exports = app;
