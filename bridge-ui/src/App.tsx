import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// ========== UPDATE ONLY THIS IF YOU REDEPLOY ==========
const IBT_TOKEN_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

// ABI MATCHING YOUR CONTRACT
const IBT_ABI = [
  "function burn(uint256 amount, string toChain, string toAddress) external",
  "function balanceOf(address account) public view returns (uint256)",
];

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ===== CONNECT METAMASK =====
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected.");
      return;
    }

    try {
      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWalletAddress(address);
      fetchBalance(address);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  // ===== FETCH IBT BALANCE =====
  const fetchBalance = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const ibt = new ethers.Contract(IBT_TOKEN_ADDRESS, IBT_ABI, provider);

      const bal = await ibt.balanceOf(address);
      setBalance(ethers.formatUnits(bal, 18));
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setBalance("Error");
    }
  };

  // ===== BURN ON ETH → BRIDGE TO SUI =====
  const burnIBT = async () => {
    try {
      if (!window.ethereum || !walletAddress) return;

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const ibt = new ethers.Contract(
        IBT_TOKEN_ADDRESS,
        IBT_ABI,
        signer
      );

      // CHANGE THIS TO YOUR SUI ADDRESS
      const SUI_DESTINATION =
        "0xdc01866926ef19a647c953925ff2cf2f63d5d52a522148726ed7010c215ffc36";

      const tx = await ibt.burn(
        ethers.parseUnits(amount, 18),
        "SUI",
        SUI_DESTINATION
      );

      await tx.wait();

      alert("✅ IBT burned on Ethereum → waiting for Sui mint");
      fetchBalance(walletAddress);
      setAmount("");
    } catch (err) {
      console.error("Burn failed:", err);
      alert("❌ Burn failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const isBurnDisabled =
    loading || !amount || parseFloat(amount) <= 0 || balance === "0";

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">

      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">

        <h1 className="text-3xl font-bold mb-4">IBT Bridge</h1>

        <p className="text-gray-600 mb-6">
          Ethereum → Sui Bridge  
          (Burn on ETH, Mint on Sui)
        </p>

        {walletAddress ? (
          <>
            <div className="mb-2 text-sm text-gray-600">
              Connected:
              <span className="font-mono ml-1">
                {walletAddress.slice(0, 6)}...
                {walletAddress.slice(-4)}
              </span>
            </div>

            <div className="mb-4 text-sm font-semibold">
              Balance:
              <span className="font-mono ml-1">
                {balance ?? "Loading..."} IBT
              </span>
            </div>

            <input
              type="number"
              placeholder="Amount to burn"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              onClick={burnIBT}
              disabled={isBurnDisabled}
              className={`px-6 py-2 w-full rounded-lg font-semibold transition-colors ${
                isBurnDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {loading ? "Processing..." : "🔥 Burn IBT"}
            </button>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="px-6 py-2 w-full rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            🔗 Connect MetaMask
          </button>
        )}
      </div>
    </div>
  );
}
