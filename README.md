# IBT Bridge

A cross-chain token bridge that allows transferring **IBT Token** between **Ethereum** and **Sui** blockchains.

## Features

- Bridge IBT tokens between Ethereum and Sui
-  UI built with React, TypeScript, TailwindCSS, and Vite
- Secure smart contracts for token locking and minting
- Supports both chains with seamless user interaction

## Project Structure

- `bridge-ui/` — Frontend UI (with all the specs)
- `backend/` — Backend or middleware logic (including minting of Sui and ETH)
- `ethereum/` — Ethereum smart contracts
- `sui/` — Sui smart contracts

## Technologies Used

- React + TypeScript
- TailwindCSS + PostCSS
- Solidity & Sui Move
- Git & Vite

## How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/LucaSandru/ibt-bridge.git
   cd ibt-bridge

2. Install frontend dependencies:
   ```bash
   cd bridge-ui
   npm install
   npm run dev
   ```

3. Run the backend (If applicable)
good because backend/ has Node.js scripts or an API:

```bash
cd ../backend
npm install
# then either:
node index.js
npm star
```

4. Ethereum Smart Contract

a) Install dependencies (Hardhat or Truffle):
```bash
cd ../ethereum
npm install
```
b) Compile the contracts:
```hash
npx hardhat compile
```
c) Optional, you can deploy to a local or test network:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
Here, make sure you're running Hardhat local node, or connected to testnet via `.env.`

5. Sui Smart Contract

a) Make sure to be installed by the Sui CLI: [https://docs.sui.io/sui-cli]
b) Run tests or publish packages with:
```bash
sui move build
sui move test
sui client publish --gas-budget 100000000
```
