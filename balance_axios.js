const { default: axios } = require('axios');

require('dotenv').config();

const apiUrl = process.env.ALCHEMY_API_URL;

async function getBlockNumber() {
    const response = await axios.post(apiUrl, {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
    })

    console.log(response.data);
}

getBlockNumber();

async function getBalance() {
    const response = await axios.post(apiUrl, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: ["0xFcD4d09E80c82D60FfceFcA90618c2Bb913a81aB", "latest"],
        id: 1
    })

    console.log(response.data);
}

getBalance();