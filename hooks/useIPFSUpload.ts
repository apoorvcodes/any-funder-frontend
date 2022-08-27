import { ipfsStorage } from '../config';

import type { UserSettings } from '../types';

export const useIPFSUpload = () => {
  return (settings: UserSettings) => {
    ipfsStorage.store({
      name: settings.name,
      description: settings.description,
      // Unnecessary as it's not used
      image: new Blob([''])
    });
  };
};
