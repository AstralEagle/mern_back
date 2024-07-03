const express = require('express');
const router = express.Router();
const Recette = require('../data/models/Recette');


/* GET home page. */
router.get('/', async (req, res, next) => {
   const newRecette = await new Recette({
  name: "Pate carbonara",
    preparation_time: 20,
    rest_time: 0,
    cooking_time: 10,
    dificuty: 1,
    price: 2,
    ingredients: [
      {name: "sel"},
      {name: "poivre",},
      {name: "Gruyère", number: 50,},
      {name: "Crème", number: 15,},
      {name: "Lardon", number: 90,},
      {name: "Pate", number: 350,},
      {name: "oeuf", number: 1,},
    ],
    instructions: ["Appeler maman", "Manger tes mors"],
  })
  await newRecette.save()
  res.status(200).json(newRecette);
});

module.exports = router;
