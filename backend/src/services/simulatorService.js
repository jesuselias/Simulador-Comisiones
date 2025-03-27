// Función para validar las entradas de la simulación
const validateInputs = (capital, meses, tipoBeneficio) => {
  if (typeof capital !== "number" || capital <= 0) {
    throw new Error("El capital debe ser un número mayor que 0.");
  }
  if (![3, 6, 9, 12].includes(meses)) {
    return res.status(400).json({ error: "Los meses deben ser 3, 6, 9 o 12." });
  }  
  if (tipoBeneficio !== "simple" && tipoBeneficio !== "compuesto") {
    throw new Error("El tipo de beneficio debe ser 'simple' o 'compuesto'.");
  }
};

// Función principal de cálculo de simulación
const calculateSimulation = (capital, meses, tipoBeneficio) => {
  // Validar las entradas para evitar errores y comportamientos inesperados
  validateInputs(capital, meses, tipoBeneficio);

  // Tasas de beneficio mensual por duración (en meses)
  const tasas = { 3: 0.01, 6: 0.02, 9: 0.03, 12: 0.04 };
  const tasa = tasas[meses]; 

  let capitalFinal = capital; 
  let ganancias = []; 
  let beneficioAcumulado = 0; 

  // Cálculo de beneficios mes a mes
  for (let i = 1; i <= meses; i++) {
    // Validar que el cálculo no dé un valor incorrecto o inesperado
    let beneficio = tipoBeneficio === "simple" ? capital * tasa : capitalFinal * tasa;

    // Si es beneficio compuesto, sumamos el beneficio al capital acumulado
    if (tipoBeneficio === "compuesto") {
      capitalFinal += beneficio;
    } else {
      beneficioAcumulado += beneficio; 
    }

    // Guardamos el mes, el beneficio y el capital acumulado
    ganancias.push({
      mes: i,
      beneficio: parseFloat(beneficio.toFixed(2)),
      capitalAcumulado: tipoBeneficio === "simple" 
        ? parseFloat((capital + beneficioAcumulado).toFixed(2)) 
        : parseFloat(capitalFinal.toFixed(2)), 
    });
  }

  // Cálculo del fee al final del contrato basado en el monto final correcto
  const montoFinal = tipoBeneficio === "simple" 
    ? capital + beneficioAcumulado 
    : capitalFinal; 

  // Calcular el fee con una validación de seguridad adicional
  const feeRate = calculateFee(montoFinal);  
  let fee = montoFinal * feeRate; 
  
  fee = parseFloat(fee.toFixed(2));  
  
  const totalNeto = montoFinal - fee;  

  return { ganancias, fee: fee.toFixed(2), totalNeto: totalNeto.toFixed(2) };
};

// Función corregida para calcular el fee
const calculateFee = (monto) => {
  // Validar que el monto sea un valor adecuado
  if (typeof monto !== "number" || monto <= 0) {
    throw new Error("El monto debe ser un número mayor que 0.");
  }

  // Protege las tasas contra valores negativos o inesperados
  if (monto <= 1000) return 0.02;                     // 2% de fee para montos hasta 1,000
  if (monto > 1000 && monto <= 10000) return 0.01;    // 1% de fee para montos entre 1,001 y 10,000
  if (monto > 10000 && monto <= 35000) return 0.005;  // 0.5% de fee para montos entre 10,001 y 35,000
  return 0.0025;                                      // 0.25% de fee para montos mayores a 35,000
};

module.exports = { calculateSimulation };
