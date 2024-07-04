const mongoose = require("mongoose");

const recetteSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    preparation_time: {
        required: false,
        type: String,
    },
    rest_time: {
        required: false,
        type: String,
    },
    cooking_time: {
        required: false,
        type: String,
    },
    dificuty: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: String,
    },
    image: {
      required: true,
      type: String,
    },
    ingredients: {
        required: true,
        type: [{
            name: {
                required: true,
                type: String,
            },
            number: {
                type: String,
                required: false,
            }
        }]
    },
    instructions: {
        required: true,
        type: [String],
    },
});

const Recette = mongoose.model('Recette', recetteSchema);


module.exports = Recette;