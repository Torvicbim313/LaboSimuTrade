import pool from "../../../../../../../database/dbConnection.js";
import { getProvider } from "../../../../../../scrapers/ethPrices/uniswap-eth-buy-price/libs/providers.js";
import { quoteToBuyWeth } from "../../../../../../scrapers/ethPrices/uniswap-eth-buy-price/libs/quote-buy.js";
import { quoteToSellWeth } from "../../../../../../scrapers/ethPrices/uniswap-eth-sell-price/libs/quote-sell.js";
import stopLoss13_4wEth from "./stopLoss13_4wEth.js";
import takeProfit13_4wEth from "./takeProfit13_4wEth.js";
import pkg from "ethers";



const { utils } = pkg;
const { formatUnits } = utils;

const provider = getProvider();

const buy13_4wEth = async () => {

    const db = await pool.getConnection();;
    try {


        // Obtener el último registro de la tabla 13_4tardes_ballenas
        const [lastRow] = await db.query(`
            SELECT eth_amount, usdc, ballenas, precio_compra, precio_venta 
            FROM 13_4weth 
            ORDER BY fecha DESC 
            LIMIT 2;
        `);

        if (!lastRow) {
            console.error("No hay registros previos en 13_4weth.");
            return;
        }

        const { eth_amount } = lastRow[1]
        const { usdc, ballenas, precio_compra, precio_venta } = lastRow[0];
        console.log("LAST ROW",lastRow)

        const buyPriceethUni = await quoteToBuyWeth()
        console.log("PRECIO Weth",buyPriceethUni)

        const sellPriceethUni = await quoteToSellWeth()
        console.log("PRECIO VENTA Weth",sellPriceethUni)

        const usdcToNumber = parseFloat(usdc); // Convertimos a número primero
        const usdcRounded = parseFloat(usdcToNumber.toFixed(6));
        console.log("QUE VALOR???", usdcToNumber)

        // --- Cálculo del gas ---
        // 1. Gas en ETH
        const gasLimit = 150000;
        const gasPrice = await provider.getGasPrice();
        const gasCostEth = Number(formatUnits((BigInt(gasPrice.toString()) * BigInt(gasLimit)).toString(), "ether"));

        // 2. Precio de ETH en USDC
        const ethPriceUsdc = parseFloat(await quoteToSellWeth());

        // 4. Precio de WETH en USDC (lo mismo que ETH pero vía Uniswap)
        const wethBuyPriceUsdc = parseFloat(await quoteToBuyWeth());

        // 4. Gas en WETH
        const gasCostUsdc = gasCostEth * ethPriceUsdc;
        const gasCostWeth = gasCostUsdc / wethBuyPriceUsdc;

        // --- Cálculo de la compra neta ---
        // Swap normal de USDC → WETH, aplicando comisión del 0.3% (0.997)
        const wethFromSwap = parseFloat(await quoteToBuyWeth(usdcRounded)) * 0.997;

        // Restar gas al resultado (en WETH)
        const ethItCanPurchase = wethFromSwap - gasCostWeth;

        console.log("CUANTOS eth PODRIA COMPRAR (con comisión y gas)", ethItCanPurchase)

        const previousWethToNumber = parseFloat(eth_amount);
        const previousWethAmount = parseFloat(previousWethToNumber.toFixed(6));
        console.log("Weth PREVIOS: ", previousWethAmount)

        const green = "\x1b[32m";
        const red = "\x1b[31m";
        const reset = "\x1b[0m";
        
        const currentRatio = ((ethItCanPurchase - previousWethAmount) / previousWethAmount) * 100;
        const color = currentRatio >= 0 ? green : red;

        console.log(`EL PORCENTAJE ACUTAL ES DE: ${color}${currentRatio} %${reset}`)

        if (previousWethAmount * 1.13 < ethItCanPurchase && ethItCanPurchase < previousWethAmount * 3) {

            // console.log('take profit')
            await takeProfit13_4wEth(ethItCanPurchase, buyPriceethUni, sellPriceethUni);

        }

        if (previousWethAmount > ethItCanPurchase * 1.04) {

            console.log('stop loss')
            await stopLoss13_4wEth(ethItCanPurchase, buyPriceethUni, sellPriceethUni);
        }
        // // Insertar la nueva compra
        // const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");
        // const accion = "BUY";

        // const query = `
        //     INSERT INTO 13_4tardes_ballenas (fecha, eth, usdc, accion, ballenas, precio_compra, precio_venta)
        //     VALUES (?, NULL, ?, ?, ?, ?, ?);
        // `;

        // await db.query(query, [fecha, eth, usdc, accion, ballenas, precio_compra, precio_venta]);

        // console.log("Compra registrada en 13_4tardes_ballenas:", { fecha, usdc, accion, ballenas, precio_compra, precio_venta });
    } catch (error) {
        console.error("Error intentando registrar compra en 13_4weth:", error);
    } finally {
        db.release();  // IMPORTANTE: liberar la conexión después de usarla
    }
};


export default buy13_4wEth;
