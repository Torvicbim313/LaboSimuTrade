import { eventEmitter } from "../../../utils/eventEmitter.js";
import sellAfternoons2_2 from "../strategies/whales/highFrequency/equals/afternoons2_2/sellAfternoons2_2.js";
import sell2_2wEth from "../strategies/whales/wEth/equals/weth2_2/sell2_2wEth.js";
import sell2_2weth130 from "../strategies/whales/wEth/equals/weth2_2_130/sell2_2wEth130.js";
import sell3_3wEth from "../strategies/whales/wEth/equals/weth3_3/sell3_3wEth.js";
import sell3_3weth130 from "../strategies/whales/wEth/equals/weth3_3_130/sell3_3wEth130.js";
import sell12_3wEth from "../strategies/whales/wEth/multiplys/weth12_3/sell12_3wEth.js";
import sell12_4wEth from "../strategies/whales/wEth/multiplys/weth12_4/sell12_4wEth.js";
import sell13_3wEth from "../strategies/whales/wEth/multiplys/weth13_3/sell13_3wEth.js";
import sell13_4wEth from "../strategies/whales/wEth/multiplys/weth13_4/sell13_4wEth.js";
import sell6_2wEth from "../strategies/whales/wEth/multiplys/weth6_2/sell6_2wEth.js";
import sell6_3wEth from "../strategies/whales/wEth/multiplys/weth6_3/sell6_3wEth.js";
import sell9_2wEth from "../strategies/whales/wEth/multiplys/weth9_2/sell9_2wEth.js";
import sell9_3wEth from "../strategies/whales/wEth/multiplys/weth9_3/sell9_3wEth.js";
import sell9_4wEth from "../strategies/whales/wEth/multiplys/weth9_4/sell9_4wEth.js";
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

        const isOperation3_3Weth = await isOperationInTable("3_3weth");

        if (isOperation3_3Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 3_3weth!!! a: ', sellPrice)
            await sell3_3wEth();
        }

        const isOperation6_2Weth = await isOperationInTable("6_2weth");

        if (isOperation6_2Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 6_2weth!!! a: ', sellPrice)
            await sell6_2wEth();
        }

        const isOperation6_3Weth = await isOperationInTable("6_3weth");

        if (isOperation6_3Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 6_3weth!!! a: ', sellPrice)
            await sell6_3wEth();
        }

        const isOperation9_2Weth = await isOperationInTable("9_2weth");

        if (isOperation9_2Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 9_2weth!!! a: ', sellPrice)
            await sell9_2wEth();
        }

        const isOperation9_3Weth = await isOperationInTable("9_3weth");

        if (isOperation9_3Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 9_3weth!!! a: ', sellPrice)
            await sell9_3wEth();
        }

        const isOperation9_4Weth = await isOperationInTable("9_4weth");

        if (isOperation9_4Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 9_4weth!!! a: ', sellPrice)
            await sell9_4wEth();
        }

        const isOperation12_3Weth = await isOperationInTable("12_3weth");

        if (isOperation12_3Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 12_3weth!!! a: ', sellPrice)
            await sell12_3wEth();
        } 


        const isOperation12_4Weth = await isOperationInTable("12_4weth");

        if (isOperation12_4Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 12_4weth!!! a: ', sellPrice)
            await sell12_4wEth();
        } 


        const isOperation13_3Weth = await isOperationInTable("13_3weth");

        if (isOperation13_3Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 13_3weth!!! a: ', sellPrice)
            await sell13_3wEth();
        } 


        const isOperation13_4Weth = await isOperationInTable("13_4weth");

        if (isOperation13_4Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 13_4weth!!! a: ', sellPrice)
            await sell13_4wEth();
        } 


        
    })

    

    eventEmitter.on('highTradeSignalWeth130', async (sellPrice) => {
        console.log(`Se emitió un highTradeSignalWeth130 con sellPrice: ${sellPrice}`);

        const isOperation2_2Weth = await isOperationInTable("2_2weth130");

        if (isOperation2_2Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 2_2weth130!!! a: ', sellPrice);
           await sell2_2weth130();
        }

        const isOperation3_3Weth = await isOperationInTable("3_3weth130");

        if (isOperation3_3Weth === 'BUY') {
            console.log('LUZ VERDE PARA VENDER 3_3weth130!!! a: ', sellPrice);
           await sell3_3weth130();
        }
    })

}

export default sellListeners;
