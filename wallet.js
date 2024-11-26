require("dotenv").config();
const { privateKeyToAddress } = require("viem/accounts");

const address = privateKeyToAddress(process.env.PRIVATE_KEY)
console.log(address)