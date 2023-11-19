const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../modelos/modeloUsuario');


router.get('/iniciarSesion/:email/:contraseña', async (req, res) => {

    let {email,contraseña} = req.params;

    try {
      const usuario = await Usuario.findOne({ email: email, contraseña: contraseña });
      res.send(usuario);
    } catch (error) {
      console.log("error al iniciar sesion, verifique que los datos tengan el formato correcto",error);
      res.status(500).json({ error: "error al iniciar sesion" });
    }
  });

  router.get('/filtrarUsuarios/:email', async (req,res) => {
    const {email} = req.params;

    if(email.length === 0){
      return;
    }

    try{

      const usuarios = await Usuario.find({ email: email });
      res.status(200).send(usuarios);

    }catch(error){
      console.error("error al filtrar usuarios",error);
      res.status(500).json({ error: "error al filtrar usuarios" });
    }

  });
  
  router.post('/registrarse', async (req, res) => {

    let {nombre,apellido,numeroTelefono,email} = req.body;
    let datosNuevos = req.body;
    if(isNaN(numeroTelefono)){
      return res.status(400).json({ mensaje: "el numero de telefono debe ser un numero de 10 digitos" });
    }else{
      numeroTelefono = parseInt(numeroTelefono);
      if(numeroTelefono > 9999999999 || numeroTelefono < 1000000000){
        return res.status(400).json({ mensaje: "el numero de telefono debe ser un numero de 10 digitos" });
      }
    }

    const valoresEmailPermitidos = ["hotmail", "gmail", "outlook"];
    const regex = new RegExp("^%@" + valoresEmailPermitidos.join("|") + "\\.com$", "i");

    if(!regex.test(email)){
      return res.status(400).json({ mensaje: "formato de email invalido" });
    }

    nombre = sanitizeHtml(nombre);
    apellido = sanitizeHtml(apellido);
    nombre = nombre.trim();
    apellido = apellido.trim();

    datosNuevos.nombre = nombre;
    datosNuevos.apellido = apellido;

    try {
      const usuario = new Usuario(datosNuevos);
      await usuario.save();
      res.status(201).json(usuario);
    } catch (error) {
      console.log("error al crear el usuario",error);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  });   

  router.put('/actualizarUsuario/:email/:contraseña', async (req, res) => {
    let emailAntiguo = req.params.email;
    const contraseña = req.params.contraseña;

    const valoresEmailPermitidos = ["hotmail", "gmail", "outlook"];
    const regex = new RegExp("^%@" + valoresEmailPermitidos.join("|") + "\\.com$", "i");

    if(!regex.test(emailAntiguo)){
      return res.status(400).json({ mensaje: "formato de email invalido" });
    }

    let datosNuevos = req.body;
    if(!regex.test(datosNuevos.email)){
      return res.status(400).json({ mensaje: "formato de email invalido" });
    }
    if(isNaN(datosNuevos.numeroTelefono)){
      return res.status(400).json({ mensaje: "el numero de telefono debe ser un numero de 10 digitos" });
    }else{
      datosNuevos.numeroTelefono = parseInt(datosNuevos.numeroTelefono);
      if(datosNuevos.numeroTelefono < 1000000000 || datosNuevos.numeroTelefono > 9999999999){
        return res.status(400).json({ mensaje: "el numero de telefono debe ser un numero de 10 digitos" });
      }
    }
    datosNuevos.nombre = sanitizeHtml(datosNuevos.nombre);
    datosNuevos.nombre = datosNuevos.nombre.trim();
    datosNuevos.apellido = sanitizeHtml(datosNuevos.apellido);
    datosNuevos.apellido = datosNuevos.apellido.trim();

    try {
      const resultado = await Usuario.findOneAndUpdate({ email: emailAntiguo, contraseña: contraseña }, 
      datosNuevos, { new: true });
      if (!resultado) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ resultado: "usuario actualizado con exito" });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar el usuario' });
    }
  });

  router.delete('/eliminarUsuario/:email/:contraseña', async (req, res) => {

    let emailAntiguo = req.params.email;
    const contraseña = req.params.contraseña;

    const valoresEmailPermitidos = ["hotmail", "gmail", "outlook"];
    const regex = new RegExp("^%@" + valoresEmailPermitidos.join("|") + "\\.com$", "i");

    if(!regex.test(emailAntiguo)){
      return res.status(400).json({ mensaje: "formato de email invalido" });
    }

    try {
      const resultado = await Usuario.findOneAndDelete({ email:emailAntiguo, contraseña: contraseña });
      if (!resultado) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json({ mensaje: 'Usuario eliminado exitosamente' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error al eliminar el usuario' });
    }
  });

  module.exports = router;