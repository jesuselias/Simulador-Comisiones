import React, { useState } from "react";
import { saveAs } from "file-saver";
import QRCode from "react-qr-code";
import { simulateCommission, generateQRCode, checkPayment } from "../services/servicesSimulator"; // Importar servicios

const Simulator = () => {
  const [capital, setCapital] = useState("");
  const [months, setMonths] = useState(3);
  const [typeBenefit, setTypeBenefit] = useState("simple");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [network, setNetwork] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleSimulate = async () => {
    if (!capital || isNaN(capital) || Number(capital) <= 0) {
      setError("Por favor, ingrese un capital válido.");
      return;
    }
    setError("");

    try {
      const data = await simulateCommission(capital, months, typeBenefit);
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error al simular", error);
    }
  };

  const handleGenerateQR = async () => {
    if (!results) {
      alert("Primero debe simular una operación.");
      return;
    }

    try {
      const data = await generateQRCode(capital);
      setQrCode(data.address);
      setNetwork(data.network);
    } catch (error) {
      console.error("Error al generar el código QR", error);
    }
  };

  const handleCheckPayment = async () => {
    if (!qrCode) {
      alert("No se ha generado un código QR para el pago.");
      return;
    }

    try {
      const data = await checkPayment(network, qrCode);
      setPaymentStatus(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al verificar el pago", error);
    }
  };
  

  const exportCSV = () => {
    if (!results) return;
    let csvContent = "Mes,Beneficio,Capital Acumulado\n";
    results.ganancias.forEach((fila) => {
      csvContent += `${fila.mes},${fila.beneficio},${fila.capitalAcumulado}\n`;
    });
    csvContent += `\nFee,${results.fee}\nTotal Neto,${results.totalNeto}\n`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "simulacion.csv");
  };

  const resetSimulador = () => {
    setCapital("");
    setMonths(3);
    setTypeBenefit("simple");
    setResults(null);
    setError("");
    setQrCode(null);
    setPaymentStatus(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2C2D46] to-[#1A5DDF] p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-11/12 md:w-2/3 flex flex-col sm:flex-row gap-8">
        
        {/* Columna 1 (Formulario) */}
        <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Simulador de Comisiones</h2>
          <div className="space-y-6">
            <div>
              
              <label className="block text-xl text-gray-700 mb-2">Capital Inicial:</label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A5DDF]"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div>
              <label className="block text-xl text-gray-700 mb-2">Periodo:</label>
              <select
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full p-4 border border-gray-300 rounded-lg text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A5DDF]"
              >
                <option value={3}>3 meses</option>
                <option value={6}>6 meses</option>
                <option value={9}>9 meses</option>
                <option value={12}>12 meses</option>
              </select>
            </div>

            <div>
              <label id="benefit-type-label" className="block text-xl text-gray-700 mb-2">Tipo de Beneficio:</label>
              <select
                aria-labelledby="benefit-type-label"
                value={typeBenefit}
                onChange={(e) => setTypeBenefit(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A5DDF]"
              >
                <option value="simple">Simple</option>
                <option value="compuesto">Interés Compuesto</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <button
                onClick={handleSimulate}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
              >
                SIMULAR
              </button>
              <button
                onClick={handleGenerateQR}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                DEPOSITAR AHORA
              </button>
              <button
                onClick={handleCheckPayment}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                REVISAR PAGO
              </button>
              <button
                onClick={resetSimulador}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
              >
                RESET/NEW
              </button>
            </div>
          </div>
        </div>

        {/* Columna 2 (Results) */}
        <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Resultado</h3>
          {showResults ? (
            <div>
              {results ? (
                <div>
                  <table className="w-full table-auto border-collapse border border-gray-300 mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-gray-700">Mes</th>
                        <th className="border border-gray-300 p-3 text-gray-700">Beneficio</th>
                        <th className="border border-gray-300 p-3 text-gray-700">Capital Acumulado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.ganancias.map((fila, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="border border-gray-300 p-3 text-gray-700">{fila.mes}</td>
                          <td className="border border-gray-300 p-3 text-gray-700">{fila.beneficio}</td>
                          <td className="border border-gray-300 p-3 text-gray-700">{fila.capitalAcumulado}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col items-center mt-8">
                    <div className="w-full flex justify-between">
                      <p className="text-xl text-gray-700"><strong>Fee:</strong> {results.fee}</p>
                      <p className="text-xl text-gray-700"><strong>Total Neto:</strong> {results.totalNeto}</p>
                    </div>
                    <div className="mt-16"> {/* Aumenta la separación */}
                      <button
                        onClick={exportCSV}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                      >
                        Exportar CSV
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-600">Cargando Resultado...</p>
              )}

              {qrCode && (
                <div className="mt-8 flex justify-center items-center">
                <div className="text-center">
                  <h3 className="text-xl text-gray-800 mb-4">Escanea el QR para realizar el pago:</h3>
                  <div className="flex justify-center">
                  <QRCode value={qrCode} size={256} />
                </div>
                </div>
              </div>
              
              )}
            </div>
          ) : (
            <p className="text-center text-gray-600">Haz clic en SIMULAR para ver los Resultado.</p>
          )}
        </div>
      </div>
        {/* Modal de Pago */}
        {isModalOpen && paymentStatus && (
           <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm">
           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
             <h2 className="text-xl font-semibold mb-4 text-center">Estado del Pago</h2>
             <table className="w-full border-collapse border border-gray-300">
              
               <tbody>
                 <tr className="border border-gray-300">
                   <td className="px-4 py-2 font-semibold">Monto Capturado:</td>
                   <td className="px-4 py-2">{paymentStatus.amountCaptured = 200}</td>
                 </tr>
                 <tr className="border border-gray-300">
                   <td className="px-4 py-2 font-semibold">Estado:</td>
                   <td className="px-4 py-2">{paymentStatus.status}</td>
                 </tr>
               </tbody>
             </table>
             {paymentStatus.amountCaptured > 0 && <p className="text-green-600 font-bold text-center mt-4">El pago ha sido recibido.</p>}
             <div className="flex justify-center mt-4">
               <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Cerrar</button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

export default Simulator;
