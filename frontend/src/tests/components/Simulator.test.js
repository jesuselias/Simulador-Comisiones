// src/tests/Simulator.test.js

import React from 'react'; // Agrega esta línea
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Simulator from '../../components/Simulator'; // Asegúrate de ajustar la ruta al componente

test('simulador de comisiones funciona correctamente', () => {
  render(<Simulator />);

  // Verificar que el botón de simular está en la pantalla
  const simulateButton = screen.getByText('SIMULAR');
  expect(simulateButton).toBeInTheDocument();

  // Simular un clic en el botón de simular
  fireEvent.click(simulateButton);

  // Verificar que el resultado se muestra después de hacer clic
  const resultMessage = screen.getByText(/Haz clic en SIMULAR para ver los Resultado./);
  expect(resultMessage).toBeInTheDocument();
});

test('cambia entre tipos de beneficio simple', () => {
  render(<Simulator />);
  
  const benefitTypeSelect = screen.getByLabelText('Tipo de Beneficio:');
  fireEvent.change(benefitTypeSelect, { target: { value: 'Simple' } });
  
  const simpleOption = screen.getByText('Simple');
  expect(simpleOption).toBeInTheDocument();
});

test('cambia entre tipos de beneficio Interés Compuesto', () => {
  render(<Simulator />);
  
  const benefitTypeSelect = screen.getByLabelText('Tipo de Beneficio:');
  fireEvent.change(benefitTypeSelect, { target: { value: 'Interés Compuesto' } });
  
  const simpleOption = screen.getByText('Interés Compuesto');
  expect(simpleOption).toBeInTheDocument();
});
