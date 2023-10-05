import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row} from 'react-bootstrap';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';
import { ADD_RECIPE } from '../utils/mutations';

const SearchRecipes = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
  const [saveRecipe, {error}] = useMutation(ADD_RECIPE)

  useEffect(() => {
    saveRecipeIds(savedRecipeIds);
    return () => {
  
  };
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(`/searchRecipes/${searchInput}`);;
      // TODO: FETCH IS ON THE FRONT END SERVER.JS, DO I NEED TO PULL FROM LOCAL STORAGE? OR IS THERE ANOTHER WAY?
      console.log(searchInput)
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();
      console.log(data)
      // const recipeData = items.map((recipe) => ({
        
      //   recipeId: recipe.id,
      //   label:"",
      //   healthLabels: "",
      //   image: "",
      //   url:""
      //   // TODO: MUST ADD PATHS FROM FETCH API TO LINK KEYS ABOVE
      // }));

      setSearchedRecipes(recipeData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveRecipe = async (recipeId) => {
    const recipeToSave = searchedRecipes.find((recipe) => recipe.recipeId === recipeId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     const {data} = await saveRecipe({
      variables: {recipeData:{...recipeToSave}}
     })

      setSavedRecipeIds([...savedRecipeIds, recipeToSave.recipeId]);
    } catch (err) {
      console.error(err);
    }
  };
// TODO:PROPERTY CHAINING IN CARD BELOW MUST MATCH recipeData
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Recipes!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a recipe'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : 'Search for a recipe to begin'}
        </h2>
        <Row>
          {searchedRecipes.map((recipe) => {
            return (
              <Col md="4" key={recipe.recipeId}>
                <Card border='dark'>
                  {recipe.image ? (
                    <Card.Img src={recipe.image} alt={`The cover for ${recipe.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <p className='small'>Authors: {recipe.authors}</p>
                    <Card.Text>{recipe.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveRecipe(recipe.recipeId)}>
                        {savedRecipeIds?.some((savedRecipeId) => savedRecipeId === recipe.recipeId)
                          ? 'This recipe has already been saved!'
                          : 'Save this Recipe!'}
                      </Button>
                    )}
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

export default SearchRecipes;
