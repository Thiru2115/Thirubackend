const hotel = require("../model/hotel");
var hotels = require("../model/hotel");
exports.getAllHotels = async (req, res) => {
  try {
    var data = await hotels.find();
    res.status(200).send(data);
  } catch {
    res.status(500).send("server side error");
  }
};

exports.getByCitys = async (req, res) => {
  try {
    const { city } = req.params;
    const data = await hotels.findOne({ city: city });
    res.status(200).send(data);
  } catch(ERR) {
    res.status(500).send(ERR);
  }
};

exports.getById = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await hotels.findById(_id);
    res.status(200).send(data);
  } catch {
    res.status(500).send("server side error");
  }
};
exports.getAllRestaurantsByQuery = async (req,res) =>{
  try{
      const {mealtype_id, city, cuisine, min_price, sort, location_id} = req.query;
      const query = {};
      if(city) query.city = city;
      if(mealtype_id) query.mealtype_id = Number(mealtype_id);
      if(location_id) query.location_id = Number(location_id);
      if (cuisine) {
          query.cuisine =  { $elemMatch: { name: cuisine } };
      }
      
      if(min_price){
          query.min_price= {$gte : Number(min_price)};
      }

      const sortOptions = {};
      if(sort){
          sortOptions[sort] = 1;
      }

      const restaurants = await hotelSchema.find(query).sort(sortOptions).exec();

      res.json(restaurants);
  } catch (error){
      console.log(error);
      res.status(500).json({error:error});
  }
}

exports.filter = async (req,res) =>{
  try {
      const {location_id, mealtype_id, cuisine_id, sort, lcost, hcost} =  req.body
      const query = {}


      if(location_id) query.location_id = location_id
      if(mealtype_id) query.mealtype_id = mealtype_id
      if(cuisine_id && cuisine_id.length > 0){
          query.cuisine = { $elemMatch: { id: {$in : cuisine_id} } };
      } 

      if(lcost!== undefined && hcost!== undefined){
          query.min_price = {$lte : hcost, $gte : lcost}
      }

      const sortOptions = {};
      if(sort){
          sortOptions.min_price = sort
      }
      const restaurantName = await hotelSchema.find(query).sort(sortOptions).exec()

      if(restaurantName.length == 0){
          res.json({msg : "no city found"})
      }else{
          res.json(restaurantName)
      }

  }
  catch(err){
      res.status(500).json({msg : err})
  }
}
