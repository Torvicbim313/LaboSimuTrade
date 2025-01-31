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

export async function quoteToSell() {
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

  // Verificar parámetros
  const amountIn = fromReadableAmount(
    CurrentConfig.tokens.amountIn,
    CurrentConfig.tokens.in.decimals
  ).toString();
  

  try {
    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
      poolConstants.token0,
      poolConstants.token1,
      poolConstants.fee,
      amountIn,
      0
    );
    console.log('\x1b[33m1 WBTC/USDC en UNISWAP:',"\x1b[32m", toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals),"\x1b[0m");

    return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals);
  } catch (error) {
    console.error('Error in quoteExactInputSingle:', error);
    throw error; // Lanza el error para que sea manejado más adelante
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
