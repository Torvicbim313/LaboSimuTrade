import axios from "axios";

const scrapeStrategicEthReserve = async () => {
    try {
    const url = 'https://www.strategicethreserve.xyz'; // Reemplaza con la URL real
    const { data } = await axios.get(url);

    // Busca el valor con una expresión regular
    const match = data.match(/"totalETHHoldings":([0-9.]+)/);
    let valor = null;
    if (match && match[1]) {
      valor = parseFloat(match[1]);
    }

    console.log('Valor extraído:', valor);
    return valor;
  } catch (error) {
    console.error('Error scraping Strategic Eth Reserve:', error);
    return null;
  }
}

export default scrapeStrategicEthReserve;