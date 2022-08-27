import Router from "next/router";

import { useAccount, useContractRead } from "wagmi";

import { REGISTRY_URL } from "../config";

export const SettingsPage = () => {
    const { isConnected } = useAccount();
    const { data: contractData } = useContractRead(REGISTRY_URL, "getDeployment",);

    if (!isConnected) {
        Router.push("/");
    }
};
