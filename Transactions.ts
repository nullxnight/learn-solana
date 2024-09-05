import "dotenv/config"
/*
import 'dotenv' from "dotenv"
dotenv.config()
*/
import { 
    Transaction,
    Connection, 
    LAMPORTS_PER_SOL, 
    SystemProgram, 
    TransactionConfirmationStatus, 
    PublicKey, 
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction} from "@solana/web3.js"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedPublicKey = process.argv[2];
if(!suppliedPublicKey){
    throw new Error();
    // process.exit(1);
}

const senderKeyPair = getKeypairFromEnvironment('SECRET_KEY')
console.log(`Sender Public key: ${senderKeyPair.publicKey.toString()}`)
const toPublic = new PublicKey(suppliedPublicKey)
const connection = new Connection('https://api.devnet.solana.com', "confirmed")
console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`,);

const transaction = new Transaction()
const LAMPORTS_TO_SEND = 2000000
const solInUsd = LAMPORTS_TO_SEND / LAMPORTS_PER_SOL * 20

const solSendingInstraction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey: toPublic,
    lamports: LAMPORTS_TO_SEND,
})

transaction.add(solSendingInstraction);

const timeTake = performance.now();

const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeyPair
]).then(
    ((time) => {
        const endTime = performance.now()
        const transactionTime = (endTime - timeTake) / 1000
        console.log(
            `💸 Finished! Sent $${solInUsd}USD to the address ${toPublic}.\nTime Transaction Take: ${transactionTime} Sec`,
          );
        console.log(`Transaction signature is ${signature}!`);
    })
).catch(
    (error) => {
        throw new Error(`Error: ${error}`)
    }
)



