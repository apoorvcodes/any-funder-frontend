import { ContractFactory } from 'ethers';
import { useSigner } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

import { FUND_ABI, FUND_BYTECODE } from '../config';

import type { Signer } from 'ethers';

export const useDeployContract = () => {
  const { data: signer } = useSigner();

  const factory = new ContractFactory(FUND_ABI, FUND_BYTECODE).connect(
    signer as Signer
  );

  const deploy = async (args: any[]) => {
    const tx = await factory.deploy(...args);

    await tx.deployed();

    return tx.address;
  };

  return deploy;
};
