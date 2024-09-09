

// Ping counter program address: ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa
// Ping counter program data storage address: Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod
import * as web3 from "@solana/web3.js";
import "dotenv/config";
import base58 from "bs58";

// @solana-developers/helpers => not working don't know why ?? : ) 
// import {
//   getKeypairFromEnvironment,
//   airdropIfRequired,
// } from "@solana-developers/helpers";

const getKeypairFromEnvironment = (variableName) => {
    const secretKeyString = process.env[variableName];
    if (!secretKeyString) {
        throw new Error(`Please set '${variableName}' in environment.`);
    }
    // Try the shorter base58 format first
    let decodedSecretKey;
    try {
        decodedSecretKey = base58.decode(secretKeyString);
        return web3.Keypair.fromSecretKey(decodedSecretKey);
    }
    catch (throwObject) {
        const error = throwObject;
        if (!error.message.includes("Non-base58 character")) {
            throw new Error(`Invalid secret key in environment variable '${variableName}'!`);
        }
    }
    // Try the longer JSON format
    try {
        decodedSecretKey = Uint8Array.from(JSON.parse(secretKeyString));
    }
    catch (error) {
        throw new Error(`Invalid secret key in environment variable '${variableName}'!`);
    }
    return web3.Keypair.fromSecretKey(decodedSecretKey);
};


const privateKey = getKeypairFromEnvironment("SECRET_KEY")
console.log(`🔑 Loaded keypair ${privateKey.publicKey.toBase58()}!`);
const pubKey = privateKey.publicKey;
const connection = new web3.Connection(web3.clusterApiUrl("devnet"))

// Ping Program:
/**
 * 
 * What we need to talk to ping program:
    create a transaction
    create an instruction
    add the instruction to the transaction
    send the transaction

    // Basic stucture of ping program.

    const instruction = new TransactionInstruction({
    programId: PublicKey;
    keys: [
        {
        pubkey: Pubkey,
        isSigner: boolean,
        isWritable: boolean,
        },
    ],
    data?: Buffer;
    });
 */

const PING_PROGRAM_ADDRESS = new web3.PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")
const transaction = new web3.Transaction()
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS)
const programData = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS)


const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: programData,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });
  
transaction.add(instruction);
(async () => {
    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [privateKey]);
    console.log(`✅ Transaction completed! Signature is ${signature}`);
    console.log(`✅ Transaction completed! You can view your transaction on the Solana Explorer at:`);
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);


})();

