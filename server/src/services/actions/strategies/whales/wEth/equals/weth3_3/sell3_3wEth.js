import pkg from "ethers";
import { getProvider } from "../../../../../../scrapers/ethPrices/uniswap-eth-buy-price/libs/providers.js";
import pool from "../../../../../../../database/dbConnection.js";
import { quoteToSellWeth } from "../../../../../../scrapers/ethPrices/uniswap-eth-sell-price/libs/quote-sell.js";

const { utils } = pkg;
const { formatUnits } = utils;

const provider = getProvider();

const sell3_3wEth = async () => {

  const db = await pool.getConnection();
  
  try {

    // Obtener el último valor de eth de '3_3tardes_ballenas'
    const [ethAmountResult] = await db.query(
      "SELECT eth_amount FROM 3_3weth ORDER BY id DESC LIMIT 1"
    );
    const ethAmount = ethAmountResult.length ? parseFloat(ethAmountResult[0].eth) : 0;

    // Obtener el último precio de venta desde 'trading_data_afternoons'
    const [ethSellPriceResult] = await db.query(
      "SELECT ETHUSDC FROM trading_eth_data ORDER BY id DESC LIMIT 1"
    );
    const ethSellPrice = ethSellPriceResult.length ? parseFloat(ethSellPriceResult[0].PRECIO_VENTA) : 0;

    // --- Cálculo del gas ---
    const gasLimit = 150000; // Un swap típico en Uniswap
    const gasPrice = await provider.getGasPrice(); // En wei
    const gasCostEth = Number(formatUnits((BigInt(gasPrice.toString()) * BigInt(gasLimit)).toString(), "ether"));

    // Debes obtener el precio actual de ETH en USDC dinámicamente, aquí lo pongo fijo como ejemplo:
    const ethPriceUsdc = parseFloat(await quoteToSellWeth()); // Reemplaza por tu función real

    const gasCostUsdc = gasCostEth * ethPriceUsdc;

    // Calcular el USDT después de la venta (con comisión y gas)
    const usdtAfterSell = ethAmount * ethSellPrice * 0.997 - gasCostUsdc;
    console.log("USDC después de vender (con comisión y gas):", usdtAfterSell);

    // Obtener la fecha actual en formato SQL
    const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Obtener el último valor de ballenas desde 'trading_data_afternoons' (campo eth)
    const [whalesAmountResult] = await db.query(
      "SELECT ETH_AMOUNT FROM trading_eth_data ORDER BY id DESC LIMIT 1"
    );
    const whalesAmount = whalesAmountResult.length ? parseFloat(whalesAmountResult[0].eth) : 0;

    // Obtener el último precio de compra desde 'trading_data_afternoons'
    const [ethBuyPriceResult] = await db.query(
      "SELECT USDCETH FROM trading_eth_data ORDER BY id DESC LIMIT 1"
    );
    const ethBuyPrice = ethBuyPriceResult.length ? parseFloat(ethBuyPriceResult[0].PRECIO_COMPRA) : 0;

    // Insertar el nuevo registro con los datos de la venta
    const query = `
      INSERT INTO 3_3weth (fecha, eth_amount, usdc, accion, ballenas, precio_compra, precio_venta)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      formattedDate,
      0, // Se pone 0 en eth porque se ha vendido todo
      usdtAfterSell,
      'SELL',
      whalesAmount, // Ahora se obtiene de trading_data_afternoons.eth
      ethBuyPrice,
      ethSellPrice
    ]);

    console.log("Venta registrada correctamente:", result);
    return usdtAfterSell;

  } catch (error) {
    console.error('Error intentando vender y registrar en 3_3tardes_ballenas:', error);
  } finally {
    db.release();  // IMPORTANTE: liberar la conexión después de usarla
}
};

export default sell3_3wEth;
