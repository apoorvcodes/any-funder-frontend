import { usePrepareContractWrite, useContractWrite } from 'wagmi';

import { REGISTRY_ABI, REGISTRY_URL } from '../config';

export const usePrepareContractWriter = () => {
    usePrepareContractWrite({
        addressOrName: REGISTRY_URL,
        contractInterface: REGISTRY_ABI,
        functionName: 'setSettings',
        args: ipfsURI
      });

  // Return a callback of the prepared contract write function
  return (ipfsURI: string) => {
    return 
  };
};

export const useContractWriter = () => {
  return (config: any) => {
    return useContractWrite(config);
  };
};
