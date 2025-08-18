import pool from "../../../../../../../database/dbConnection.js";
import { quoteToSellWeth } from "../../../../../../scrapers/ethPrices/uniswap-eth-sell-price/libs/quote-sell.js";
import { getProvider } from "../../../../../../scrapers/uniswap-v3-buy-price/libs/providers.js";
import { quoteToBuy } from "../../../../../../scrapers/uniswap-v3-buy-price/libs/quote-buy.js";
import { quoteToSell } from "../../../../../../scrapers/uniswap-v3-sell-price/libs/quote-sell.js";
import stopLossAfternoons2_2 from "./stopLossAfternoons2_2.js";
import takeProfitAfternoons2_2 from "./takeProfitAfternoons2_2.js";
import pkg from "ethers";


const { utils } = pkg;
const { formatUnits } = utils;

const provider = getProvider();

const buyAfternoons2_2 = async () => {

    const db = await pool.getConnection();;
    try {


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

        const { btc } = lastRow[1]
        const { usdt, ballenas, precio_compra, precio_venta } = lastRow[0];
        console.log("LAST ROW",lastRow)

        const buyPriceBtcUni = await quoteToBuy()
        console.log("PRECIO WBTC",buyPriceBtcUni)

        const sellPriceBtcUni = await quoteToSell()
        console.log("PRECIO VENTA WBTC",sellPriceBtcUni)

        const usdtToNumber = parseFloat(usdt); // Convertimos a número primero
        const usdtRounded = parseFloat(usdtToNumber.toFixed(6));
        console.log("QUE VALOR???", usdtToNumber)

        // --- Cálculo del gas ---
        // 1. Calcula el coste del gas en ETH
        const gasLimit = 150000;
        const gasPrice = await provider.getGasPrice();
        const gasCostEth = Number(formatUnits((BigInt(gasPrice.toString()) * BigInt(gasLimit)).toString(), "ether"));

        // 2. Convierte el gas a USDC
        const ethPriceUsdc = parseFloat(await quoteToSellWeth()); // Debes tener esta función
        const gasCostUsdc = gasCostEth * ethPriceUsdc;

        // 3. Convierte el gas en USDC a WBTC
        const wbtcBuyPriceUsdc = parseFloat(await quoteToBuy()); // Precio de compra de WBTC en USDC
        const gasCostWbtc = gasCostUsdc / wbtcBuyPriceUsdc;

        // 4. Aplica el descuento en el cálculo final
        const btcItCanPurchase = parseFloat(await quoteToBuy(usdtRounded)) * 0.997 - gasCostWbtc;
        console.log("CUANTOS BTC PODRIA COMPRAR (con comisión y gas)", btcItCanPurchase)

        const previousWbtcToNumber = parseFloat(btc);
        const previousWbtcAmount = parseFloat(previousWbtcToNumber.toFixed(6));
        console.log("WBTC PREVIOS: ", previousWbtcAmount)

        const green = "\x1b[32m";
        const red = "\x1b[31m";
        const reset = "\x1b[0m";
        
        const currentRatio = ((btcItCanPurchase - previousWbtcAmount) / previousWbtcAmount) * 100;
        const color = currentRatio >= 0 ? green : red;

        console.log(`EL PORCENTAJE ACUTAL ES DE: ${color}${currentRatio} %${reset}`)

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
    } finally {
        db.release();  // IMPORTANTE: liberar la conexión después de usarla
    }
};

export default buyAfternoons2_2;
