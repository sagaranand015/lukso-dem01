import Web3 from 'web3';
import { LSPFactory } from '@lukso/lsp-factory.js';
import { ERC725 } from '@erc725/erc725.js';
// import { * } from 'isomorphic-fetch';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import erc725schema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';

import { GetGlobalState } from '../globalState';
import { RPC_ENDPOINT, IPFS_GATEWAY, PRIVATE_KEY, CHAIN_ID } from './constants';

const web3 = new Web3();

export function GetAppEOA() {
    // Step 3.1 - Load our Externally Owned Account (EOA)
    const appEOA = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    return appEOA;
}

// export function GetHttpProvider() {
//   const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
//   return provider;
// }

export function GetLSPFactory() {
    // Step 3.2
    // Initialize the LSPFactory with the L16 RPC endpoint and your EOA's private key, which will deploy the UP smart contracts
    const lspFactory = new LSPFactory(RPC_ENDPOINT, {
        deployKey: PRIVATE_KEY,
        chainId: CHAIN_ID,
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

export async function GetConnectedWalletUPContract() {
  const state = GetGlobalState();
  if(!state.selectedAddress) {
    console.error("Wallet is not connected. Please connect wallet first!");
    return null;
  }

  const connectedUPAddress = new web3.eth.Contract(
    UniversalProfile.abi,
    state.selectedAddress,
  );
  console.log("Connected UP is: ", connectedUPAddress);
  return connectedUPAddress;
}

export async function GetConnectedWalletUPData() {
  const state = GetGlobalState();
  if(!state.selectedAddress) {
    console.error("Wallet is not connected. Please connect wallet first!");
    return null;
  }

  try {
    const config = { ipfsGateway: IPFS_GATEWAY };
    const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
    const profile = new ERC725(erc725schema, state.selectedAddress, provider, config);
    return await profile.fetchData('LSP3Profile');
  } catch (error) {
      console.log('This is not an ERC725 Contract', error);
      return null;
  }
}

export async function ConnectStoreUPToSelectedAddress() {
  console.log("Connecting the store UP to wallet connected address...");



}