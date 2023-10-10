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
  Card,
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
    console.log(searchTerm);
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

    console.log("recipe I want to save", recipe);

    let recipeToSave = {
      label: recipe.label,
      image: recipe.image,
      url: recipe.url,
      yield: recipe.yield,
      calories: recipe.calories,
      fats: recipe.totalDaily.FAT.quantity,
      carbs: recipe.totalDaily.CHOCDF.quantity,
      protein: recipe.totalDaily.PROCNT.quantity,
    };
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log("attempting mutation", recipeToSave);
      const { data } = await saveRecipe({
        variables: {
          label: recipe.label,
          image: recipe.image,
          url: recipe.url,
          yield: recipe.yield,
          calories: recipe.calories,
          fats: recipe.totalDaily.FAT.quantity,
          carbs: recipe.totalDaily.CHOCDF.quantity,
          protein: recipe.totalDaily.PROCNT.quantity,
        },
      });
      console.log(data);

      setSavedRecipeIds([...savedRecipeIds, recipe.url]);
    } catch (err) {
      console.error(err);
    }
  };
  const autoPopSearches = [
    { term: "Protein", searchTerm: "Protein" },
    { term: "Keto", searchTerm: "Keto" },
    { term: "Low Calorie", searchTerm: "Low Calorie" },
    { term: "Vegan", searchTerm: "Vegan" },
  ];
  const handleAutoPopSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm) {
      return false;
    }

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
  return (
    <>
      <Container className="pt-4 pb-5 navBar2 is-fluid">
        <Heading className="has-text-centered is-size-3 navLinks">
          Search for Recipes!
        </Heading>

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
          <Button
            fullwidth
            onClick={handleFormSubmit}
            className="mt-2 has-text-centered buttonSubmit2 "
            type="submit"
            variant="success"
            size="lg"
          >
            Submit Search
          </Button>
        </Form.Field>
      </Container>

      <Container className="pb-5 is-fluid" height="200">
        <Heading className="has-text-centered mt-3 is-size-5 navLinks2">
          {searchedRecipes.length
            ? `Viewing ${searchedRecipes.length} results:`
            : "Search for a recipe to begin"}
        </Heading>

        <div className="mt-5 pb-5">
          {" "}
          Quick Search:
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

        <div className="columns is-multiline">
          {searchedRecipes.map(({ recipe }) => {
            return (
              <div className="column is-one-third" key={recipe.url}>
                <div className="card">

                  {recipe.image ? (
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img src={recipe.image} alt={recipe.label} />
                      </figure>
                    </div>
                  ) : null}
                  <div className="card-content">

                    <div className="card-content">
                      <p class="title is-4">Recipe: {recipe.label}</p>
                      <div className="columns">
                        <div className="column is-half">
                          <p>
                            <a
                              href={recipe.url}
                              target={recipe.url}
                              rel="noopener noreferrer"
                            >
                              View Details
                            </a>
                          </p>
                        </div>
                        <div className="column">
                          {Auth.loggedIn() && (
                            <Button.Group>
                              <Button
                                disabled={savedRecipeIds?.includes(recipe.url)}
                                className="btn-block btn-info"
                                onClick={() => handleSaveRecipe(recipe)}
                              >
                                {savedRecipeIds?.includes(recipe.url)
                                  ? "This recipe is saved!"
                                  : "Save this Recipe!"}
                              </Button>
                            </Button.Group>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default SearchRecipes;
