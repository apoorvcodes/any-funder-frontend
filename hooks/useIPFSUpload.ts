import { ipfsStorage } from '../config';

import logo from '../public/img/logo.svg';

import type { UserSettings } from '../types';

export const useIPFSUpload = () => {
  return (settings: UserSettings) => {
    return ipfsStorage.store({
      name: settings.name,
      description: settings.description,
      // Unnecessary as it's not used
      image: new Blob([logo], { type: 'image/svg+xml' }),
    });
  };
};
