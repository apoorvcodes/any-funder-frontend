import { etherscanBlockExplorers as wagmiBlockExplorers } from '@wagmi/core';

type BlockExplorer = { name: string; url: string };

export const etherscanBlockExplorers: Record<string, BlockExplorer> = {
  // Get the block explorers already in wagmi.
  ...wagmiBlockExplorers,

  // Avalanche
  avalanche: {
    name: 'Snowtrace',
    url: 'https://snowtrace.io'
  },
  avalancheFuji: {
    name: 'Snowtrace',
    url: 'https://testnet.snowtrace.io'
  },

  // Fantom
  fantom: {
    name: 'FTMScan',
    url: 'https://ftmscan.com/'
  },
  fantomTestnet: {
    name: 'FTMScan',
    url: 'https://testnet.ftmscan.com'
  },

  // Harmony
  harmony: {
    name: 'Harmony Block Explorer',
    url: 'https://explorer.harmony.one/'
  },
  harmonyTestnet: {
    name: 'Harmony Block Explorer',
    url: 'https://explorer.pops.one/'
  },

  // Aurora (Near EVM)
  aurora: {
    name: 'Aurora',
    url: 'https://aurorascan.dev'
  },
  auroraTestnet: {
    name: 'Aurora',
    url: 'https://testnet.aurorascan.dev'
  }
} as const;
