import { ethers } from "hardhat";
import { userArray } from "../../userInfo";

async function main() {
  const nft = await ethers.getContractAt(
    "Mitaverse",
    "0xa8d2200398e5f295CF608C7824982B93D4F7fD1E"
  );
  // for (const user of userArray) {
  //   const tx = await nft.migrationMint(user.to, user.quantity * 2);
  //   console.log("to: ", user.to);
  //   console.log("quantity: ", user.quantity * 2);
  //   console.log(tx);
  // }
  const tx = await nft.migrationMint(
    "0xa8d2200398e5f295cf608c7824982b93d4f7fd1e",
    456
  );
  // console.log("to: ", user.to);
  // console.log("quantity: ", user.quantity * 2);
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
