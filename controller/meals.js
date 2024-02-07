var meals = require("../model/meals");

exports.getAllMeals = async (req, res) => {
  try {
    var data = await meals.find();
    res.status(200).send(data);
  } catch {
    res.status(500).send("sever side error");
  }
};


