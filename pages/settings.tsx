import Router from 'next/router';

import { useAccount, useContractRead } from 'wagmi';

import { REGISTRY_URL, REGISTRY_ABI } from '../config';

// MATIC, WMATIC, USDT, USDC, DAI

export const SettingsPage = () => {
  const { address, isConnected } = useAccount();

  // Read hooks
  const { data: contractData } = useContractRead({
    addressOrName: REGISTRY_URL,
    contractInterface: REGISTRY_ABI,
    functionName: 'getDeployment',
    args: address
  });
  const { data: settingsData } = useContractRead({
    addressOrName: REGISTRY_URL,
    contractInterface: REGISTRY_ABI,
    functionName: 'getSettings',
    args: address
  });

  // Write hooks

  if (!isConnected) {
    Router.push('/');
  }

  if (!contractData) {
    // Deploy contract with the specified setttings, and dispkay "no cointract yet"
    // Add to registry
  }

  if (!settingsData) {
    // Get inout for settings
    // Add to registry
  }
  
};
