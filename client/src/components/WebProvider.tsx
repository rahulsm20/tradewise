import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { useTheme } from "./theme-provider";

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(`${import.meta.env.VITE_INFURA_URL}`),
    },
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    appName: "tradewise",
  })
);

const queryClient = new QueryClient();
type Mode = "light" | "dark" | "auto";

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { theme: mode } = useTheme();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode={mode as Mode}>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
