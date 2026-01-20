import dotenv from "dotenv";
dotenv.config();

export const config = {
  ethRpc: process.env.ETH_RPC as string,
  ethContract: process.env.ETH_CONTRACT_ADDRESS as string,
  ethPrivateKey: process.env.ETH_PRIVATE_KEY as string,

  suiPrivateKey: process.env.SUI_PRIVATE_KEY as string,
  suiPackageId: process.env.SUI_PACKAGE_ID as string,
  suiTreasuryCap: process.env.SUI_TREASURY_CAP_ID as string,
};
