const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstname: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLString } },
      resolve(root, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
