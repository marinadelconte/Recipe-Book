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
  const [removeRecipe, {error}] = useMutation(REMOVE_RECIPE)
  const {loading, data} = useQuery(QUERY_ME)
  const userData = data?.me || {}
  const userDataLength = Object.keys(userData).length;
  const savedRecipes = userData.savedRecipes || [];

  const handleDeleteRecipe = async (recipe) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeRecipe({
        variables: { _id }
      });


      removeRecipeId(recipe);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
// TODO:PROPERTY CHAINING IN CARD BELOW MUST MATCH recipeData
  return (
    <>
    
 <div>
 <h2 className='pt-5'>
          {savedRecipes.length
            ? `Viewing ${savedRecipes.length} saved ${savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
 </div>
    </>
  );
};

export default SavedRecipes;
{/* <div>
      
<Card>
{savedRecipes.map((recipe)=>(
  <div key={recipe._id}>
    <p>{recipe.label}</p>
    <Button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</Button>
  </div>
))}

</Card>

</div> */}
