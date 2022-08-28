import { Toaster } from 'react-hot-toast';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { chains as constChains } from '../constants/chains';
import { ALCHEMY_API_KEY } from '../config';

import '../styles/globals.css';

import type { AppProps } from 'next/app';

// Setup react-query client
const queryClient = new QueryClient();

// Setup the Client metadata
const clientMetadata = {
  name: 'Any funder',
  description: '<CHANGE ME>',
  url: '<CHANGE ME>',
  logo: '<CHANGE ME>',
  isDarkMode: true
};

const chainIdToRpcUrl = [
  constChains.mumbai.rpcUrls.default,
  constChains.polygon.rpcUrls.default
];

const { chains, provider, webSocketProvider } = configureChains(
  [constChains.mumbai, constChains.polygon],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider: provider,
  webSocketProvider: webSocketProvider,
  connectors: [
    new InjectedConnector({
      chains
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        rpc: chainIdToRpcUrl,
        clientMeta: {
          name: clientMetadata.name,
          description: clientMetadata.description,
          url: clientMetadata.url,
          icons: [clientMetadata.logo]
        }
      }
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: clientMetadata.name,
        appLogoUrl: clientMetadata.logo,
        darkMode: clientMetadata.isDarkMode
      }
    })
  ]
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen min-w-full bg-black">
      <Toaster position="top-right" reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
