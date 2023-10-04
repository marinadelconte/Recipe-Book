const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  label: {
    type: String,
    required: true,
    trim: true
  },
  healthLabels: {
    type: String
  },
  image: {
    type: String
  },
  ingredients: {
    type: Number,
    required: true,
    min: 0.99
  },
  url: {
    type: Number,
    min: 0,
    default: 0
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true
  // }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
