import { ethers } from "ethers";
import dotenv from "dotenv";
import { config } from "../bridge-config.js";

dotenv.config();

const ABI = [
  "function mint(address to, uint256 amount) external",
];

export async function handleMintOnEth(to: string, amount: bigint) {
  console.log(`Minting ${amount} IBT to ${to} on Ethereum...`);

  const provider = new ethers.JsonRpcProvider(config.ethRpc);
  const wallet = new ethers.Wallet(config.ethPrivateKey, provider);
  const contract = new ethers.Contract(config.ethContract, ABI, wallet);

  const tx = await contract.mint(ethers.getAddress(to), amount);
  
  const receipt = await tx.wait();

  console.log(`Minted on Ethereum. Tx hash: ${receipt.hash}`);
}
