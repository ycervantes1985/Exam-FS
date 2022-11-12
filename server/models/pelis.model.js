const { Schema, model } = require('mongoose');
const { commentSchema } = require('./comments.model');

const pelisSchema = new Schema({
    name: {
        type: String,
        required: [true, "Debe ingresar un nombre de pelicula"],
        minlength: [3, "Nombre de pelicula no puede tener menos de 2 caracteres"]
    },
    
    yourname: {
        type: String,
        required: [true, "Debe ingresar un su nombre"],
        max:[15, "Debe ingresar menos de 15 carateres"]
    },
    
    rating: {
        type: Number,
        required: [true, "Este campo es obligatorio"],
        min: [0, "Valor mayor a 0"],
        max: [6, "Valor menor a 6"]
    }, 

    review: {
        type: String,
        required: [true, "Debe ingresar una review"],
        min:[3, "Debe ingresar al menos 3 caracteres"]
    },
    
    comments: [commentSchema],
    avg:{
        type:Number
    }

    

}, { timestamps: true });

const Peli = model('Peli', pelisSchema);

module.exports = Peli;