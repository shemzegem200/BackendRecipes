const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  Continent: String,
  Country_State: String,
  cuisine: String,
  title: String,
  URL: String,
  rating: { type: Number, default: null },
  total_time: { type: Number, default: null },
  prep_time: { type: Number, default: null },
  cook_time: { type: Number, default: null },
  description: String,
  ingredients: [String],
  instructions: [String],
  nutrients: {
    calories: String,
    carbohydrateContent: String,
    cholesterolContent: String,
    fiberContent: String,
    proteinContent: String,
    saturatedFatContent: String,
    sodiumContent: String,
    sugarContent: String,
    fatContent: String,
    unsaturatedFatContent: String,
  },
  serves: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
