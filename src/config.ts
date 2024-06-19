import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { Chain, sepolia } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const immutable = {
  id: 13371,
  name: "Immutable Mainnet",
  rpcUrls: { default: { http: ["https://rpc.immutable.com"] } },
  nativeCurrency: { name: "IMX", symbol: "IMX", decimals: 18 },
} as const satisfies Chain;

// Create wagmiConfig
const chains = [immutable, sepolia] as const;
export const config = defaultWagmiConfig({
  enableWalletConnect: true,
  enableEIP6963: true,
  enableInjected: false,
  enableCoinbase: true,
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
