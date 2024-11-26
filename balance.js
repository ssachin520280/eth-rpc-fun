import { createPublicClient, http, formatEther } from "viem";
import { sepolia } from "viem/chains";
import dotenv from 'dotenv';

dotenv.config();

const apiUrl = process.env.ALCHEMY_API_URL;

// Create public client for reading from the chain
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(apiUrl)
});

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

// Example usage with your address
checkBalance("0xcE77EE91c2b890f7c0a6d4DAbD17f82e3C157920");