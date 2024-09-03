// in this "@solana-developers/helpers" there is function getKeypairFromEnvironment() hellp you to extract key pair from .env file.

import dotenv from "dotenv"
dotenv.config()

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

// console.log(`The Public key: ${keypair.publicKey.toBase58()}`);
// console.log(`The Private key: generated successfully`);

const secretKey = getKeypairFromEnvironment("SECRET_KEY")
console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`)

// .env key format should be like this [45,159,242....] or "[45,159,242....]"
// .env key format should not be like this [(45,159,242....)]