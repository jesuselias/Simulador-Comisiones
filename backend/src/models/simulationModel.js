const mongoose = require("mongoose");

const SimulationSchema = new mongoose.Schema({
  capital: Number,
  meses: Number,
  tipoBeneficio: String,
  resultado: Object,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Simulation", SimulationSchema);
