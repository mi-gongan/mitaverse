import { ethers } from "hardhat";

async function main() {
  const nft = await ethers.getContractAt(
    "Mitaverse",
    "0xa8d2200398e5f295CF608C7824982B93D4F7fD1E"
  );
  const tx = await nft.depositToken();
  console.log(tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
