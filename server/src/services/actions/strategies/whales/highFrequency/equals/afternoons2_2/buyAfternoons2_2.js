import connectDB from "../../../../../../../database/dbConnection.js";
import { quoteToBuy } from "../../../../../../scrapers/uniswap-v3-buy-price/libs/quote-buy.js";
import { quoteToSell } from "../../../../../../scrapers/uniswap-v3-sell-price/libs/quote-sell.js";
import stopLossAfternoons2_2 from "./stopLossAfternoons2_2.js";
import takeProfitAfternoons2_2 from "./takeProfitAfternoons2_2.js";

const buyAfternoons2_2 = async () => {

    try {

        const db = await connectDB();

        // Obtener el último registro de la tabla 2_2tardes_ballenas
        const [lastRow] = await db.query(`
            SELECT btc, usdt, ballenas, precio_compra, precio_venta 
            FROM 2_2tardes_ballenas 
            ORDER BY fecha DESC 
            LIMIT 2;
        `);

        if (!lastRow) {
            console.error("No hay registros previos en 2_2tardes_ballenas.");
            return;
        }

        const { btc } = lastRow[0]
        const { usdt, ballenas, precio_compra, precio_venta } = lastRow[1];
        // console.log("LAST ROW",lastRow)

        const buyPriceBtcUni = await quoteToBuy()
        // console.log("PRECIO WBTC",buyPriceBtcUni)

        const sellPriceBtcUni = await quoteToSell()
        // console.log("PRECIO VENTA WBTC",sellPriceBtcUni)

        const usdtToNumber = parseFloat(usdt)

        const btcItCanPurchase = parseFloat(await quoteToBuy(usdtToNumber))
        // console.log("CUANTOS BTC PODRIA COMPRAR", btcItCanPurchase)

        const previousWbtcAmount = parseFloat(btc);
        // console.log("WBTC PREVIOS: ", previousWbtcAmount)

        if (previousWbtcAmount * 1.02 < btcItCanPurchase && btcItCanPurchase < previousWbtcAmount * 3) {

            // console.log('take profit')
            await takeProfitAfternoons2_2(btcItCanPurchase, buyPriceBtcUni, sellPriceBtcUni);

        }

        if (previousWbtcAmount > btcItCanPurchase * 1.02) {

            console.log('stop loss')
            await stopLossAfternoons2_2(btcItCanPurchase, buyPriceBtcUni, sellPriceBtcUni);
        }
        // // Insertar la nueva compra
        // const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");
        // const accion = "BUY";

        // const query = `
        //     INSERT INTO 2_2tardes_ballenas (fecha, btc, usdt, accion, ballenas, precio_compra, precio_venta)
        //     VALUES (?, NULL, ?, ?, ?, ?, ?);
        // `;

        // await db.query(query, [fecha, btc, usdt, accion, ballenas, precio_compra, precio_venta]);

        // console.log("Compra registrada en 2_2tardes_ballenas:", { fecha, usdt, accion, ballenas, precio_compra, precio_venta });
    } catch (error) {
        console.error("Error intentando registrar compra en 2_2tardes_ballenas:", error);
    }
};

export default buyAfternoons2_2;
