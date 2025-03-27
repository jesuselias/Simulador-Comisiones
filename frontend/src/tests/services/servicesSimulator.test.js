import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";
import { simulateCommission, generateQRCode, checkPayment } from "../../services/servicesSimulator";
import { config } from '../../config/config';

const { API_BASE_URL, PAYMENT_API_URL } = config; // Ajusta la ruta de tu archivo

// Crear una instancia de axiosMockAdapter para interceptar las solicitudes de axios
const mock = new axiosMockAdapter(axios);

describe("Funciones API", () => {
  afterEach(() => {
    // Restablecer los mocks después de cada prueba
    mock.reset();
  });

  test("simulateCommission debe devolver datos correctamente", async () => {
    const mockResponse = { success: true, data: "simulacion exitosa" };
    
    // Configurar el mock de axios
    mock.onPost(`${API_BASE_URL}/simulate`).reply(200, mockResponse);
    
    const result = await simulateCommission(1000, 12, "Simple");
    
    expect(result).toEqual(mockResponse); // Verificar que la respuesta es la esperada
  });

  test("simulateCommission debe manejar errores correctamente", async () => {
    mock.onPost(`${API_BASE_URL}/simulate`).reply(500);
    
    // Probar que la función lanza un error
    await expect(simulateCommission(1000, 12, "Simple")).rejects.toThrow("Request failed with status code 500");
  });

  test("generateQRCode debe devolver un código QR", async () => {
    const mockResponse = { data: "qr_code_data" };
    
    // Configurar el mock de axios
    mock.onPost(`${PAYMENT_API_URL}/single`).reply(200, mockResponse);
    
    const result = await generateQRCode(1000);
    
    expect(result).toEqual(mockResponse.data); // Verificar que el código QR devuelto es correcto
  });

  test("generateQRCode debe manejar errores correctamente", async () => {
    mock.onPost(`${PAYMENT_API_URL}/single`).reply(500);
    
    // Probar que la función lanza un error
    await expect(generateQRCode(1000)).rejects.toThrow("Request failed with status code 500");
  });

  test("checkPayment debe devolver el estado del pago", async () => {
    const mockResponse = { data: "Pago verificado" };
    
    // Configurar el mock de axios
    mock.onGet(`${PAYMENT_API_URL}/status`).reply(200, mockResponse);
    
    const result = await checkPayment("BSC", "0x123456");
    
    expect(result).toEqual(mockResponse.data); // Verificar que el estado del pago es correcto
  });

  test("checkPayment debe manejar errores correctamente", async () => {
    mock.onGet(`${PAYMENT_API_URL}/status`).reply(500);
    
    // Probar que la función lanza un error
    await expect(checkPayment("BSC", "0x123456")).rejects.toThrow("Request failed with status code 500");
  });
});
