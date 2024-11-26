# Ethereum RPC Interaction Examples

This repository contains a collection of JavaScript scripts demonstrating various ways to interact with the Ethereum blockchain (Sepolia testnet) using Viem and Web3 libraries.

## Features

- 🔄 Deploy smart contracts
- 💰 Check ETH balances
- 📤 Send ETH transactions
- 🤝 Interact with smart contracts
- 🔍 Read contract state

## Prerequisites

- Node.js installed
- An Alchemy API key
- A wallet private key with some Sepolia testnet ETH

## Setup

1. Clone the repository
2. Install dependencies: 
```bash
npm install
```
3. Create a `.env` file with the following variables:
```bash
ALCHEMY_API_URL=your_alchemy_api_url
PRIVATE_KEY=your_private_key
ADDRESS_SENDER=your_sender_address
ADDRESS_RECEIVER=your_receiver_address
```

## Available Scripts

### Check Balance
```bash
node balance.js
```
Checks the ETH balance of a specified address on Sepolia testnet.

### Send ETH
```bash
node send.js
```
Sends a specified amount of ETH from one address to another.

### Deploy Contract
```bash
node deploy.js
```
Deploys the World smart contract to Sepolia testnet.

### Contract Interaction
```bash
node enter.js # Call the enter() function
node entered.js # Check if an address has entered
```

## Smart Contract

The repository includes a simple `World` smart contract that demonstrates basic state management:
```solidity
contract World {
    mapping(address => bool) public entered;
    function enter() public {
        entered[msg.sender] = true;
    }
    function leave() public {
        entered[msg.sender] = false;
    }
}
```

## Dependencies

- viem: For Ethereum interactions
- dotenv: For environment variable management
- axios: For direct RPC calls example
- solc: For smart contract compilation

## Security Notes

- Never commit your `.env` file
- Keep your private keys secure
- This is for educational purposes on testnet only

## License

ISC

## Contributing

Feel free to submit issues and pull requests.