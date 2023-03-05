import { ethers, upgrades } from "hardhat";

async function main() {
  const token = await ethers.getContractFactory("Mitaverse");

  const Mitaverse = await upgrades.upgradeProxy(
    "0xa8d2200398e5f295CF608C7824982B93D4F7fD1E",
    token,
    {
      pollingInterval: 1000,
      timeout: 0,
    }
  );
  console.log("Mitaverse deployed to:", Mitaverse.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
