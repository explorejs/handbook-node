const Express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const fetch = require("node-fetch");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests max
});

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

//Limit to 100 requests per 15 minutes
app.use(limiter);

app.use(Express.json());

app.options("*", cors());

app.use("/mongo", cors(corsOptions), mongoRouter);

app.post("/tags", async (req, res) => {
  const { tag } = req.body;
  try {
    const result = await fetch(process.env.SLACK_TAG_HOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `New tag suggestion: ${tag} `,
      }),
    }).then((res) => res);
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send({ error: e });
  }
});

app.get("/", (req, res) => {
  res.send({ data: "Worldly Hellos" });
});

module.exports = app;
