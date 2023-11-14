const express = require("express");
const router = express.Router();
const Abogado = require("../modelos/modeloAbogados");

router.get("/agregarAbogado", async (req,res) => {
    let {nombre} = req.body;
    let datosNuevos = req.body;
    nombre = sanitizeHtml(nombre);
    nombre = nombre.trim();
    datosNuevos.nombre = nombre;

    try{

        const abogadoNuevo = new Abogado(datosNuevos);
        await abogadoNuevo.save();
        res.status(201).json({ mensaje: "abogado guardado correctamente" });

    }catch(error){
        console.log("error al subir el abogado",error);
        res.status(500).json({ error: "error al guardar el abogado" });
    }

});

router.delete("/eliminarAbogado/:nombreAbogado", async (req,res) =>{
    try{

        const nombre = req.params.nombreAbogado;
        const abogado = await Abogado.findOne({ nombre: nombre });

        if(!abogado){
            return res.status(404).json({ mensaje: "no se ha encontrado el abogado que se desea eliminar" });
        }

        await abogado.delete();
        res.status(200).json({ mensaje: "abogado borrado con exito" });

    }catch(error){
        console.log("error al eliminar el abogado", error);
        res.status(500).json({ error: "se ha producido un error durante el proceso de borrar el abogado de la base de datos" });
    }
});

module.exports = router;