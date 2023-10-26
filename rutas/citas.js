const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Citas = require("../modelos/modeloCitas");

router.get('/obtenerCita/:emailCliente', async (req, res) => {
    try {
        const citas = await Citas.findOne({});
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

router.post('/subirCita', async (req, res) => {
    try {
      const cita = new Citas(req.body);
      await cita.save();
      res.status(201).json(cita);
    } catch (error) {
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