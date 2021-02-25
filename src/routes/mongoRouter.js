const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const Record = require("../models/record");

const greenList = ["https://handbook-dev.netlify.app", "https://handbook.dev/"];

const router = express.Router();

router.options("*", cors());
router.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (greenList.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

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
