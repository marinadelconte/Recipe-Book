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

  const handleDeleteRecipe = async (recipe) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeRecipe({
        variables: {recipe}
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
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved recipes!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'}:`
            : 'You have no saved recipes!'}
        </h2>
        <Row>
          {userData.savedRecipes.map((recipe) => {
            return (
              <Col md="4" key={recipe.recipeId}>
                <Card key={recipe.recipeId} border='dark'>
                  {recipe.image ? <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>Authors: {recipe.authors}</p>
                    <Card.Text>{recipe.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                      Delete this Recipe!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedRecipes;
