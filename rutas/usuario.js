const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/modeloUsuario');
const sanitizeHTML = require('sanitize-html');
const bcrypt = require('bcrypt');

router.use(express.json());

router.get('/requerirInfo/:id', async(req,res) => {
  const id = req.params.id;
  try{
    const usuario = await Usuario.findById(id);
    return res.status(200).json({ resultado: { nombre: usuario.nombre, email: usuario.email } });
  }catch(error){
    console.log(`error al obtener la informacion del usuario ${error.message}`);
    return res.status(500).json({resultado: { error: "error: " + error.message }});
  }
});

router.post('/registrarse', async (req, res) => {

  let {email,contrasenia,nombre} = req.body;

  nombre = sanitizeHTML(nombre).trim();
  contrasenia = sanitizeHTML(contrasenia).trim();
  email = email.trim();

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
    email = sanitizeHTML(email).trim();
    contrasenia = sanitizeHTML(contrasenia).trim();

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
    let filtro = req.params.datoSinDefinir;
    filtro = sanitizeHTML(filtro).trim();

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

    let {telefono,titulo,descripcion} = req.body;

    if((!telefono || !titulo) || !descripcion){
      return res.status(404).json({ resultado: "datos incompletos, operacion cancelada" });
    }
    try{
      const user = await Usuario.findById(id)
        if(!user){
          return res.status(404).json({ resultado: "el usuario no existe" });
        }
    }
    catch(error){
      return res.status(500).json({ error: `operacion cancelada, error en la busqueda del usuario ${error.message}` });
    }

    titulo = sanitizeHTML(titulo).trim();
    descripcion = sanitizeHTML(descripcion).trim();

    try{
      let usuario = await Usuario.findById(id);
      usuario.numeroTelefono = telefono;
      usuario.tituloCita = titulo;
      usuario.descripcionCita = descripcion;
      await usuario.validate();
      await usuario.save();
      res.status(200).json({ resultado: "datos agregados con exito" });
    }catch(error){
      console.log("error al agregar los datos",error);
      res.status(500).json({ error: error });
    }

  });

  router.delete('/eliminar/:id', async(req,res) => {
    const {id} = req.params;

    if(!id){
      return res.status(404).json({ resultado: "datos incompletos, operacion cancelada" });
    }

    try{
      const usuario = await Usuario.findById(id);
      if(!usuario){
        return res.status(404).json({ resultado: "usuario no existe" });
      }
      await Usuario.deleteOne(usuario);
      res.status(200).json({ resultado: "usuario eliminado con exito" });

    }catch(error){
      console.log(`error al eliminar el usuario ${error.message}`);
      res.status(500).json({ error: `error al eliminar el usuario ${error.message}` });
    }
  });

  router.post('/secretRoute/agregarAdministrador', async(req,res) => {
    const {nombre, email, password} = req.body;
    try{
      const usuario = new Usuario({
        nombre: nombre,
        tipoUsuario: "admin",
        email: email,
        contraseña: password
      });
      await usuario.save();
      return res.status(201).json({ resultado: "exito al agregar el usuario" });
    }catch(error){
      console.log(`error in secret Route ${error.message}`);
      return res.status(500).json({ error: `error in secretRoute:\n${error.message}` });
    }
  });

  module.exports = router;