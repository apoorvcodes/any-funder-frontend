import Image from 'next/image';

import { WalletConnectComponent } from '../Components/WalletConnect';

export function Navbar() {
  return (
    <div className="flex justify-between flex-row pl-24 pr-24 pt-8">
      <Image src={require('../public/img/logo.svg')} width={100} height={40} />
      <WalletConnectComponent />
    </div>
  );
}
