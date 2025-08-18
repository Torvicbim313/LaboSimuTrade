import buyAfternoons2_2 from "../strategies/whales/highFrequency/equals/afternoons2_2/buyAfternoons2_2.js";
import buy2_2wEth from "../strategies/whales/wEth/equals/buy2_2wEth.js";
import isOperationInTable from "../utils/isOperationInTable.js";

const buyListeners = async () => {

    const isOperation2_2afternoonshigh = await isOperationInTable("2_2tardes_ballenas");
    console.log(isOperation2_2afternoonshigh)

    if (isOperation2_2afternoonshigh === 'SELL') await buyAfternoons2_2();

    const isOperation2_2wEth = await isOperationInTable("2_2weth");

    if (isOperation2_2wEth === 'SELL') await buy2_2wEth();
    


}

setInterval(buyListeners, 300000);

export default buyListeners;