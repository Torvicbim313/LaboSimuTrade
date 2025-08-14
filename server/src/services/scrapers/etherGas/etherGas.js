import pkg from "ethers";
import { getProvider } from "../uniswap-v3-buy-price/libs/providers.js";

const { utils } = pkg;
const { formatUnits } = utils;

const provider = getProvider();

const showGasPrice =  async () => {
  const gasPrice = await provider.getGasPrice(); // Precio en wei
  console.log("Gas price (wei):", gasPrice.toString());
  console.log("Gas price (gwei):", formatUnits(gasPrice, "gwei"));
}


export default showGasPrice;