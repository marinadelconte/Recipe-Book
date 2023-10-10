import { useState, useEffect } from 'react';
import "bulma/css/bulma.min.css";
import {
  Form,
  Button,
  Icon,
  Field,
  Container,
  Heading,
  Card,
} from "react-bulma-components";
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
       <Container>
       <Heading className="has-text-centered is-size-3 mt-4">
          My Recipes
        </Heading>
      
      {recipes.length === 0 ? (
        <p>You have no saved recipes.</p>
      ) : (
        <div className="columns is-multiline">
          {recipes.map((recipe) => (

            <div className="column is-one-third" key={recipe._id}>
              <div className="card">

                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img src={recipe.image} alt={recipe.label} />
                      </figure>
                    </div>

                <div className="card-content">
                  <p class="title is-4">Recipe: {recipe.label}</p>
                      <p>Servings: {recipe.yield}</p>
                      <p>Macros Per Dish:</p>
                      <p>Calories: {Math.round(recipe.calories)} Protein: {Math.round(recipe.protein)}g Carbs: {Math.round(recipe.carbs)}g Fats: {Math.round(recipe.fats)}g</p>
                      <p>Macros Per Serving:</p>
                      <p>Calories: {Math.round(recipe.calories / recipe.yield)} Protein: {Math.round(recipe.protein / recipe.yield)}g Carbs: {Math.round(recipe.carbs / recipe.yield)}g Fats: {Math.round(recipe.fats / recipe.yield)}g</p>
                    
                  <div className="columns mt-2">
                    <div className="column is-half">
                      <p>
                        <a 
                          href={recipe.url} 
                          target={recipe.url} 
                          rel="noopener noreferrer">
                            See All Details
                        </a>
                      </p>
                    </div>
                  
                    <div className="column">
                  <Button.Group>
                      <Button 
                        className="btn-block btn-info"
                        onClick={() => handleDeleteRecipe(recipe)}> Delete
                      </Button>
                   </Button.Group>   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
    </>
  );
};

export default SavedRecipes;
