import CustomEtherscanProvider from ".";

export const etherscanProvider = new CustomEtherscanProvider(
  "homestead",
  process.env.ETHERSCAN_API_KEY
);
