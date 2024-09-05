import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error("Provide Public key!");
} else if (suppliedPublicKey.length < 32 || suppliedPublicKey.length > 44) {
    console.log("Invalid Public key length!");
};

const connect = new Connection(clusterApiUrl('devnet'));
const publicKey = new PublicKey(suppliedPublicKey);
(async() => {
    const balance = await connect.getBalance(publicKey);
    const balanceUsd = balance / LAMPORTS_PER_SOL
    console.log(`Your account: ${publicKey}\nBalance: ${balanceUsd}`);
})();
