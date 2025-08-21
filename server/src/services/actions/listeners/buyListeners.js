import buyAfternoons2_2 from "../strategies/whales/highFrequency/equals/afternoons2_2/buyAfternoons2_2.js";
import buy2_2wEth from "../strategies/whales/wEth/equals/weth2_2/buy2_2wEth.js";
import buy2_2weth130 from "../strategies/whales/wEth/equals/weth2_2_130/buy2_2wEth130.js";
import isOperationInTable from "../utils/isOperationInTable.js";

const buyListeners = async () => {

    const isOperation2_2afternoonshigh = await isOperationInTable("2_2tardes_ballenas");
    console.log(isOperation2_2afternoonshigh)

    if (isOperation2_2afternoonshigh === 'SELL') await buyAfternoons2_2();

    const isOperation2_2wEth = await isOperationInTable("2_2weth");

    if (isOperation2_2wEth === 'SELL') await buy2_2wEth();


    const isOperation2_2wEth130 = await isOperationInTable("2_2weth130");

    if (isOperation2_2wEth130 === 'SELL') await buy2_2weth130();



}

setInterval(buyListeners, 300000);

export default buyListeners;