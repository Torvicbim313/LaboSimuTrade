import pool from "../../../../../../../database/dbConnection.js";

const sellAfternoons2_2 = async () => {

  const db = await pool.getConnection();
  
  try {

    // Obtener el último valor de BTC de '2_2tardes_ballenas'
    const [btcAmountResult] = await db.query(
      "SELECT btc FROM 2_2tardes_ballenas ORDER BY id DESC LIMIT 1"
    );
    const btcAmount = btcAmountResult.length ? parseFloat(btcAmountResult[0].btc) : 0;

    // Obtener el último precio de venta desde 'trading_data_afternoons'
    const [btcSellPriceResult] = await db.query(
      "SELECT PRECIO_VENTA FROM trading_data_afternoons ORDER BY id DESC LIMIT 1"
    );
    const btcSellPrice = btcSellPriceResult.length ? parseFloat(btcSellPriceResult[0].PRECIO_VENTA) : 0;

    const gasCostUsdt = 0; // Ajusta este valor cuando estimes el gas real

    // Calcular el USDT después de la venta
    const usdtAfterSell = btcAmount * btcSellPrice * 0.997 - gasCostUsdt;
    console.log("USDT después de vender (con comisión y gas):", usdtAfterSell);

    // Obtener la fecha actual en formato SQL
    const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Obtener el último valor de ballenas desde 'trading_data_afternoons' (campo BTC)
    const [whalesAmountResult] = await db.query(
      "SELECT BTC FROM trading_data_afternoons ORDER BY id DESC LIMIT 1"
    );
    const whalesAmount = whalesAmountResult.length ? parseFloat(whalesAmountResult[0].BTC) : 0;

    // Obtener el último precio de compra desde 'trading_data_afternoons'
    const [btcBuyPriceResult] = await db.query(
      "SELECT PRECIO_COMPRA FROM trading_data_afternoons ORDER BY id DESC LIMIT 1"
    );
    const btcBuyPrice = btcBuyPriceResult.length ? parseFloat(btcBuyPriceResult[0].PRECIO_COMPRA) : 0;

    // Insertar el nuevo registro con los datos de la venta
    const query = `
      INSERT INTO 2_2tardes_ballenas (fecha, btc, usdt, accion, ballenas, precio_compra, precio_venta)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      formattedDate,
      0, // Se pone 0 en BTC porque se ha vendido todo
      usdtAfterSell,
      'SELL',
      whalesAmount, // Ahora se obtiene de trading_data_afternoons.BTC
      btcBuyPrice,
      btcSellPrice
    ]);

    console.log("Venta registrada correctamente:", result);
    return usdtAfterSell;

  } catch (error) {
    console.error('Error intentando vender y registrar en 2_2tardes_ballenas:', error);
  } finally {
    db.release();  // IMPORTANTE: liberar la conexión después de usarla
}
};

export default sellAfternoons2_2;
