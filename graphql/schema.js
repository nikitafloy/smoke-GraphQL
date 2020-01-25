const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type TabaccoData {
        name: String!
        count: Int!
    }

    type Query {
        getAll: [TabaccoData!]!
        getCount(name: String!): String!
        increaseCount(name: String!, count: String!): String!
        decreaseCount(name: String!, count: String!): String!
        removeTabacco(name: String!): String!
        addTobacco(name: String!): String!
    }
`)