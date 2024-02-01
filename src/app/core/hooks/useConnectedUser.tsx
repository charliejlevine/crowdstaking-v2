import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount } from "wagmi";
import type { Chain } from "viem";

import config, { type ChainConfiguration } from "@/chainConfig";

export type TUserLoading = { status: "LOADING" };
export type TUserNotConnected = { status: "NOT_CONNECTED" };
export type TUserConnected = {
  status: "CONNECTED";
  address: `0x${string}`;
  config: ChainConfiguration;
  chain: Chain;
};
export type TUnsupportedChain = {
  status: "UNSUPPORTED_CHAIN";
  address: `0x${string}`;
  chain: Chain;
};

export type TConnectedUserState =
  | TUserLoading
  | TUserNotConnected
  | TUserConnected
  | TUnsupportedChain;

const ConnectedUserContext = createContext<{
  user: TConnectedUserState;
}>({ user: { status: "LOADING" } });

interface IConnectedUserProviderProps {
  children: ReactNode;
}

function ConnectedUserProvider({ children }: IConnectedUserProviderProps) {
  const [user, setUser] = useState<TConnectedUserState>({ status: "LOADING" });
  const {
    isConnected,
    connector: activeConnector,
    address: accountAddress,
    status,
    chain: activeChain,
  } = useAccount();

  useEffect(() => {
    /*
      TODO

      Here configuration can be null if the user isn't connected to a supported chain, or if there is some sort of problem getting the config for a supported chain.

      We need to catch when it is a problem in app code rather than justs a user being connected to an unsupported chain.
    */

    const configuration =
      activeChain?.id && config[activeChain.id] ? config[activeChain.id] : null;

    if (activeConnector && activeChain && accountAddress && isConnected) {
      setUser(
        configuration
          ? {
              status: "CONNECTED",
              address: accountAddress,
              config: configuration,
              chain: activeChain,
            }
          : {
              status: "UNSUPPORTED_CHAIN",
              address: accountAddress,
              chain: activeChain,
            }
      );
    } else if (status === "disconnected") {
      setUser({ status: "NOT_CONNECTED" });
    }
  }, [isConnected, activeConnector, accountAddress, activeChain, status]);

  const value = useMemo(() => ({ user }), [user]);

  return (
    <ConnectedUserContext.Provider value={value}>
      {children}
    </ConnectedUserContext.Provider>
  );
}

const useConnectedUser = () => {
  const context = useContext(ConnectedUserContext);
  if (context === undefined) {
    throw new Error(
      "useConnectedUser must be used within a ConnectedUserProvider"
    );
  }
  return context;
};

export { ConnectedUserProvider, useConnectedUser };
