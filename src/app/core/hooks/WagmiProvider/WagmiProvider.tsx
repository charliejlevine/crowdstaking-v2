import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

import { getConfig } from "./config/getConfig";

const NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID)
  throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID not set!");

const appName = "Breadchain Crowdstaking";

const baseTheme = darkTheme({
  accentColor: "#E873D3",
  accentColorForeground: "#2E2E2E",
  borderRadius: "small",
  fontStack: "system",
  overlayBlur: "small",
});

const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    modalBackground: "#242424",
  },
  fonts: {
    body: "var(--font-redhat)",
  },
};

const { wallets } = getDefaultWallets({
  appName,
  projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
});

const connectors = connectorsForWallets(
  [
    {
      groupName: "Wallets",
      wallets: [
        // ...wallets,
        // injected,
        // coinbaseWallet({ appName: "Create Wagmi" }),
        // walletConnect({
        //   projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
        // }),
      ],
    },
  ],
  {
    appName,
    projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  }
);

const { chains, transports } = getConfig();

export const config = createConfig({
  connectors,
  chains,
  transports,
});

const queryClient = new QueryClient();

export function RainbowProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={theme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
