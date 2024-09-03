"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_js_1 = require("@solana/web3.js");
// To make our own key pair we use `Keypair.generate()`
var keypair = web3_js_1.Keypair.generate();
console.log("Public key: ".concat(keypair.publicKey.toBase58()));
console.log("Private/secret key: ".concat(keypair.secretKey));
// [NOTE: Since the keypair can be regenerated from the secret key, we usually only store the secret key, and restore the keypair from the secret key]
// [NOTE: so don't put secret key in code put it in .env]
