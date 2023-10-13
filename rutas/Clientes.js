const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    "nombreCliente": String,
    "apellidoCliente": String,
    "numeroTelefono": Number,
    "email": String,
      "motivoCita": String,
    "citaPendiente": Boolean
  });

  const Cliente = mongoose.model('Cliente', abogadoSchema, 'clientes');

  router.get('/', async (req,res) => {
    try {
      const cliente = new Cliente(req.body);
      await cliente.save();
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json('error en el recibo de datos:\n' + {error: error.message});
    }
  });

  router.post('/', async (req, res) => {
    try {
      const cliente = new Cliente(req.body);
      await cliente.save();
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json('error en el recibo de datos:\n' + {error: error.message});
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
      if (!cliente) {
        return res.status(404).json({ message:'cliente no encontrado'});
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
        return res.status(404).json({ message: 'Cliente no encontrado'});
      }
      res.status(204).send();
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });