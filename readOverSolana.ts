// Connection is a web3 object that helps to connect with solana network called cluster => there are various cluster mainnet, devnet here we are using devnet(testing network)

import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js";

const connect = new Connection(clusterApiUrl('devnet'));
const publicKey = new PublicKey("4jr6jTqp4Kw9j7jKZ9qRiFRdynnXbznhK8Nvw6xg4YvJ");

// const balance = await connect.getBalance(publicKey) => alternate and better way but if it is not working due to some version stuff then use below one.

(async() => {
    const balance =  await connect.getBalance(publicKey)
    console.log(`Balance: ${balance}`)
    const balanceUsd = balance / LAMPORTS_PER_SOL;
    console.log(`Balance in USD: ${balanceUsd}`);
    
})();

// console.log(`Connected`);
