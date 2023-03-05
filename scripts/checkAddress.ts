import { ethers, upgrades } from "hardhat";
import ethProvider from "eth-provider";

async function main() {
  if (process.env.MAINNET_PRIVATE_KEY) {
    const account = new ethers.Wallet(process.env.MAINNET_PRIVATE_KEY);
    console.log("account:", account.address);
    console.log(process.env.MAINNET_API_KEY);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
