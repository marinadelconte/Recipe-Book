import { useState } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import {useMutation, useQuery} from '@apollo/client';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';
import { REMOVE_RECIPE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const SavedRecipes = () => {
  const [removeRecipe, {error}] = useMutation(REMOVE_RECIPE);
  const {loading, data} = useQuery(QUERY_ME);
  const userData = data?.me || {};
  const userDataLength = Object.keys(userData).length;
  const savedRecipes = userData.savedRecipes || [];
  const recipes = userData.recipes || [];

  const handleDeleteRecipe = async (recipe) => { 
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeRecipe({
        variables: { recipeId: recipe._id } 
      });

      removeRecipeId(recipe._id); 
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
       <div>
      <h2>My Recipes</h2>
      {recipes.length === 0 ? (
        <p>You have no saved recipes.</p>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <Card key={recipe._id}>
              <Card.Img variant="top" src={recipe.image} alt={`Image for ${recipe.label}`} />
              <Card.Body>
                <Card.Title>{recipe.label}</Card.Title>
                <Card.Text>
                  <p>{recipe.url}</p>
                 
                </Card.Text>
                <Button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default SavedRecipes;
