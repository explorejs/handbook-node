const Record = require("../models/record")


const resolvers = {
  Query: {
    hello: async () => {
      return "hello world";
    },
    records: async () => {
      const result  = await Record.find({ status: "active" });
      return result
    },
  }
};

module.exports = resolvers;
