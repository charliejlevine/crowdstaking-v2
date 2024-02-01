import { gnosis, hardhat } from "wagmi/chains";
import { http } from "wagmi";

const NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID)
  throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID not set!");

const NEXT_PUBLIC_QUIKNODE_URL = process.env.NEXT_PUBLIC_QUIKNODE_URL;
if (!NEXT_PUBLIC_QUIKNODE_URL)
  throw new Error("NEXT_PUBLIC_QUIKNODE_URL not set!");

const projectId = NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const chains = [gnosis, hardhat];

const transports = {
  [gnosis.id]: http(),
  [hardhat.id]: http(),
};

export { chains, transports };
