import Router from 'next/router';
import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

import { REGISTRY_URL, REGISTRY_ABI } from '../config';

// MATIC, WMATIC, USDT, USDC, DAI
const SettingsPage = () => {
  const [username, setUsername] = useState<string>();
  const [bio, setBio] = useState<string>();

  const [token, seToken] = useState<string>();

  const [recieve, setRecieve] = useState<string>();

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

  // Write hooks

  //   if (!isConnected) {
  //     Router.push('/');
  //   }

  //   if (!contractData) {
  //     // Deploy contract with the specified setttings, and dispkay "no cointract yet"
  //     // Add to registry
  //   }

  //   if (!settingsData) {
  //     // Get inout for settings
  //     // Add to registry
  //   }
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="absolute w-60 h-60 rounded-xl bg-purple-700 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-purple-700 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 className="text-3xl text-black font-bold text-center mb-4 cursor-pointer">
            Create An Account
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            Create an account to enjoy all the services without any ads for
            free!
          </p>
        </div>
        <div className="space-y-4">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            value={bio}
            onChange={e => setBio(e.target.value)}
            type="text"
            placeholder="Bio"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            value={recieve}
            onChange={e => setRecieve(e.target.value)}
            type="text"
            placeholder="Address"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 btn-primary">
              Token
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  onClick={() => {
                    seToken('Matic');
                  }}
                >
                  Matic
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    seToken('USDC');
                  }}
                >
                  USDC
                </a>
              </li>
              <li
                onClick={() => {
                  seToken('Matic');
                }}
              >
                <a>Matic</a>
              </li>
            </ul>
            <div className="block text-sm py-3 px-4  w-full outline-none">
              {token || 'Set Token'}
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => {
              console.log(username, bio);
            }}
            className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
          >
            Create Account
          </button>
        </div>
      </div>
      <div className="w-40 h-40 absolute bg-purple-700 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-purple-700 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
};

export default SettingsPage;
