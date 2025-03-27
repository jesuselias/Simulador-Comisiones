// jest.setup.js
require('dotenv').config(); // Carga las variables de entorno
// Mock de import.meta.env
globalThis.import = {
    meta: {
      env: {
        VITE_API_BASE_URL: 'https://api.miapp.com', // Reemplázalo por tus valores
        VITE_PAYMENT_API_URL: 'https://payments.miapp.com', // Reemplázalo por tus valores
        VITE_CLIENT_API_KEY: 'mi-api-key-1234', // Reemplázalo por tus valores
      },
    },
  };
  