import dotenv from "dotenv";
dotenv.config();
export const config = {
    ethRpc: process.env.ETH_RPC,
    ethContract: process.env.ETH_CONTRACT_ADDRESS,
    ethPrivateKey: process.env.ETH_PRIVATE_KEY,
    suiPrivateKey: process.env.SUI_PRIVATE_KEY,
    suiPackageId: process.env.SUI_PACKAGE_ID,
    suiTreasuryCap: process.env.SUI_TREASURY_CAP_ID,
};
