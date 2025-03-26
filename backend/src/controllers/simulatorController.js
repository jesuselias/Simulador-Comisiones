const { calculateSimulation } = require("../services/simulatorService");

const simulate = (req, res) => {
  const { capital, meses, tipoBeneficio } = req.body;

  if (!capital || !meses || !tipoBeneficio) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  const resultado = calculateSimulation(capital, meses, tipoBeneficio);
  res.json(resultado);
};

module.exports = { simulate };
