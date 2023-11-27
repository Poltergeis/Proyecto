const express = require("express");
const router = express.Router();
const Abogado = require("../modelos/modeloAbogados");

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
    const {nombre,area,descripcion} = req.body;
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
        res.status(500).json({error: "error al agregar el abogado"});
    }
});

router.delete("/eliminar/:nombre", async (req,res) =>{
    try{

        const nombre = req.params.nombre;
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

module.exports = router;