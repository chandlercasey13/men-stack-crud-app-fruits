//Requires

//loads env variables from .env
const dotenv = require("dotenv");
dotenv.config();

//Implement Mongoose
const mongoose = require("mongoose");

//Loading Express
const express = require("express");
const app = express();

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Import the Fruit model
const Fruit = require("./models/fruit.js");

app.use(express.urlencoded({ extended: false }));


//Routes ------------------------------------------------------------------------------------------------------

//Rendering our EJS
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


// GET /fruits
app.get("/fruits", async (req, res) => {
    
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  })

app.get("/fruits/new", (req, res) => {
    res.render('fruits/new.ejs')
});

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }
      await Fruit.create(req.body);
      res.redirect("/fruits"); // redirect to index fruits
      
  });

  app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
