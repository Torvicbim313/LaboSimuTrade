import { FeeAmount } from '@uniswap/v3-sdk'
import { USDC_TOKEN, WETH_TOKEN } from './libs/constants.js'

// Inputs that configure this example to run


// Example Configuration

export const CurrentConfig = {
  rpc: {
    local: 'http://localhost:8545',
    mainnet: 'https://mainnet.infura.io/v3/0b7fd4c9a7f34ac4952db456ea63c79d',
  },
  tokens: {
    in: USDC_TOKEN,
    amountIn: 1,
    out: WETH_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
}
