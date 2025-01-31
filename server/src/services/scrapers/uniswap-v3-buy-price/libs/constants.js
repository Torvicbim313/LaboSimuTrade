// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

import pkg from '@uniswap/sdk-core';
const { Token } = pkg; // Importa solo Token si SupportedChainId no está disponible
const SupportedChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  ARBITRUM_ONE: 42161,
  ARBITRUM_RINKEBY: 421611,
  OPTIMISM: 10,
  OPTIMISM_GOERLI: 420,
  POLYGON: 137,
  POLYGON_MUMBAI: 80001,
  CELO: 42220,
  CELO_ALFAJORES: 44787
};
// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const QUOTER_CONTRACT_ADDRESS =
  '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'

// Currencies and Tokens

export const WETH_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
)

export const USDC_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  6,
  'USDC',
  'USD//C'
)

export const WBTC_TOKEN = new Token(
  SupportedChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
)
