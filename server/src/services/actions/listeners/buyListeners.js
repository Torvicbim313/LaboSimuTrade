import buyAfternoons2_2 from "../strategies/whales/highFrequency/equals/afternoons2_2/buyAfternoons2_2.js";
import buy2_2wEth from "../strategies/whales/wEth/equals/weth2_2/buy2_2wEth.js";
import buy2_2weth130 from "../strategies/whales/wEth/equals/weth2_2_130/buy2_2wEth130.js";
import buy3_3wEth from "../strategies/whales/wEth/equals/weth3_3/buy3_3wEth.js";
import buy3_3weth130 from "../strategies/whales/wEth/equals/weth3_3_130/buy3_3wEth130.js";
import buy12_3wEth from "../strategies/whales/wEth/multiplys/weth12_3/buy12_3wEth.js";
import buy12_4wEth from "../strategies/whales/wEth/multiplys/weth12_4/buy12_4wEth.js";
import buy13_3wEth from "../strategies/whales/wEth/multiplys/weth13_3/buy13_3wEth.js";
import buy13_4wEth from "../strategies/whales/wEth/multiplys/weth13_4/buy13_4wEth.js";
import buy6_2wEth from "../strategies/whales/wEth/multiplys/weth6_2/buy6_2wEth.js";
import buy6_3wEth from "../strategies/whales/wEth/multiplys/weth6_3/buy6_3wEth.js";
import buy9_2wEth from "../strategies/whales/wEth/multiplys/weth9_2/buy9_2wEth.js";
import buy9_3wEth from "../strategies/whales/wEth/multiplys/weth9_3/buy9_3wEth.js";
import buy9_4wEth from "../strategies/whales/wEth/multiplys/weth9_4/buy9_4wEth.js";
import isOperationInTable from "../utils/isOperationInTable.js";

const buyListeners = async () => {

    const isOperation2_2afternoonshigh = await isOperationInTable("2_2tardes_ballenas");
    console.log(isOperation2_2afternoonshigh)

    if (isOperation2_2afternoonshigh === 'SELL') await buyAfternoons2_2();



    const isOperation2_2wEth = await isOperationInTable("2_2weth");

    if (isOperation2_2wEth === 'SELL') await buy2_2wEth();



    const isOperation3_3wEth = await isOperationInTable("3_3weth");

    if (isOperation3_3wEth === 'SELL') await buy3_3wEth();
    


    const isOperation2_2wEth130 = await isOperationInTable("2_2weth130");

    if (isOperation2_2wEth130 === 'SELL') await buy2_2weth130();



    const isOperation3_3wEth130 = await isOperationInTable("3_3weth130");

    if (isOperation3_3wEth130 === 'SELL') await buy3_3weth130();



    const isOperation6_2wEth130 = await isOperationInTable("6_2weth");

    if (isOperation6_2wEth130 === 'SELL') await buy6_2wEth();



    const isOperation6_3wEth = await isOperationInTable("6_3weth");

    if (isOperation6_3wEth === 'SELL') await buy6_3wEth();



    const isOperation9_2wEth = await isOperationInTable("9_2weth");

    if (isOperation9_2wEth === 'SELL') await buy9_2wEth();


    const isOperation9_3wEth = await isOperationInTable("9_3weth");

    if (isOperation9_3wEth === 'SELL') await buy9_3wEth(); 


    const isOperation9_4wEth = await isOperationInTable("9_4weth");

    if (isOperation9_4wEth === 'SELL') await buy9_4wEth(); 



    const isOperation12_3wEth = await isOperationInTable("12_3weth");

    if (isOperation12_3wEth === 'SELL') await buy12_3wEth(); 



    const isOperation12_4wEth = await isOperationInTable("12_4weth");

    if (isOperation12_4wEth === 'SELL') await buy12_4wEth(); 



    const isOperation13_3wEth = await isOperationInTable("13_3weth");

    if (isOperation13_3wEth === 'SELL') await buy13_3wEth(); 


    const isOperation13_4wEth = await isOperationInTable("13_4weth");

    if (isOperation13_4wEth === 'SELL') await buy13_4wEth(); 



}

setInterval(buyListeners, 300000);

export default buyListeners;