let mongoose = require("mongoose");
var MealsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  meal_type: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("hotelMeals", MealsSchema);
