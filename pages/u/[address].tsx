import { useRouter } from 'next/router';
import { useState } from 'react';
import { allCurrencies } from '../../constants/currency';
import { useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { toast } from 'react-hot-toast';

import { REGISTRY_ABI, REGISTRY_URL } from '../../config';
import { useIPFSRetrieve } from '../../hooks/useIPFSRetrieve';
import { MATIC } from '../../constants/currency';

import type { CallOverrides } from 'ethers';

const UserSettingsPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const [paymentCurrency, setPaymentCurrency] = useState<string>();
  const [paymentAmount, setPaymentAmount] = useState<number>();
  const [message, setMessage] = useState<string>('');

  const { data: settingsData } = useContractRead({
    addressOrName: REGISTRY_URL,
    contractInterface: REGISTRY_ABI,
    functionName: 'getSettings',
    args: address
  });

  // Write hook for payment
  
  // msg.value override if the currency is native
  const overrides: CallOverrides = {};

  if (paymentCurrency === MATIC.address) {
    overrides.value = paymentAmount;
  }

  const { config: paymentConfig } = usePrepareContractWrite({
    addressOrName: REGISTRY_URL,
    contractInterface: REGISTRY_ABI,
    functionName: 'setSettings',
    args: [paymentCurrency, paymentAmount, message],
    enabled: paymentCurrency !== null && paymentAmount !== null && message !== null,
    overrides: overrides
  });

  const { write: paymentWrite } = useContractWrite(paymentConfig);

  const { data: retrievedData } = useIPFSRetrieve(
    settingsData as unknown as string
  );

  // Handle no retrieved data (ie, No user registered). Redirect to setup or display a modal?
  if (!retrievedData) {
    // Do something as intended
  }

  return (
    <div className="bg-black pt-12 pb-12 flex flex-col space-y-18 justify-center items-center min-h-screen">
      <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div className="w-full text-center mt-20"></div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {retrievedData?.name}
            </h3>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  {retrievedData?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            value={paymentAmount}
            onChange={e => setPaymentAmount(Number(e.target.value))}
            type="text"
            placeholder="Payment amount"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            required={true}
          />
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            type="text"
            placeholder="Message"
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
                      setPaymentCurrency(currency.address);
                    }}
                  >
                    {currency.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => {
           
            }}
            className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
          >
            Pay
          </button>
        </div>
        <div className="text-center mt-6">
         
        </div>
      </div>
      <div className="w-40 h-40 absolute bg-purple-700 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-purple-700 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
};

export default UserSettingsPage;
