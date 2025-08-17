import pool from "../../../database/dbConnection.js";
import updateLastRecord from "../updateLastRecord.js";
import highSellSignal from "../../events/highSellSignal.js";
import { eventEmitter } from "../../../utils/eventEmitter.js";
import scrapedEthData from "../../scrapers/etherScan/etherScan.js";
import { quoteToBuyWeth } from "../../scrapers/ethPrices/uniswap-eth-buy-price/libs/quote-buy.js";
import { quoteToSellWeth } from "../../scrapers/ethPrices/uniswap-eth-sell-price/libs/quote-sell.js";

const dailyEthDataWritter = async () => {

  let db;
  
  try {
    db = await pool.getConnection();


    const scrapeEthData = await scrapedEthData();
    const dataEth = scrapeEthData;
    const numericdataEth = parseFloat(dataEth);
    const buyPriceWethUniSdk = await quoteToBuyWeth();
    const sellPriceWethUniSdk = await quoteToSellWeth() ;


    // Obtén el último valor de BTC de la base de datos
    const [lastRecord] = await db.query(
      "SELECT ETH_AMOUNT FROM trading_eth_data ORDER BY ID DESC LIMIT 1"
    );

    const lastWethValue = lastRecord?.[0]?.ETH_AMOUNT || 0; // Si no hay registros previos, usa 0
    const diferencia = numericdataEth - lastWethValue;

    // Inserta el nuevo registro en la base de datos
    const query = `
      INSERT INTO trading_eth_data (FECHA, ETH_AMOUNT, DIFERENCIA, USDCETH, ETHUSDC)
      VALUES (?, ?, ?, ?, ?)
    `;
    const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(query, [
      fecha,
      numericdataEth,
      diferencia,
      buyPriceWethUniSdk,
      sellPriceWethUniSdk,
    ]);

    // await updateLastRecord();

    // const highTradeSignal = await highSellSignal();

    // highTradeSignal ? eventEmitter.emit('highTradeSignalMornings', parseFloat(sellPriceWethUniSdk)) : eventEmitter.emit('noSellHighSignal');


    console.log("Registro insertado:", result);
  } catch (error) {
    console.error("Error al insertar los datos en la base de datos:", error);
    dailyEthDataWritter()
  } finally {
    db.release();  // IMPORTANTE: liberar la conexión después de usarla
}
};

export default dailyEthDataWritter;
