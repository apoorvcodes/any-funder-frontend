import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite
} from 'wagmi';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import {
  REGISTRY_URL,
  REGISTRY_ABI,
  ZERO_ADDRESS,
  WMATIC_ADDRESS,
  SWAP_ROUTER_ADDRESS,
  FUND_ABI
} from '../config';
import { usePrevious } from '../hooks/usePrevious';
import { useIPFSUpload } from '../hooks/useIPFSUpload';
import { useIPFSRetrieve } from '../hooks/useIPFSRetrieve';
import { useDeployContract } from '../hooks/useDeployContract';
import { allCurrencies } from '../constants/currency';

const SettingsPage = () => {
  const router = useRouter();

  const [ipfsURI, setIPFSURI] = useState<string>();

  const [token, setToken] = useState<string>();
  const [tokenName, setTokenName] = useState<string>();
  const [receiverAddress, setReceiverAddress] = useState<string>();
  const [deployedContractAddress, setDeployedContractAddress] = useState<string>();

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

  // Write hooks (Settings)
  const { config: settingsConfig } = usePrepareContractWrite({
    addressOrName: REGISTRY_URL,
    contractInterface: REGISTRY_ABI,
    functionName: 'setSettings',
    args: [address, ipfsURI],
    enabled: ipfsURI !== null
  });

  const { write: settingsWrite } = useContractWrite(settingsConfig);

  // Write hooks (Contract linking)
  const { config: contractConfig } = usePrepareContractWrite({
    addressOrName: REGISTRY_URL,
    contractInterface: REGISTRY_ABI,
    functionName: 'addDeployment',
    args: [address, deployedContractAddress]
  });

  const { write: contractWrite} = useContractWrite(contractConfig);

  // Write + Read hooks for fund withdraw (if present, validate before performing transaction)

  // Reads hook for displaying the payment stats inside a infinite scroll modal (if contract exists)
  const { config: paymentHistory } = usePrepareContractWrite({
    addressOrName: deployedContractAddress!,
    contractInterface: FUND_ABI,
    functionName: 'paymentsHistory'
  });
  const { config: totalPayment } = usePrepareContractWrite({
    addressOrName: deployedContractAddress!,
    contractInterface: FUND_ABI,
    functionName: 'totalPaymentReceived'
  });

  const deploy = useDeployContract();
  const deployMutation = useMutation(deploy, {
    onSuccess: (data) => {
      setDeployedContractAddress(data);
    }
  });

  // Other hooks
  const { data: retrievedData } = useIPFSRetrieve(
    settingsData as unknown as string
  );

  const [username, setUsername] = useState<string | undefined>(
    retrievedData?.name
  );
  const [bio, setBio] = useState<string | undefined>(
    retrievedData?.description
  );

  const prevUsername = usePrevious(username);
  const prevBio = usePrevious(bio);

  // Attribute decisions
  const settingsModifyType =
    !username || !bio || !settingsData ? 'create' : 'update';
  const contractModifyType =
    !contractData || (contractData as unknown as string) == ZERO_ADDRESS
      ? 'deploy'
      : 're-deploy';

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected]);

  const uploadToIPFS = async () => {
    const uploader = useIPFSUpload();

    if (prevUsername === username && prevBio === bio) {
      return;
    }

    const { url } = await uploader({
      name: username || '',
      description: bio || ''
    });

    setIPFSURI(url);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="absolute w-60 h-60 rounded-xl bg-purple-700 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-purple-700 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl text-black font-bold text-center mb-4 cursor-pointer">
            Account profile settings
          </h1>
        </div>
        <div className="space-y-4">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            required={true}
          />
          <input
            value={bio}
            onChange={e => setBio(e.target.value)}
            type="text"
            placeholder="Bio"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            required={true}
          />
          <input
            value={receiverAddress}
            onChange={e => setReceiverAddress(e.target.value)}
            type="text"
            placeholder="Receiver Address"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            required={true}
          />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 btn-primary">
              Token
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {allCurrencies.map(currency => (
                <li key={currency.name}>
                  <a
                    onClick={() => {
                      setToken(currency.address);
                      setTokenName(currency.name);
                    }}
                  >
                    {currency.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="block text-sm py-3 px-4  w-full outline-none">
              {tokenName || 'Set Token'}
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => {
              console.log(username, bio);

              uploadToIPFS();
              console.log(ipfsURI);

              settingsWrite?.();
            }}
            className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
          >
            {settingsModifyType} settings
          </button>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => {
              const receiver = receiverAddress || ZERO_ADDRESS;

              deployMutation.mutate([
                receiver, // Payment receiver, can be address zero
                token, // Currency to receive payment in
                WMATIC_ADDRESS,
                SWAP_ROUTER_ADDRESS
              ]);

              contractWrite?.();
            }}
            className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
          >
            {contractModifyType} contract
          </button>
        </div>
      </div>
      <div className="w-40 h-40 absolute bg-purple-700 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-purple-700 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
};

export default SettingsPage;
