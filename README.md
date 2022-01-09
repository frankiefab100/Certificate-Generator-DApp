# Certificate-Generator-DApp

The application only uses a combination of client side scripting and Metamask wallet

## Development Tools

1. Node.js and NPM
2. MetaMask Wallet

## Setting up

1. Install MetaMask wallet extension in your browser.
2. Connect to any test network (Rinkeby, Ropesten, Kovan etc..) and use the faucet to get test ether.
3. Run the Geth client in dev mode:

`geth --dev --networkid "5777" --http --http.port "8545" --http.corsdomain "\*" --http.api "admin,web3,eth,txpool,personal,net"`

This will start our Geth client on dev mode, with one pre-funded account.

4. Open the Remix IDE (http://remix.ethereum.org)

- Compile the contract.
- Connect to the Metasmask wallet/Geth client using the Web3 Provider environment in Remix IDE
- Deploy the contract.
- Copy and store the Contract Address and ABI, for later use.

## Installation

- Install all other dependencies: `npm install`
- Execute the command: `npm start`
