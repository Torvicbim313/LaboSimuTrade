import { eventEmitter } from "../../../utils/eventEmitter.js";
import sellAfternoons2_2 from "../strategies/whales/highFrequency/equals/afternoons2_2/sellAfternoons2_2.js";
import sell2_2wEth from "../strategies/whales/wEth/equals/sell2_2wEth.js";
import isOperationInTable from "../utils/isOperationInTable.js";


const sellListeners = async () => {

    eventEmitter.on('highTradeSignal', async (sellPrice) => {
        console.log(`Se emitió un highTradeSignal con sellPrice: ${sellPrice}`);

        const isOperation2_2afternoonshigh = await isOperationInTable("2_2tardes_ballenas");

        if (isOperation2_2afternoonshigh === 'BUY') {
            console.log('LUZ VERDE PARA VENDER!!! a: ', sellPrice)
            await sellAfternoons2_2();
        }
    })

    eventEmitter.on('highTradeSignalWeth', async (sellPrice) => {
        console.log(`Se emitió un highTradeSignalWeth con sellPrice: ${sellPrice}`);

        const isOperation2_2Weth = await isOperationInTable("2_2weth");

        if (isOperation2_2Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 2_2weth!!! a: ', sellPrice)
            await sell2_2wEth();
        }
    })

        eventEmitter.on('highTradeSignalWeth130', async (sellPrice) => {
        console.log(`Se emitió un highTradeSignalWeth130 con sellPrice: ${sellPrice}`);

        const isOperation2_2Weth = await isOperationInTable("2_2weth130");

        if (isOperation2_2Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 2_2weth130!!! a: ', sellPrice);
        //    await sell2_2wEth();
        }
    })

}

export default sellListeners;