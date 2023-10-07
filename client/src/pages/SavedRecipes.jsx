import { useState, useEffect } from 'react';
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
  const {loading, data, refetch} = useQuery(QUERY_ME);
  const userData = data?.me || {};
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
      await refetch();
      console.log(recipe._id)
      console.log(recipe)
      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
   
  }, [recipes]);

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
                  <p>Servings: {recipe.yield}</p>
                  <p>Macros Per Dish:</p>
                  <p>Calories: {Math.round(recipe.calories)} Protein: {Math.round(recipe.protein)}g Carbs: {Math.round(recipe.carbs)}g Fats: {Math.round(recipe.fats)}g</p>
                  <p>Macros Per Serving:</p>
                  <p>Calories: {Math.round(recipe.calories / recipe.yield)} Protein: {Math.round(recipe.protein / recipe.yield)}g Carbs: {Math.round(recipe.carbs / recipe.yield)}g Fats: {Math.round(recipe.fats / recipe.yield)}g</p>
                  
                  <p><a href={recipe.url} target={recipe.url} rel="noopener noreferrer">See All Details</a></p>

                 
                </Card.Text>
                <Button onClick={() => handleDeleteRecipe(recipe)}>Delete</Button>
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
