import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row} from 'react-bootstrap';
import {useMutation} from '@apollo/client';
import Auth from '../utils/auth';
import { saveRecipeIds, getSavedRecipeIds } from '../utils/localStorage';
import { ADD_RECIPE } from '../utils/mutations';

const SearchRecipes = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
  const [saveRecipe, {error}] = useMutation(ADD_RECIPE)

  useEffect(() => {
    saveRecipeIds(savedRecipeIds);
    return () => {
  
  };
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm) {
      return false;
    }

    try {
      const response = await fetch(`/searchRecipes/${searchTerm}`);;
     
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();
      console.log("Data", data.hits)

    
      setSearchedRecipes(data.hits);
      setSearchTerm('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveRecipe = async (recipe) => {

    console.log("recipe I want to save", recipe)
   
    let recipeToSave = {label: recipe.label, image: recipe.image, url: recipe.url, yield: recipe.yield, calories: recipe.calories}
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log("attempting mutation", recipeToSave)
     const {data} = await saveRecipe({
      variables: {label: recipe.label, image: recipe.image, url: recipe.url, yield: recipe.yield, calories: recipe.calories}
     })
     console.log(data)

      setSavedRecipeIds([...savedRecipeIds, recipe.url]);
    } catch (err) {
      console.error(err);
    }
  };
  const autoPopSearches = [
    { term: 'Protein', searchTerm: 'Protein' },
    { term: 'Keto', searchTerm: 'Keto' },
    { term: 'Low Calorie', searchTerm: 'Low Calorie' },
    { term: 'Vegan', searchTerm: 'Vegan' },
  ];
  const handleAutoPopSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      return false;
    }

    try {
      const response = await fetch(`/searchRecipes/${searchTerm}`);;
     
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();
      console.log("Data", data.hits)

    
      setSearchedRecipes(data.hits);
      setSearchTerm('');
    } catch (err) {
      console.error(err);
    }
 

  };
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Recipes!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchTerm'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="mt-3"> Quick Search: 
          {autoPopSearches.map((search) => (
            <Button
              key={search.searchTerm}
              variant="primary"
              className="mr-2"
              onClick={(e) => {
                handleAutoPopSearch(search.searchTerm);
              }}
            >
              {search.term}
            </Button>
          ))}
        </div>

        <h2 className="pt-5">
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : 'Search for a recipe to begin'}
        </h2>
        <Row>
          {searchedRecipes.map(({recipe}) => {
            // console.log("RENDERING RECIPES", recipe)
            return (
              <Col md="4" key={recipe.url}>
                <Card border='dark'>
                  {recipe.image ? (
                    <Card.Img src={recipe.image} alt={''} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>Recipe{recipe.label}</Card.Title>
                    <p className='small'></p>
                    <Card.Text><p><a href={recipe.url} target={recipe.url} rel="noopener noreferrer">View Details</a></p></Card.Text>
                    {Auth.loggedIn() && (
                 <Button
                 disabled={savedRecipeIds?.includes(recipe.url)}
                 className='btn-block btn-info'
                 onClick={() => handleSaveRecipe(recipe)}>
                 {savedRecipeIds?.includes(recipe.url)
                   ? 'This recipe is saved!'
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
