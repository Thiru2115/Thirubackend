const express = require("express");
const router = express.Router();
const locate = require("./controller/location");
const hotel = require("./controller/hotels");
const meal = require("./controller/meals");

router.get("/getAllLocations", locate.getAllLocations);
router.get("/getAllHotels", hotel.getAllHotels);
router.get("/filterbyid/:_id", hotel.getById);
router.get("/filterbycity/:city", hotel.getByCitys);
router.get("/filterby/:mealtype_id",hotel.filter)

router.get("/getAllMeals", meal.getAllMeals);


module.exports = router;
