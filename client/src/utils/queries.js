import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes 
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      recipes {
        _id
        label
        image
        url
        yield
        calories
        }
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      label
      healthLabels
      image
      url 
    }
  }
`;

export const QUERY_RECIPES = gql`
  query getRecipes {
    recipes {
      _id
      label
      healthLabels
      image
      url
    }
  }
`;

export const QUERY_ME = gql`
  query userData {
    me {
    _id
    username
    recipes {
      _id
      image
      label
      url
      yield
      calories
    }
  }
  }
`;
