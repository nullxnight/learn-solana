"use strict";
// in this "@solana-developers/helpers" there is function getKeypairFromEnvironment() hellp you to extract key pair from .env file.
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("@solana-developers/helpers");
var web3_js_1 = require("@solana/web3.js");
var keypair = web3_js_1.Keypair.generate();
// console.log(`The Public key: ${keypair.publicKey.toBase58()}`);
// console.log(`The Private key: generated successfully`);
var secretKey = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
console.log(secretKey);
