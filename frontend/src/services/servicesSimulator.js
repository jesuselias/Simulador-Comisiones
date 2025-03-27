import axios from "axios";
import { config } from '../config/config';

const { API_BASE_URL, PAYMENT_API_URL, CLIENT_API_KEY } = config;

// Función para simular la comisión
export const simulateCommission = async (capital, meses, tipoBeneficio) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/simulate`, {
      capital: Number(capital),
      meses,
      tipoBeneficio,
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para generar el código QR
export const generateQRCode = async (capital) => {
  try {
    const response = await axios.post(
      `${PAYMENT_API_URL}/single`,
      {
        network: "BSC",
        fundsGoal: Number(capital),
        smartContractAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
      },
      {
        headers: {
          "client-api-key": CLIENT_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Función para verificar el estado del pago
export const checkPayment = async (network, address) => {
  try {
    const response = await axios.get(`${PAYMENT_API_URL}/status`, {
      params: { network, address },
      headers: {
        "client-api-key": CLIENT_API_KEY,
        "content-type": "application/json",
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
