const { calculateSimulation } = require("../../services/simulatorService");

describe("calculateSimulation", () => {
  test("Calcula correctamente los beneficios simples para 3 meses", () => {
    const resultado = calculateSimulation(1000, 3, "simple");
    expect(resultado.ganancias.length).toBe(3);
    expect(parseFloat(resultado.ganancias[0].beneficio)).toBe(10);
    expect(parseFloat(resultado.totalNeto)).toBeGreaterThan(0);
  });

  test("Calcula correctamente los beneficios compuestos para 6 meses", () => {
    const resultado = calculateSimulation(2000, 6, "compuesto");
    expect(resultado.ganancias.length).toBe(6);
    expect(parseFloat(resultado.ganancias[5].capitalAcumulado)).toBeGreaterThan(2000);
  });

  test("Aplica correctamente el fee para diferentes montos", () => {
    const resultadoBajo = calculateSimulation(500, 3, "simple");
    expect(parseFloat(resultadoBajo.fee)).toBeCloseTo(resultadoBajo.ganancias.at(-1).capitalAcumulado * 0.02, 2);

    const resultadoMedio = calculateSimulation(5000, 6, "simple");
    expect(parseFloat(resultadoMedio.fee)).toBeCloseTo(resultadoMedio.ganancias.at(-1).capitalAcumulado * 0.01, 2);

  });
});
