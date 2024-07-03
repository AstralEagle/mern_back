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
    ingredients: [],
    instructions: ["Appeler maman", "Manger tes mors"],
  })
  await newRecette.save()
  res.status(200).json(newRecette);
});

module.exports = router;
