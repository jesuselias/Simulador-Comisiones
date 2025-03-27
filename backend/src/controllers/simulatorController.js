const { calculateSimulation } = require("../services/simulatorService");

const simulate = (req, res) => {
  let { capital, meses, tipoBeneficio } = req.body;

  // Normalizar entradas
  capital = Number(capital);
  meses = Number(meses);
  tipoBeneficio = String(tipoBeneficio).trim().toLowerCase();

  // Validación de tipo de datos y valores válidos
  if (isNaN(capital) || capital <= 0) {
    return res.status(400).json({ error: "El capital debe ser un número válido y mayor que cero." });
  }
  if (!meses || meses <= 0) {
    return res.status(400).json({ error: "Los meses deben ser un número válido y mayor que cero." });
  }
  if (tipoBeneficio !== 'simple' && tipoBeneficio !== 'compuesto') {
    return res.status(400).json({ error: "El tipo de beneficio debe ser 'simple' o 'compuesto'." });
  }

  // Validación de que todos los campos están presentes
  if (!capital || !meses || !tipoBeneficio) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  try {
    const resultado = calculateSimulation(capital, meses, tipoBeneficio);
    return res.json(resultado);
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).json({ error: "Hubo un error al procesar la solicitud. Por favor, inténtelo más tarde." });
  }
};

module.exports = { simulate };

