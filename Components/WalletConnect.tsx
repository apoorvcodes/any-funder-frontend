import Link from 'next/link';

import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal
} from 'react';
import {
  useConnect,
  useDisconnect,
  useAccount,
  useBalance,
  useContractRead
} from 'wagmi';

import { REGISTRY_ABI, REGISTRY_URL } from '../config';

export const WalletConnectComponent = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div suppressHydrationWarning>
      {isConnected
        ? Connected({ disconnect, address })
        : NotConnected({ connect, connectors, isLoading, pendingConnector })}
    </div>
  );
};

function NotConnected({
  connect,
  connectors,
  isLoading,
  pendingConnector
}: any) {
  return (
    <div suppressHydrationWarning className="btn btn-primary">
      <div className="dropdown">
        <label tabIndex={0} className="m-1">
          Connect
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {connectors.map(
            (connector: {
              ready: any;
              id: Key | null | undefined;
              name:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
            }) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {isLoading &&
                  pendingConnector?.id === connector.id &&
                  ' (connecting)'}
              </button>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

function Connected({ disconnect, address }: any) {
  return (
    <div suppressHydrationWarning className="dropdown">
      <label tabIndex={0} className="btn btn-primary m-1">
        Options
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li onClick={() => disconnect()} className="">
          Disconnect
        </li>
        <li>
          <Link href={`/u/${address}`}>Profile</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
