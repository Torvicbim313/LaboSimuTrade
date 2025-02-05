import connectDB from "../../../../../../../database/dbConnection.js";

const stopLossAfternoons2_2 = async (amountToBuy, buyPrice, sellPrice) => {
    try {
        const db = await connectDB();

        const [whalesAmountResult] = await db.query(
            "SELECT BTC FROM trading_data_afternoons ORDER BY id DESC LIMIT 1"
          );
          const whalesAmount = whalesAmountResult.length ? parseFloat(whalesAmountResult[0].BTC) : 0;

          const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

          const query = `
          INSERT INTO 2_2tardes_ballenas (fecha, btc, usdt, accion, ballenas, precio_compra, precio_venta)
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

        console.log("Compra en perdidas registrada correctamente en 2_2Afternoons:", result);
        return amountToBuy;

    } catch (error) {
        console.error("Error intentando comprar en perdidas en stopLossAfternoons2_2: ",error)
    }
}

export default stopLossAfternoons2_2;