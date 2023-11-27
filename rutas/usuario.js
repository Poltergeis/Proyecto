const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/modeloUsuario');

router.use(express.json());

router.post('/registrarse', async (req, res) => {

  let {email,contrasenia,nombre} = req.body;

  const data = new Usuario({
      nombre: nombre,
      tipoUsuario: "cliente",
      email: email,
      contraseña: contrasenia
  });

  try {
      const dataToSave = data;
      await data.save();
      return res.status(200).json({ message: "nuevo usuario registrado", usuario: dataToSave });
  }
  catch (error) {
      return res.status(400).json({message: error.message})
  }
});


router.get('/getAll', async (req,res) => {
  try{
    const usuarios = await Usuario.find();
    res.status(200).json({ resultado: usuarios });
  }catch(error){
    res.status(500).json({ error: "error al cargar los usuarios" });
  }
});



router.get('/login/:email/:contrasenia', async (req, res) => {

    let {email,contrasenia} = req.params;

    try {
      const usuario = await Usuario.findOne({ email: email, contraseña: contrasenia });
      if(!usuario){
        return res.json({ resultado: false });
      }
      return res.status(200).json({ resultado: usuario });
    } catch (error) {
      console.log("error al iniciar sesion, verifique que los datos tengan el formato correcto",error);
      return res.status(500).json({ error: "error al iniciar sesion" });
    }
  });

  router.get('/filtro/:datoSinDefinir', async (req,res) => {
    let def = "nombre";
    const filtro = req.params.datoSinDefinir;

    const telefonoRegex = /^\d{10}$/;

    const emailRegex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);

    if(telefonoRegex.test(filtro)){
      def = "telefono";
    }else{
      if(emailRegex.test(filtro)){
        def = "email";
      }
    }

    switch(def.charAt(0)){
      case 'n':
        await Usuario.find({ nombre: filtro }).then((response) => {
          return res.status(200).json({ resultado: response });
        }).catch((error) => {
          return res.status(500).json({ error: "error al buscar por nombre" });
        });
        return;

      case 't':
        await Usuario.find({ numeroTelefono: filtro }).then((response) => {
          return res.status(200).json({ resultado: response });
        }).catch((error) => {
          return res.status(500).json({ error: "error al buscar por nombre" });
        });
        return;

      case 'e':
        await Usuario.find({ email: filtro }).then((response) => {
          return res.status(200).json({ resultado: response });
        }).catch((error) => {
          return res.status(500).json({ error: "error al buscar por nombre" });
        });
        return;
    }

  });

  router.put('/guardarInfo/:id', async (req, res) => {
    const {id} = req.params;

    const {telefono,titulo,descripcion} = req.body;

    try{
      await Usuario.findByIdAndUpdate(id, {numeroTelefono: telefono, tituloCita: titulo, descripcionCita: descripcion},
        {new: true});
      res.status(200).json({ resultado: "datos agregados con exito" });
    }catch(error){
      console.log("error al agregar los datos",error);
      res.status(500).json({ error: error });
    }

  });

  module.exports = router;