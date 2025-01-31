import { ethers } from 'ethers';
import { CurrentConfig } from '../config.js';
import { computePoolAddress } from '@uniswap/v3-sdk';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json' assert { type: 'json' };
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json' assert { type: 'json' };
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
} from './constants.js';
import { getProvider } from './providers.js';
import { toReadableAmount, fromReadableAmount } from './conversion.js';

export async function quoteToBuy(customAmountIn = null) {
  const provider = getProvider();
  
  // Verifica la dirección del contrato Quoter
  let quoterContract;
  try {
    quoterContract = new ethers.Contract(
      QUOTER_CONTRACT_ADDRESS,
      Quoter.abi,
      provider
    );
  } catch (error) {
    console.error('Error creating Quoter contract:', error);
    throw error; // Lanza el error para que sea manejado más adelante
  }

  const poolConstants = await getPoolConstants();

  // Si no se pasa un valor de USDC, calculamos cuánto USDC necesitamos para obtener 1 WBTC
  if (customAmountIn === null) {
    const amountIn = fromReadableAmount(1, CurrentConfig.tokens.out.decimals).toString(); // 1 WBTC

    try {
      // Calculamos cuántos USDC necesitamos para obtener 1 WBTC
      const quotedAmountOut = await quoterContract.callStatic.quoteExactOutputSingle(
        poolConstants.token1, // WBTC (token de salida)
        poolConstants.token0, // USDC (token de entrada)
        poolConstants.fee,
        amountIn, // 1 WBTC
        0 // No necesitas un límite mínimo de la cantidad
      );
      console.log(`\x1b[33mCantidad de USDC necesaria para comprar 1 WBTC:`,"\x1b[32m", toReadableAmount(quotedAmountOut, CurrentConfig.tokens.in.decimals),"\x1b[0m");
      return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.in.decimals);
    } catch (error) {
      console.error('Error in quoteExactOutputSingle for USDC amount:', error);
      throw error; // Lanza el error para que sea manejado más adelante
    }
  } else {
    // Si se pasa un valor de USDC, calculamos cuántos WBTC podemos obtener con ese valor
    const amountIn = fromReadableAmount(customAmountIn, CurrentConfig.tokens.in.decimals).toString();

    try {
      // Calculamos cuántos WBTC se pueden obtener con los USDC proporcionados
      const quotedAmountOut = await quoterContract.callStatic.quoteExactOutputSingle(
        poolConstants.token0, // USDC (token de entrada)
        poolConstants.token1, // WBTC (token de salida)
        poolConstants.fee,
        amountIn, // USDC proporcionados
        0 // No necesitas un límite mínimo de la cantidad
      );
      console.log(`Cantidad de WBTC que puedes comprar con ${customAmountIn} USDC:`, toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals));
      return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals);
    } catch (error) {
      console.error('Error in quoteExactInputSingle for WBTC amount:', error);
      throw error; // Lanza el error para que sea manejado más adelante
    }
  }
}





 async function getPoolConstants() {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  });

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
  );

  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  return {
    token0,
    token1,
    fee,
  };
}
