const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const citasSchema = new mongoose.Schema({
    "emailCliente": String,
    "abogadoCitado": {
      "nombre": String,
      "apellido": String
    },
    "tituloCita": String,
    "descripcion": String
  });

  const Citas = mongoose.model('Citas', citasSchema, 'Citas');

  router.get('/', async (req, res) => {
    try {
        const citas = await Citas.find();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las citas' });
    }
});

router.post('/', async (req, res) => {
    try {
      const cita = new Citas(req.body);
      await cita.save();
      res.status(201).json(cita);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear la cita' });
    }
  });

  router.put('/:citaId', async (req, res) => {
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

router.delete('/:citaId', async (req, res) => {
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
});