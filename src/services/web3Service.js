import { ethers } from "ethers";
import { BeimaAbi, RinkebyUSDTAbi } from "../contracts/abis";
import { BeimaContractAddress, RinkebyUSDTContractAddress } from "../utils";

export const connectToMetaMask = async (setError) => {
  try {
    if (!hasEthereum()) return false;

    await window.ethereum.request({ method: "eth_requestAccounts" });

    return true;
  } catch (error) {
    console.log(error);
    if (setError) setError(error.message ?? error.toString());
    return { error };
  }
};

export function getActiveWallet() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = signer.provider.provider.selectedAddress;
  return address;
}

export function hasEthereum() {
  return window.ethereum ? true : false;
}

export async function getCurrentNetwork() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const network = (await signer.provider._networkPromise).name;
  return network;
}

export function listenToAccountChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("accountsChanged", async (accounts) => {
    handler(accounts[0]);
  });
}

export async function unmountEthListeners() {
  window.ethereum.removeListener("accountsChanged", () => {});
  window.ethereum.removeListener("message", () => {});
}

export async function getBeimaContract(signer) {
  try {
    if (!hasEthereum()) return false;

    return new ethers.Contract(BeimaContractAddress, BeimaAbi.abi, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}

export async function getRinkebyUSDTContract(signer) {
  try {
    if (!hasEthereum()) return false;
      
    //  this is the hack that"s serving me for now, contributions how can i make this better please lol.   
    const USDTAbi = await fetch(
      "https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0xE2F373f64f7b60a82a4aC1aF1543f9e9eBa38fE1"
    ).then((r) => r.json());
    return new ethers.Contract(
      RinkebyUSDTContractAddress,
      USDTAbi.result,
      signer
    );
    // this was the initial return value that was causing the bug.
    //    return new ethers.Contract(
    //    RinkebyUSDTContractAddress,
    //    RinkebyUSDTAbi,
    //    signer
    //     );
    
  } catch (err) {
    console.log("failed to load contract", err);
  }
}
