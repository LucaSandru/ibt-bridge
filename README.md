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
