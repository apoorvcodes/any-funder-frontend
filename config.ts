import { NFTStorage } from 'nft.storage';

import data from './abi/AppRegistry.json';
import fundData from './abi/AnyFunder.json';

export const ipfsStorage = new NFTStorage({
  token: process.env.NEXT_PUBLIC_STORAGE_KEY!
});

export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!;

export const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL!;
export const REGISTRY_ABI = data.abi;
export const REGISTRY_BYTECODE = data.bytecode;

export const FUND_ABI = fundData.abi;
export const FUND_BYTECODE = fundData.bytecode;

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const WMATIC_ADDRESS = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
export const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
