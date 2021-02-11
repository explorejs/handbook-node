const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nameFirst: {
    type: String,
    required: true,
  },
  nameLast: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
