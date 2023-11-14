const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Citas = require("../modelos/modeloCitas");

router.get('/obtenerCita/:emailCliente', async (req, res) => {

  const emailCliente = req.params.emailCliente;
  const valoresEmailPermitidos = ["hotmail", "gmail", "outlook"];
  const regex = new RegExp("^%@" + valoresEmailPermitidos.join("|") + "\\.com$", "i");

    if(!regex.test(emailCliente)){
      return res.status(400).json({ mensaje: "formato de email invalido" });
    }

    try {
        const citas = await Citas.findOne({ emailCliente: emailCliente });
        res.status(200).send(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

router.post('/subirCita', async (req, res) => {
    let nuevaCita = req.body;
    let {nombre,apellido} = nuevaCita.abogadoCitado;
    let {tituloCita} = nuevaCita;
    nombre = sanitizeHtml(nombre);
    apellido = sanitizeHtml(apellido);
    tituloCita = sanitizeHtml(tituloCita);
    nombre = nombre.trim();
    apellido = apellido.trim();
    tituloCita = tituloCita.trim();
    nuevaCita.abogadoCitado.nombre = nombre;
    nuevaCita.abogadoCitado.apellido = apellido;
    nuevaCita.tituloCita = tituloCita;

    try {
      const cita = new Citas(nuevaCita);
      await cita.save();
      res.status(201).json(cita);
    } catch (error) {
      console.log("error al guardar la cita",error);
      res.status(400).json({ error: 'Error al crear la cita' });
    }
  });

  /*router.put('/actualizarCita/:citaId', async (req, res) => {
    try {
        const citaId = req.params.citaId;
        const cita = req.body;
        const resultado = await Citas.findByIdAndUpdate(citaId, cita, { new: true });
        if (!resultado) {
        res.status(404).json({ error: 'Cita no encontrada' });
        } else {
        res.json(resultado);
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la cita' });
    }
});

router.delete('/eliminarCita/:citaId', async (req, res) => {
    try {
      const citaId = req.params.citaId;
      const resultado = await Citas.findByIdAndDelete(citaId);
      if (!resultado) {
        res.status(404).json({ error: 'Cita no encontrada' });
      } else {
        res.json({ message: 'Cita eliminada exitosamente' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error al eliminar la cita' });
    }
});*/

module.exports = router;