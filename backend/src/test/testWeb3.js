const Web3 = require("web3").default; 
const web3 = new Web3("https://bsc-dataseed.binance.org/");
const abi = [ 
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name":"","type":"string"}],
    "type": "function"
  }
];

const contractAddress = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
const contract = new web3.eth.Contract(abi, contractAddress);

(async () => {
  try {
    const symbol = await contract.methods.symbol().call();
    console.log("Símbolo del token:", symbol);
  } catch (error) {
    console.error("Error al obtener el símbolo:", error);
  }
})();
