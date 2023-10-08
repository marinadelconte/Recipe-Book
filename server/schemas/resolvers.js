const { User, Recipe } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('recipes');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('recipes');
    },
    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('recipes');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
        if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addRecipe: async (parent, { label, image, url, yield, calories, fats, carbs, protein }, context) => {
      console.log(label, image, url, yield, fats, carbs, protein);
      if (context.user) {
        const recipe = await Recipe.create({
          label,
          image,
          url,
          yield,
          calories,
          fats,
          carbs,
          protein
        });
        // console.log("recipe",recipe)
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } }
        ).populate("recipes")
        // console.log(user)
        return user;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw AuthenticationError;
    },

  },
};

module.exports = resolvers;
