import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { config } from "../bridge-config";
function getKeypair() {
    const { secretKey } = decodeSuiPrivateKey(config.suiPrivateKey);
    return Ed25519Keypair.fromSecretKey(secretKey);
}
export async function handleMintOnSui(recipient, amount) {
    console.log(`🔁 Minting ${amount} IBT to ${recipient} on Sui...`);
    const client = new SuiClient({ url: "http://127.0.0.1:9000" });
    // ✅ CORRECT CLASS NAME
    const tx = new Transaction();
    tx.moveCall({
        target: `${config.suiPackageId}::ibt_token::mint_ibt`,
        arguments: [
            tx.object(config.suiTreasuryCap),
            tx.pure.address(recipient),
            tx.pure.u64(amount),
        ],
    });
    const result = await client.signAndExecuteTransaction({
        signer: getKeypair(),
        transaction: tx,
        options: {
            showEffects: true,
            showEvents: true,
        },
    });
    console.log("✅ Minted on Sui. Tx digest:", result.digest);
}
