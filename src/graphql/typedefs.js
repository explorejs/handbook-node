const gql = require("graphql-tag");

const typeDefs = gql`
  type Author {
    name_first: String
    name_last: String
  }

  type Record {
    _id: String
    author: Author
    cost: Int
    desc: String
    status: String
    tags: [String]
    title: String
    ts: String
    url: String
  }

  type Query {
    hello: String
    records: [Record]
  }
`;

module.exports = typeDefs;
