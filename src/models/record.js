const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    name_first: {
      type: String,
      required: true,
    },
    name_last: {
      type: String,
      required: true,
    },
  },
  desc: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "active",
  },
  tags: {
    type: [String],
  },
  ts: { type: Date, default: Date.now },
  url: {
    type: String,
    required: true,
  },
  //   creator: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User",
  //   },
});

module.exports = mongoose.model("Record", recordSchema);
