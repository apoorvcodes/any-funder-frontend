import type { NextPage } from 'next';
import { WalletConnectComponent } from '../Components/WalletConnect';
const Home: NextPage = () => {
  return (
    <div>
      Funding app
      <WalletConnectComponent />
    </div>
  );
};

export default Home;
