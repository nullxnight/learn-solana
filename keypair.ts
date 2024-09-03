import { Keypair } from "@solana/web3.js";

// To make our own key pair we use `Keypair.generate()`
const keypair = Keypair.generate();

console.log(`Public key: ${keypair.publicKey.toBase58()}`)
console.log(`Private/secret key: ${keypair.secretKey}`)

// [NOTE: Since the keypair can be regenerated from the secret key, we usually only store the secret key, and restore the keypair from the secret key]
// [NOTE: so don't put secret key in code put it in .env]