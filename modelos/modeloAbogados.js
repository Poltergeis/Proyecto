const mongoose = require("mongoose");

const modeloAbogado = mongoose.Schema({
    "nombre": {
        type: String,
        required: true
    },
    "area": {
        type: String,
        required: true
    },
    "descripcion": {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("abogado", modeloAbogado, "abogados");