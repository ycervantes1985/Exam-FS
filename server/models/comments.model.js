const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
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
    

}, { timestamps: true });

const Comment = model('Comment', commentSchema);

module.exports = {
    Comment,
    commentSchema
};