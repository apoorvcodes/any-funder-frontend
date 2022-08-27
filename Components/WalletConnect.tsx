import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';
import { useConnect, useDisconnect, useAccount, useBalance } from 'wagmi';

export const WalletConnectComponent = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <div suppressHydrationWarning>
      {isConnected ?  <div></div> : Connected({ connect, connectors, isLoading, pendingConnector })}
        
      {isConnected ? <div>{formatAddress(address || "")}</div> : <div>Not connected</div>}
      {isConnected ? <div onClick={() => disconnect()}>disconnect</div> : <div></div>  }

    </div>
  );
};


 function formatAddress(address: string): string {

  return address.length < 4 + 4
    ? address
    : `${address.substring(0, 4)}\u2026${address.substring(
        address.length - 4
      )}`;
}


function Connected({ connect, connectors, isLoading, pendingConnector }: any) {
  return (
    <div className='btn btn-primary'>
       <div className="dropdown">
  <label tabIndex={0} className="m-1">Connect</label>
  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
  {connectors.map((connector: { ready: any; id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (
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
      ))}
  </ul>
</div>
</div>
)
}