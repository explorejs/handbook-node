const Express = require("express");
const cors = require("cors");
const app = Express();

const mongoRouter = require("./routes/mongoRouter");

const greenList = ["https://handbook-dev.netlify.app", "https://handbook.dev"];

if (process.env.NODE_ENV !== "production") {
  greenList.push("http://localhost:3000");
}

const corsOptions = {
  origin: function (origin, callback) {
    if (greenList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(Express.json());

app.options("*", cors());

app.use("/mongo", cors(corsOptions), mongoRouter);

app.get("/", (req, res) => {
  res.send({ data: "Worldly Hellos" });
});

module.exports = app;
