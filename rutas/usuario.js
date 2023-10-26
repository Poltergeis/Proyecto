const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('../modelos/modeloUsuario');


router.get('/iniciarSesion', async (req, res) => {
    try {
      const usuario = await Usuario.find({ email: req.email, contraseña: req.contraseña });
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error de inicio de sesion' });
    }
  });
  
  router.post('/registrarse', async (req, res) => {
    try {
      const usuario = new Usuario(req.body);
      await usuario.save();
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el usuario' });
    }
  });

  /*router.put('/actualizarUsuario/:usuarioId', async (req, res) => {
    try {
      const usuarioId = req.params.usuarioId;
      const datosActualizados = req.body;
      const resultado = await Usuario.findByIdAndUpdate(usuarioId, datosActualizados, { new: true });
      if (!resultado) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json(resultado);
      }
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar el usuario' });
    }
  });

  router.delete('/eliminarUsuario/:usuarioId', async (req, res) => {
    try {
      const usuarioId = req.params.usuarioId;
      const resultado = await Usuario.findByIdAndDelete(usuarioId);
      if (!resultado) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.json({ mensaje: 'Usuario eliminado exitosamente' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error al eliminar el usuario' });
    }
  });
*/
  module.exports = router;