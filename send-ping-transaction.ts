// Ping counter program address: ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa
// Ping counter program data storage address: Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod
import * as web3 from "@solana/web3.js";
import "dotenv/config";

// @solana-developers/helpers => not working don't know why ?? : ) 
import {
  getKeypairFromEnvironment,
  airdropIfRequired,
} from "@solana-developers/helpers";
 
const privateKey = getKeypairFromEnvironment("SECRET_KEY")
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
    programId: programId,
    keys: [
        {
            pubkey: pubKey,
            isSigner: false,
            isWritable: true
        },
    ]
})

transaction.add(instruction);
const signature = web3.sendAndConfirmTransaction(connection, transaction, [
    privateKey
])

console.log(`✅ Transaction completed! Signature is ${signature}`);
