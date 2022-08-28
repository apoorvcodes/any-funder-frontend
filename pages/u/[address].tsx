import { useRouter } from 'next/router';
import { useState } from 'react';

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
    <div className="bg-black flex justify-center items-center min-h-screen">
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
                <a
                  href="javascript:;"
                  className="btn btn-primary font-normal text-white hover:text-slate-400"
                >
                  Sponsor!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
