import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe($label: String, $image: String, $url: String, $yield: Int, $calories: Float, $fats: Float, $carbs: Float, $protein: Float) {
  addRecipe(label: $label, image: $image, url: $url, yield: $yield, calories: $calories, fats: $fats, carbs: $carbs, protein: $protein) {
    _id
        username
    recipes {
      _id
      label
      image
      url
      yield
      calories
      fats
      protein
    }

  }
}
`;



export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      username
      email
    }
  }
`;
