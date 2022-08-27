import { useState } from 'react';

import axios from 'axios';

import type { UserSettings } from '../types';

export const useIPFSRetrieve = (hash: string) => {
  const [data, setData] = useState<UserSettings>();

  // Pre-mature return.
  if (!hash) return;

  const retrieve = async () => {
    const { data } = await axios.get(
      hash.replace('ipfs://', 'https://infura-ipfs.io/ipfs/')
    );

    setData(data);
  };

  retrieve();

  return data;
};
