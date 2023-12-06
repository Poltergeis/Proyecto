const mongoose = require("mongoose");

const modeloAbogado = mongoose.Schema({
    "nombre": {
        type: String,
        required: true,
        validate: (nombre) => {
            const regex = /^[a-zA-Z0-9\s.,áéíóúüñ-]+$/;;
            return regex.test(nombre);
        }
    },
    "area": {
        type: String,
        required: true,
        validate: (area) => {
            const regex = /^[a-zA-Z0-9\s.,áéíóúüñ-]+$/;
            return regex.test(area);
        }
    },
    "descripcion": {
        type: String,
        required: true,
        validate: (desc) => {
            const regex = /^[a-zA-Z0-9\s.,áéíóúüñ-]+$/;
            return regex.test(desc);
        }
    }
});

module.exports = mongoose.model("abogado", modeloAbogado, "abogados");