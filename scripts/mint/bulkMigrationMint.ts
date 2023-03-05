import { ethers } from "hardhat";
import { userArray } from "../../userInfo";

async function main() {
  const nft = await ethers.getContractAt(
    "Mitaverse",
    "0xa8d2200398e5f295CF608C7824982B93D4F7fD1E"
  );
  //1명 100000
  //12명 500000
  //20명 3000000
  console.log(userArray.slice(0, 40));
  const tx = await nft.bulkMigrationMint(userArray.slice(0, 40), {
    gasLimit: 3500000,
    maxFeePerGas: 30 * 10 ** 9,
    maxPriorityFeePerGas: 2 * 10 ** 9,
  });
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
