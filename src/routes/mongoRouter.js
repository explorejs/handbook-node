const express = require("express");
const { body, validationResult } = require("express-validator");
const admin = require("../adapters/firebase");
const Record = require("../models/record");

const router = express.Router();

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

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      const token = req.headers.authorization.substring(
        7,
        req.headers.authorization.length
      );
      try {
        await admin
          .auth()
          .verifyIdToken(token)
          .then((decodedToken) => {
            const uid = decodedToken.uid;
            req.uid = uid;
          });
      } catch (e) {
        console.log("Token verify failure " + JSON.stringify(e));
        return res.status(500).send({
          error: "token verification",
          message: "check auth service is up",
        });
      }
    } else {
      // if request does not include valid/active auth token in header then reject their request as unauthorized
      return res.status(401).send({
        data: [],
        error: "unauthorized",
        message: "need to login first",
      });
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
