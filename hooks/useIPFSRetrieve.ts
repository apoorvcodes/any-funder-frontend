import { useState } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useIPFSRetrieve = (hash: string) => {
  const query = useQuery(['ipfs-retrieve'], async () => {
    const { data } = await axios.get(
      hash.replace('ipfs://', 'https://infura-ipfs.io/ipfs/')
    );

    return data;
  });

  return query;
};
