const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
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

router.post(
  "/new",
  body("title").not().isEmpty().trim().escape(),
  body("desc").not().isEmpty().trim().escape(),
  body("tags").isArray({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
      }).catch((e) => e);
      res.send({ data: result });
    } else {
      res.send({ data: exists });
    }
  }
);

module.exports = router;
