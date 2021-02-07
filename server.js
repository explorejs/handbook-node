const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * When deploying the environment may manage the port
 * Locally we can default to 8080
 */
const port = process.env.PORT || 8000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    app.listen(port, () => {
      console.log("server started on " + port);
    })
  )
  .catch((err) => {
    console.log("Mongoose connect error : " + err);
  });
