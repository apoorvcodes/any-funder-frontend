import { chain as wagmiChains, Chain as WagmiChain } from 'wagmi';

import { etherscanBlockExplorers } from './blockExplorers';

export const chains: Record<string, WagmiChain> = {
  // Ethereum
  mainnet: wagmiChains.mainnet,
  rinkeby: wagmiChains.rinkeby,

  // Polygon
  polygon: wagmiChains.polygon,
  mumbai: wagmiChains.polygonMumbai,

  // Avalanche
  avalanche: {
    id: 43_114,
    name: 'Avalanche Mainnet',
    network: 'avalanche',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: { default: 'https://api.avax.network/ext/bc/C/rpc' },
    blockExplorers: {
      default: etherscanBlockExplorers.avalanche,
      etherscan: etherscanBlockExplorers.avalanche
    },
    testnet: false
  },
  avalancheFuji: {
    id: 43_113,
    name: 'Avalanche Fuji Testnet',
    network: 'avalanche-fuji',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: { default: 'https://api.avax-test.network/ext/bc/C/rpc' },
    blockExplorers: {
      default: etherscanBlockExplorers.avalancheFuji,
      etherscan: etherscanBlockExplorers.avalancheFuji
    },
    testnet: true
  },

  // Fantom
  fantom: {
    id: 250,
    name: 'Fantom Opera',
    network: 'fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: { default: 'https://rpc.ftm.tools' },
    blockExplorers: {
      default: etherscanBlockExplorers.fantom,
      etherscan: etherscanBlockExplorers.fantom
    },
    testnet: false
  },
  fantomTestnet: {
    id: 4002,
    name: 'Fantom Testnet',
    network: 'fantom-testnet',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18
    },
    rpcUrls: { default: 'https://rpc.testnet.fantom.network' },
    blockExplorers: {
      default: etherscanBlockExplorers.fantomTestnet,
      etherscan: etherscanBlockExplorers.fantomTestnet
    },
    testnet: true
  },

  // Harmony
  harmony: {
    id: 1_666_600_000,
    name: 'Harmony',
    network: 'harmony',
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18
    },
    rpcUrls: { default: 'https://api.harmony.one' },
    blockExplorers: {
      default: etherscanBlockExplorers.harmony,
      etherscan: etherscanBlockExplorers.harmony
    },
    testnet: false
  },
  harmonyTestnet: {
    id: 1_666_700_000,
    name: 'Harmony Testnet',
    network: 'harmony-testnet',
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18
    },
    rpcUrls: { default: 'https://api.s0.pops.one' },
    blockExplorers: {
      default: etherscanBlockExplorers.harmonyTestnet,
      etherscan: etherscanBlockExplorers.harmonyTestnet
    },
    testnet: true
  },

  // Aurora (Near EVM)
  aurora: {
    id: 1_313_161_554,
    name: 'Aurora Mainnet',
    network: 'aurora',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: { default: 'https://mainnet.aurora.dev' },
    blockExplorers: {
      default: etherscanBlockExplorers.aurora,
      etherscan: etherscanBlockExplorers.aurora
    },
    testnet: false
  },
  auroraTestnet: {
    id: 1_313_161_555,
    name: 'Aurora Testnet',
    network: 'aurora-testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: { default: 'https://testnet.aurora.dev' },
    blockExplorers: {
      default: etherscanBlockExplorers.auroraTestnet,
      etherscan: etherscanBlockExplorers.auroraTestnet
    },
    testnet: true
  },

  // Hardhat
  hardhat: wagmiChains.hardhat
};

// Create list of supported chains from the object.
export const baseSupportedChains = Object.values(chains);

// Alias `WagmiChain` type internally and create type for chains supported.
export type Chain = WagmiChain;
export type SupportedChain = typeof baseSupportedChains[number]['id'] | Chain;
