interface Currency {
  address: string;
  name: string;
  decimals: number;
}

export const USDC = {
  address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  name: 'USDC',
  decimals: 6
};

export const USDT = {
  address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  name: 'USDT',
  decimals: 6
};

export const DAI = {
  address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  name: 'DAI',
  decimals: 18
};

export const WMATIC = {
  address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  name: 'WMATIC',
  decimals: 18
};

export const MATIC = {
  address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'.toLowerCase(),
  name: 'MATIC',
  decimals: 18
};

export const allCurrencies: Currency[] = [USDC, USDT, DAI, WMATIC, MATIC];
