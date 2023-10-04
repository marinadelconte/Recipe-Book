const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  type Recipe {
    _id: ID
    title: String!
    text: String!
    image: String
    link: String
    }

   type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipes(username: String): [Recipe]
    recipe(recipeId: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(title: String!, text: String!, image: String, link: String): Recipe
    removeRecipe(recipeId: ID!): User
   
  }
`;

module.exports = typeDefs;
