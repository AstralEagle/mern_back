const mongoose = require("mongoose");

const recetteSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    preparation_time: {
        required: false,
        type: Number,
    },
    rest_time: {
        required: false,
        type: Number,
    },
    cooking_time: {
        required: false,
        type: Number,
    },
    dificuty: {
        required: true,
        type: Number,
    },
    price: {
        required: true,
        type: Number,
    },
    ingredients: {
        required: true,
        type: [{
            name: {
                required: true,
                type: String,
            },
            number: {
                type: Number,
                required: false,
            }
        }]
    },
    instructions: {
        required: true,
        type: [String],
    }
});

const Recette = mongoose.model('Recette', recetteSchema);


module.exports = Recette;