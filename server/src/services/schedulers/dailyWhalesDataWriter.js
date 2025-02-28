import scrapeData from "../scrapers/scrapeData.js";
import { quoteToBuy } from "../scrapers/uniswap-v3-buy-price/libs/quote-buy.js";
import { quoteToSell } from "../scrapers/uniswap-v3-sell-price/libs/quote-sell.js";
import pool from "../../database/dbConnection.js";
import updateLastRecord from "./updateLastRecord.js";
import highSellSignal from "../events/highSellSignal.js";
import { eventEmitter } from "../../utils/eventEmitter.js";

const dailyWhalesDataWriter = async () => {

  let db;
  
  try {
    db = await pool.getConnection();


    const scrapedData = await scrapeData();
    const [dataBtc] = scrapedData;
    const numericDataBtc = parseFloat(dataBtc);
    const buyPriceWbtcUniSdk = await quoteToBuy();
    const sellPriceWbtcUniSdk = await quoteToSell();


    // Obtén el último valor de BTC de la base de datos
    const [lastRecord] = await db.query(
      "SELECT BTC FROM trading_data ORDER BY ID DESC LIMIT 1"
    );

    const lastBtcValue = lastRecord?.[0]?.BTC || 0; // Si no hay registros previos, usa 0
    const diferencia = numericDataBtc - lastBtcValue;

    // Inserta el nuevo registro en la base de datos
    const query = `
      INSERT INTO trading_data (FECHA, BTC, DIFERENCIA, PRECIO_COMPRA, PRECIO_VENTA)
      VALUES (?, ?, ?, ?, ?)
    `;
    const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(query, [
      fecha,
      numericDataBtc,
      diferencia,
      buyPriceWbtcUniSdk,
      sellPriceWbtcUniSdk,
    ]);

    await updateLastRecord();

    const highTradeSignal = await highSellSignal();

    highTradeSignal ? eventEmitter.emit('highTradeSignalMornings', parseFloat(sellPriceWbtcUniSdk)) : eventEmitter.emit('noSellHighSignal');


    console.log("Registro insertado:", result);
  } catch (error) {
    console.error("Error al insertar los datos en la base de datos:", error);
    dailyWhalesDataWriter()
  } finally {
    db.release();  // IMPORTANTE: liberar la conexión después de usarla
}
};

export default dailyWhalesDataWriter;
