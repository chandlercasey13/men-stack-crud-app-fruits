//needed to create schema
const mongoose = require("mongoose");

//create schema
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

//create model from schema

const Fruit = mongoose.model("Fruit", fruitSchema);

//export model for access
module.exports = Fruit;
