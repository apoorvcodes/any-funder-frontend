import { ipfsStorage } from "../config";

import type { UserSettings } from "../types";

export const useIPFSUpload = (settings: UserSettings) => {
    return ipfsStorage.store({
        name: settings.name,
        description: settings.description,
        // Unnecessary as it's not used
        image: new Blob([""]),
    });
}
