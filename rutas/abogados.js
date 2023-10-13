const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const abogadoSchema = new mongoose.Schema({
    "emailCliente": String,
    "abogadoCitado": {
      "nombre": String,
      "apellido": String
    },
    "tituloCita": String,
    "descripcion": String
  });

  const Abogado = mongoose.model('Abogado', abogadoSchema, 'abogados');

  router.get('/', async (req,res) => {
    try {
      const abogado = new Abogado(req.body);
      await abogado.save();
      res.status(201).json(abogado);
    } catch (error) {
      res.status(400).json('error en el recibo de datos:\n' + {error: error.message});
    }
  });

  router.post('/', async (req, res) => {
    try {
      const abogado = new Abogado(req.body);
      await abogado.save();
      res.status(201).json(abogado);
    } catch (error) {
      res.status(400).json('error en el recibo de datos:\n' + {error: error.message});
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const abogado = await Abogado.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
      if (!abogado) {
        return res.status(404).json({ message:'abogado no encontrado'});
      }
      res.status(200).json(abogado);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const abogado = await Abogado.findByIdAndRemove(req.params.id);
      if (!abogado) {
        return res.status(404).json({ message: 'Abogado no encontrado'});
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });