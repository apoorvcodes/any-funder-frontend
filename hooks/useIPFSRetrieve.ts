import { useState } from 'react';

import axios from 'axios';

import type { UserSettings } from '../types';

export const useIPFSRetrieve = (hash: string) => {
  const [data, setData] = useState<UserSettings>();

  const retrieve = async () => {
    const { data } = await axios.get(`https://ipfs.io/ipfs/${hash}`);

    setData(data);
  };

  retrieve();

  return data;
};
