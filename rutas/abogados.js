const express = require("express");
const router = express.Router();
const Abogado = require("../modelos/modeloAbogados");
const sanitizeHTML = require('sanitize-html');

router.use(express.json());

router.get('/getAll', async (req,res) => {
    try{
        const abogados = await Abogado.find();
        res.status(200).json({ resultado: abogados });
    }catch(error){
        res.status(500).json({ error: "error al cargar los abogados" });
    }
});

router.post('/agregar', async (req,res) => {
    let {nombre,area,descripcion} = req.body;

    if((!nombre || !area) || !descripcion){
        return res.status(404).json({ resultado: "datos faltantes, operacion cancelada" });
    }

    nombre = sanitizeHTML(nombre).trim();
    area = sanitizeHTML(area).trim();
    descripcion = sanitizeHTML(descripcion).trim();

    try{
        const abogado = new Abogado({
            nombre: nombre,
            area: area,
            descripcion: descripcion
        });
        await abogado.save();
        res.status(201).json({ message: "abogado agregado con exito" });
    }catch(error){
        console.log("error al agregar abogados",error);
        res.status(500).json({error: `error al agregar el abogado ${error.message}`});
    }
});

router.delete("/eliminar/:nombre", async (req,res) =>{
    try{

        let nombre = req.params.nombre;

        if(!nombre){
            return res.status(404).json({ resultado: "operacion cancelada, datos incompletos" });
        }

        nombre = sanitizeHTML(nombre).trim();
        const abogado = await Abogado.findOne({ nombre: nombre });

        if(!abogado){
            return res.status(404).json({ message: "no se ha encontrado el abogado que se desea eliminar" });
        }

        await abogado.deleteOne();
        return res.status(200).json({ message: "abogado borrado con exito" });

    }catch(error){
        console.log("error al eliminar el abogado", error);
        return res.status(500).json({ error: "se ha producido un error durante el proceso de borrar el abogado de la base de datos" });
    }
});

router.put('/actualizar/:id', async(req,res) => {
    const {id} = req.params;
    let {nombre,area,descripcion} = req.body;

    if((!id || !nombre) || (!area || !descripcion)){
        return res.status(404).json({ resultado: "operacion cancelada debido a falta de datos" });
    }

    nombre = sanitizeHTML(nombre).trim();
    area = sanitizeHTML(area).trim();
    descripcion = sanitizeHTML(descripcion).trim();

    try{
        let abogado = await Abogado.findById(id);
        if(!abogado){
            return res.status(404).json({ resultado: "abogado inexistente" });
        }
        abogado.nombre = nombre;
        abogado.area = area;
        abogado.descripcion = descripcion;
        await abogado.save();
        return res.status(200).json({ resultado: "operacion exitosa" });
    }catch(error){
        console.log(`error al actualizar el abogado\n${error.message}`);
        res.status(500).json({ error: `error al actualizar el abogado ${error.message}` });
    }

});

module.exports = router;