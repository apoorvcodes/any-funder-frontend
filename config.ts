import { NFTStorage } from "nft.storage";

export const ipfsStorage = new NFTStorage({ token: process.env.NEXT_PUBLIC_STORAGE_KEY! });

export const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL!;
export const REGISTRY_ABI = 

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
