const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingredientSchema =new Schema({

  text:{
    type: String
},
  foodId:{
    type: String
},
  image:{
    type: String
}


})

const recipeSchema = new Schema({
  label: {
    type: String
    
  },
  healthLabels: {
    type: [String]
  },
  image: {
    type: String

  },
  ingredients: {
    type: [ingredientSchema]
   
  },
  url: {
    type: String
    
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true
  // }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
const Ingredients = mongoose.model('Ingredients', ingredientSchema);

module.exports = {Recipe, Ingredients};
