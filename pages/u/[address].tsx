import { useRouter } from 'next/router';

import { useContractRead } from 'wagmi';

import { REGISTRY_ABI, REGISTRY_URL } from '../../config';

const UserSettingsPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { data: settingsData } = useContractRead({
    addressOrName: REGISTRY_URL,
    contractInterface: REGISTRY_ABI,
    functionName: 'getSettings',
    args: address
  });

  console.log(settingsData);

  return <div>User: {address}</div>;
};

export default UserSettingsPage;
