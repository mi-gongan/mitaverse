import { ethers, upgrades } from "hardhat";

async function main() {
  if (process.env.MITAVERSE_ADDRESS) {
    const token = await ethers.getContractFactory("Mitaverse");

    const Mitaverse = await upgrades.upgradeProxy(
      process.env.MITAVERSE_ADDRESS,
      token,
      {
        pollingInterval: 1000,
        timeout: 0,
      }
    );
    console.log("Mitaverse deployed to:", Mitaverse.address);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
