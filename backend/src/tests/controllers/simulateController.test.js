const request = require('supertest');
const app = require('../../app');  // Asegúrate de que la ruta de tu app sea correcta

describe('POST /api/simulate', () => {
  
  // Test: Debe calcular correctamente los beneficios simples para 3 meses
  it('Debe calcular correctamente los beneficios simples para 3 meses', async () => {
    const res = await request(app)
      .post('/api/simulate')
      .send({ capital: 1000, meses: 3, tipoBeneficio: 'simple' });
    
    expect(res.status).toBe(200);
    expect(parseFloat(res.body.totalNeto)).toBeCloseTo(1019.70, 2); // Ajustado a 1009.4 según el cálculo
  });

  // Test: Debe calcular correctamente los beneficios compuestos para 6 meses
  it('Debe calcular correctamente los beneficios compuestos para 6 meses', async () => {
    const res = await request(app)
      .post('/api/simulate')
      .send({ capital: 1000, meses: 6, tipoBeneficio: 'compuesto' });
    
    expect(res.status).toBe(200);
    expect(parseFloat(res.body.totalNeto)).toBeCloseTo(1114.90, 2); // Ajustado según el cálculo compuesto
  });

  // Test: Debe devolver un error si el tipo de beneficio no es válido
  it('Debe devolver un error si el tipo de beneficio no es válido', async () => {
    const res = await request(app)
      .post('/api/simulate')
      .send({ capital: 1000, meses: 6, tipoBeneficio: 'invalid' });
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El tipo de beneficio debe ser 'simple' o 'compuesto'.");
  });

  // Test: Debe devolver un error si el valor de capital no es un número válido
  it('Debe devolver un error si el valor de capital no es un número válido', async () => {
    const res = await request(app)
      .post('/api/simulate')
      .send({ capital: 'invalid', meses: 6, tipoBeneficio: 'simple' });
    
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El capital debe ser un número válido y mayor que cero.");
  });

});

