const express = require("express");
const cors = require("cors");
const Record = require("../models/record");

const corsOptions = {
  origin: "https://handbook-dev.netlify.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = express.Router();

router.use(cors(corsOptions));

router.get("/", async (req, res) => {
  const result = await Record.find({ status: "active" });
  res.send({ data: result });
});

router.post("/new", async (req, res) => {
  const { title, author, desc, cost, tags, url } = req.body;
  const exists = await Record.findOne({ url });
  if (!exists) {
    const result = await Record.create({
      title,
      author,
      desc,
      cost,
      tags,
      url,
    });
    res.send({ data: result });
  } else {
    res.send({ data: exists });
  }
});

module.exports = router;
