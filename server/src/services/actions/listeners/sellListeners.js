import { eventEmitter } from "../../../utils/eventEmitter.js";
import sellAfternoons2_2 from "../strategies/whales/highFrequency/equals/afternoons2_2/sellAfternoons2_2.js";
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

}

export default sellListeners;