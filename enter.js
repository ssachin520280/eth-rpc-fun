import { createWalletClient, parseEther, formatEther, parseAbi, publicActions } from "viem";
import { sepolia } from "viem/chains";
import { createPublicClient, http } from "viem";
import dotenv from 'dotenv'
import { privateKeyToAccount } from "viem/accounts";
import { readFileSync } from 'fs';
const bytecode = JSON.parse(readFileSync('./bytecode.json'));

const contractAddress = "0x3d9671ba178fefa502c4b04997969d483ee8b160";
const abi = parseAbi([
  "function enter() public",
  "function leave() public",
  "function enetered(address) public view returns (bool)"
])

dotenv.config();

const apiUrl = process.env.ALCHEMY_API_URL;
const privateKey = process.env.PRIVATE_KEY;
const addressSender = process.env.ADDRESS_SENDER;

// Create public client for reading from the chain
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(apiUrl)
});

// Add these debug logs after creating the public client
console.log("Connected to network:", sepolia.name);
console.log("Network ID:", sepolia.id);
console.log("Sender Address:", addressSender);

// Create wallet client for sending transactions
const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(apiUrl),
  account: privateKeyToAccount(privateKey)
}).extend(publicActions);

async function transact() {
  try {
    const transaction = await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName: "enter",
    });
    
    console.log('Transaction hash:', transaction);
    
    // Wait for transaction to be mined
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: transaction
    });
    
    console.log('Transaction confirmed:', receipt);
    return receipt;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

// Modify the balance checking to add error handling
async function checkBalance(address) {
    try {
        const balance = await publicClient.getBalance({
            address: address,
        });
        console.log(`Balance for ${address}: ${formatEther(balance)} ETH`);
        return balance;
    } catch (error) {
        console.error(`Error fetching balance for ${address}:`, error);
        return null;
    }
}

// Replace the balance checks with
await checkBalance(addressSender);

await transact(); 

await checkBalance(addressSender);

