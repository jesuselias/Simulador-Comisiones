const calculateSimulation = (capital, meses, tipoBeneficio) => {
    const tasas = { 3: 0.01, 6: 0.02, 9: 0.03, 12: 0.04 };
    const tasa = tasas[meses];
  
    let capitalFinal = capital;
    let ganancias = [];
  
    for (let i = 1; i <= meses; i++) {
      let beneficio = capitalFinal * tasa;
  
      if (tipoBeneficio === "compuesto") {
        capitalFinal += beneficio;
      }
  
      ganancias.push({
        mes: i,
        beneficio: beneficio.toFixed(2),
        capitalAcumulado: capitalFinal.toFixed(2),
      });
    }
  
    const feeRate = calculateFee(capitalFinal);
    const fee = capitalFinal * feeRate;
    const totalNeto = capitalFinal - fee;
  
    return { ganancias, fee: fee.toFixed(2), totalNeto: totalNeto.toFixed(2) };
  };
  
  const calculateFee = (monto) => {
    if (monto <= 1000) return 0.02;
    if (monto <= 10000) return 0.01;
    if (monto <= 35000) return 0.005;
    return 0.0025;
  };
  
  module.exports = { calculateSimulation };
  