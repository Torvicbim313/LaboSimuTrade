import pool from "../../../database/dbConnection.js";
import { eventEmitter } from "../../../utils/eventEmitter.js";
import { quoteToBuyWeth } from "../../scrapers/ethPrices/uniswap-eth-buy-price/libs/quote-buy.js";
import { quoteToSellWeth } from "../../scrapers/ethPrices/uniswap-eth-sell-price/libs/quote-sell.js";
import updateLastRecordWeth from "./updateLastRecordWeth130.js";
import scrapedEthData130 from "../../scrapers/etherScan/etherScan130.js";
import highSellSignalWeth130 from "../../events/wEth130/highSellSignalWeth130.js";

const dailyEthDataWritter130 = async () => {

  let db;
  
  try {
    db = await pool.getConnection();


    const scrapeEthData = await scrapedEthData130();
    const dataEth = scrapeEthData;
    const numericdataEth = parseFloat(dataEth);
    const buyPriceWethUniSdk = await quoteToBuyWeth();
    const sellPriceWethUniSdk = await quoteToSellWeth() ;


    // Obtén el último valor de BTC de la base de datos
    const [lastRecord] = await db.query(
      "SELECT ETH_AMOUNT FROM trading_eth_data_130 ORDER BY ID DESC LIMIT 1"
    );

    const lastWethValue = lastRecord?.[0]?.ETH_AMOUNT || 0; // Si no hay registros previos, usa 0
    const diferencia = numericdataEth - lastWethValue;

    // Inserta el nuevo registro en la base de datos
    const query = `
      INSERT INTO trading_eth_data_130 (FECHA, ETH_AMOUNT, DIFERENCIA, USDCETH, ETHUSDC)
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

    await updateLastRecordWeth();

    const highTradeSignal = await highSellSignalWeth130();

    highTradeSignal ? eventEmitter.emit('highTradeSignalWeth130', parseFloat(sellPriceWethUniSdk)) : eventEmitter.emit('noSellHighSignalWeth130');


    console.log("Registro insertado wn weth130:", result);
  } catch (error) {
    console.error("Error al insertar los datos en la base de datos:", error);
    dailyEthDataWritter130()
  } finally {
    db.release();  // IMPORTANTE: liberar la conexión después de usarla
}
};

export default dailyEthDataWritter130;
