import { useState, useEffect } from "react";

// import { Container, Col, Form, Button, Card, Row} from 'react-bootstrap';

import "bulma/css/bulma.min.css";
import {
  Form,
  Button,
  Icon,
  Field,
  Container,
  Heading,
  Card
} from "react-bulma-components";

import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { saveRecipeIds, getSavedRecipeIds } from "../utils/localStorage";
import { ADD_RECIPE } from "../utils/mutations";

const SearchRecipes = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipeIds, setSavedRecipeIds] = useState(getSavedRecipeIds());
  const [saveRecipe, { error }] = useMutation(ADD_RECIPE);

  useEffect(() => {
    saveRecipeIds(savedRecipeIds);
    return () => {};
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchTerm) {
      return false;
    }
console.log(searchTerm)
    try {
      const response = await fetch(`/searchRecipes/${searchTerm}`);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const data = await response.json();
      console.log("Data", data.hits);

      setSearchedRecipes(data.hits);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    console.log("recipe I want to save", recipe);

    console.log("recipe I want to save", recipe)
   
    let recipeToSave = {label: recipe.label, image: recipe.image, url: recipe.url, yield: recipe.yield, calories: recipe.calories, fats: recipe.totalDaily.FAT.quantity, carbs: recipe.totalDaily.CHOCDF.quantity, protein: recipe.totalDaily.PROCNT.quantity}
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log("attempting mutation", recipeToSave)
     const {data} = await saveRecipe({
      variables: {label: recipe.label, image: recipe.image, url: recipe.url, yield: recipe.yield, calories: recipe.calories, fats: recipe.totalDaily.FAT.quantity, carbs: recipe.totalDaily.CHOCDF.quantity, protein: recipe.totalDaily.PROCNT.quantity}
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
      {/* <div className="text-light bg-dark p-5">
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
      </Container> */}





        <div className="bgContainer" height="100%">
      <Container className="pt-4 pb-5 navBar2 is-fluid" position="relative">
        <Heading className="has-text-centered is-size-3 navLinks">Search for Recipes!</Heading>

        <Form.Field className="mx-5">
          <Form.Control>
            <Form.Input
              placeholder="Search for a recipe"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              size="lg"
              className="has-text-centered pr-6"
            />
            <Icon align="left">
              <i className="github" />
            </Icon>
          </Form.Control>
          <Button fullwidth  onClick={handleFormSubmit} className="mt-2 has-text-centered buttonSubmit2 " type="submit" variant="success" size="lg">
            Submit Search
          </Button>
        </Form.Field>

        {/* <Button.Group> */}
          {/* <Button fullwidth className="mx-5 has-text-centered buttonSubmit2" type="submit" variant="success" size="lg">
            Submit Search
          </Button> */}
        {/* </Button.Group> */}
      </Container>
      

      <Container className="pb-5 is-fluid" height="200">

        <Heading className="has-text-centered mt-3 is-size-5 navLinks2">
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : "Search for a recipe to begin"}
        </Heading>

      <div className="mt-5 pb-5"> Quick Search:  
          {autoPopSearches.map((search) => (
            <Button
              key={search.searchTerm}
              variant="primary"
              className="mr-2 ml-2 mt-2"
              onClick={(e) => {
                handleAutoPopSearch(search.searchTerm);
              }}
            >
              {search.term}
            </Button>
          ))}
        </div>
       

        

        {searchedRecipes.map(({ recipe }) => {
          return (
            <Container md="4" key={recipe.url}>
              <Form.Field>
                {recipe.image ? (
                  <Card.Image src={recipe.image} alt={""} variant="top" className={"foodImage"}/>
                ) : null}
                <card>
                  <Card.Header className="foodImage">Recipe{recipe.label}</Card.Header>
                  <p className="small"></p>
                  <Card.Content>
                    <p>
                      <a
                        href={recipe.url}
                        target={recipe.url}
                        rel="noopener noreferrer"
                      >
                        View Details
                      </a>
                    </p>
                  </Card.Content>
                  {Auth.loggedIn() && (
                    <Button.Group>
                      <Button
                        disabled={savedRecipeIds?.includes(recipe.url)}
                        className="btn-block btn-info"
                        onClick={() => handleSaveRecipe(recipe)}
                      >
                        {savedRecipeIds?.includes(recipe.url)
                          ? "This recipe has already been saved!"
                          : "Save this Recipe!"}
                      </Button>
                    </Button.Group>
                  )}
                </card>
              </Form.Field>
            </Container>
          );
        })}
      </Container>
      </div>
    </>
  );
};

export default SearchRecipes;
