import pool from "../../../../../../../database/dbConnection.js";

const stopLoss3_3weth130 = async (amountToBuy, buyPrice, sellPrice) => {

  const db = await pool.getConnection();
  
    try {

        const [whalesAmountResult] = await db.query(
            "SELECT ETH_AMOUNT FROM trading_eth_data_130 ORDER BY id DESC LIMIT 1"
          );
          const whalesAmount = whalesAmountResult.length ? parseFloat(whalesAmountResult[0].ETH_AMOUNT) : 0;

          const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

          const query = `
          INSERT INTO 3_3weth130 (fecha, eth_amount, usdc, accion, ballenas, precio_compra, precio_venta)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
    
        const [result] = await db.query(query, [
          formattedDate,
          amountToBuy,
          0, // Se pone 0 en USDT porque se ha comprado todo
          'BUY',
          whalesAmount, // Ahora se obtiene de trading_data_afternoons.BTC
          buyPrice,
          sellPrice
        ]);

        console.log("Compra en perdidas registrada correctamente en 3_3weth130:", result);
        return amountToBuy;

    } catch (error) {
        console.error("Error intentando comprar en perdidas en stopLoss3_3weth130: ",error)
    } finally {
      db.release();  // IMPORTANTE: liberar la conexión después de usarla
  }
}

export default stopLoss3_3weth130;