import { SuiClientProvider, WalletProvider, createNetworkConfig } from "@mysten/dapp-kit";
import type { ReactNode } from "react"; // <-- FIXED here

// Choose local network (because you're using `sui start`)
const { networkConfig } = createNetworkConfig({
  localnet: {
    url: "http://127.0.0.1:9000",
  },
});

export function SuiProvider({ children }: { children: ReactNode }) {
  return (
    <SuiClientProvider network="localnet" networks={networkConfig}>
      <WalletProvider autoConnect>
        {children}
      </WalletProvider>
    </SuiClientProvider>
  );
}
