require("dotenv").config();

import Web3 from "web3";
import TokenABI from "../contracts/token.json";
import VaultABI from "../contracts/vault.json";

class SmartContractDAO {
  web3: Web3;
  tokenAddress: string;
  vaultAddress: string;
  withdrawalPrivKey: string;
  withdrawalAddress: string;

  constructor() {
    this.web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
    this.tokenAddress = process.env.TOKEN_ADDRESS || "";
    this.vaultAddress = process.env.VAULT_ADDRESS || "";
    this.withdrawalPrivKey = process.env.WITHDRAWAL_PRIV_KEY || "";
    this.withdrawalAddress = process.env.WITHDRAWAL_ADDRESS || "";
  }

  async withdrawToken(address: string, amount: number) {
    this.web3.eth.accounts.wallet.add(this.withdrawalPrivKey);
    const vaultContract = new this.web3.eth.Contract(
      VaultABI,
      this.vaultAddress
    );
    const value = Web3.utils.toWei(amount.toString(), "ether");
    // @ts-ignore
    const data = vaultContract.methods.withdraw(value, address).encodeABI();
    const tx = {
      from: this.withdrawalAddress,
      to: this.tokenAddress,
      gas: 2000000,
      data: data,
    };
    const signedTx = await this.web3.eth.accounts.signTransaction(
      tx,
      this.withdrawalPrivKey
    );
    const receipt = await this.web3.eth.sendSignedTransaction(
      signedTx.rawTransaction || ""
    );
    return receipt;
  }
}

export default SmartContractDAO;
