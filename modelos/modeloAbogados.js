const mongoose = require("mongoose");

const modeloAbogado = mongoose.Schema({
    "nombre": {
        type: String,
        required: true,
        validate: () => {
            const nombre = this.nombre;
            const regex = /^[a-zA-Z]+$/;
            return regex.test(nombre);
        }
    },
    "area": {
        type: String,
        required: true,
        validate: () => {
            const area = this.area;
            const regex = /^[a-zA-Z]+$/;
            return regex.test(area);
        }
    },
    "descripcion": {
        type: String,
        required: true,
        validate: () => {
            const desc = this.descripcion;
            const regex = /^[a-zA-Z]+$/;
            return regex.test(desc);
        }
    }
});

module.exports = mongoose.model("abogado", modeloAbogado, "abogados");