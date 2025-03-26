import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";
const PAYMENT_API_URL = "https://my.disruptivepayments.io/api/payments";
const CLIENT_API_KEY = "o0z8y85rjdx28iqef32f4mrl6e56b71742437588342";

export const simulateCommission = async (capital, meses, tipoBeneficio) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/simulate`, {
      capital: Number(capital),
      meses,
      tipoBeneficio,
    });
    return response.data;
  } catch (error) {
    console.error("Error al simular", error);
    throw error;
  }
};

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
    console.error("Error al generar el código QR", error);
    throw error;
  }
};

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
    console.error("Error al verificar el pago", error);
    throw error;
  }
};
