/** @format */
import { ethers } from "ethers";
import {
  getActiveWallet,
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
} from "./web3Service";

export async function userIsRegistered() {
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && network !== "kovan") return false;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    const address = getActiveWallet();

    return await beimaContract.isRegistered(address);
  } catch (err) {
    console.log("Something went wrong", err);
  }
}

export async function registerUser(userIpfs, onRegister, onError) {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    await beimaContract.register(userIpfs);

    await beimaContract.on("Register", onRegister);
  } catch (err) {
    console.log("Something went wrong", err);
    onError();
  }
}

export async function getUserDetails() {
  try {
    if (!hasEthereum()) return false;

    // if (!isRegistered) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    const address = getActiveWallet();

    const details = await beimaContract.pensionServiceApplicant(address);
    const hasPlan = details.client.hasPlan;
    const user = await fetch(
      `https://ipfs.io/ipfs/${details.userDetails}`
    ).then((r) => r.json());

    if (!hasPlan) return { user, pension: null };

    const pensionInfo = await fetch(
      `https://ipfs.io/ipfs/${details.client.ipfsHashOfUserPensionDetails}`
    ).then((r) => r.json());

    const monthlyDeposit = details.client.amountToSpend.toString();
    const totalDeposit = details.client.depositedAmount.toString();

    const pension = {
      ...pensionInfo,
      monthlyDeposit,
      totalDeposit,
    };

    console.log({ user, pension });

    return { user, pension };
  } catch (err) {
    console.log("Something went wordSpacing: ", err);
  }
}
