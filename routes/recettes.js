const express = require('express');
const router = express.Router();
const Recette = require('../data/models/Recette');

// Route pour obtenir toutes les recettes
router.get('/', async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour créer une nouvelle recette
router.post('/', async (req, res) => {
  const recette = new Recette({
    name: req.body.name,
    preparation_time: req.body.preparation_time,
    rest_time: req.body.rest_time,
    cooking_time: req.body.cooking_time,
    dificuty: req.body.dificuty,
    price: req.body.price,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  });

  try {
    const newRecette = await recette.save();
    res.status(201).json(newRecette);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour trouver des recettes par ingrédients
router.get('/search', async (req, res) => {
  const ingredients = req.query.ingredients;
  if (!ingredients) {
    return res.status(400).json({ message: 'Ingrédients manquants dans la requête' });
  }

  // Transformer la chaîne de requête en tableau
  const ingredientList = ingredients.split(',');

  try {
    const recettes = await Recette.find({
      'ingredients.name': { $in: ingredientList }
    });
    res.json(recettes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour supprimer une recette par ID
router.delete('/:id', async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    await recette.remove();
    res.json({ message: 'Recette supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour modifier une recette par ID
router.patch('/:id', async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    const {
      name,
      preparation_time,
      rest_time,
      cooking_time,
      dificuty,
      price,
      ingredients,
      instructions
    } = req.body

    if (name != null) {
      recette.name = name;
    }
    if (preparation_time != null) {
      recette.preparation_time = preparation_time;
    }
    if (rest_time != null) {
      recette.rest_time = rest_time;
    }
    if (cooking_time != null) {
      recette.cooking_time = cooking_time;
    }
    if (dificuty != null) {
      recette.dificuty = dificuty;
    }
    if (price != null) {
      recette.price = price;
    }
    if (ingredients != null) {
      recette.ingredients = ingredients;
    }
    if (instructions != null) {
      recette.instructions = instructions;
    }

    const updatedRecette = await recette.save();
    res.json(updatedRecette);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour obtenir une recette par ID
router.get('/:id', async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.json(recette);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;