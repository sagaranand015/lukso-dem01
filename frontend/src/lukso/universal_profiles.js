import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';

const web3 = new Web3();
// const PRIVATE_KEY = process.ENV.APP_PRIVATE_KEY; // add the private key of your EOA here (created in Step 1)
const PRIVATE_KEY = "0xc2bb2b2d8a9de4c99317d909afd713546fe0ea690278ee3c908cde90498f4e84";

export function GetAppEOA() {
    // Step 3.1 - Load our Externally Owned Account (EOA)
    const appEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    return appEOA;
}

export function GetLSPFactory() {
    // Step 3.2
    // Initialize the LSPFactory with the L16 RPC endpoint and your EOA's private key, which will deploy the UP smart contracts
    const lspFactory = new LSPFactory('https://rpc.l16.lukso.network', {
        deployKey: PRIVATE_KEY,
        chainId: 2828,
    });
    return lspFactory;
}

export async function CreateStoreUniversalProfile(ctrlAddress, storeMetadata) {
    const lspFactory = GetLSPFactory();
    const appEOA = GetAppEOA();
    const deployedContracts = await lspFactory.UniversalProfile.deploy({
        controllerAddresses: [ctrlAddress], // The connected user will control the UP
        lsp3Profile: {
          name: storeMetadata.storeName,
          description: storeMetadata.storeDesc,
          tags: ['Store Profile'],
          links: [
            {
              title: storeMetadata.storeName,
              url: storeMetadata.storeUrl,
            },
          ],
        },
      }, undefined);
    
      const myUPAddress = deployedContracts.LSP0ERC725Account.address;
      console.log('Store Universal Profile address: ', myUPAddress);
      return deployedContracts;
}

export async function ConnectStoreUPToSelectedAddress() {
  console.log("Connecting the store UP to wallet connected address...");

  

}