import { ethers, upgrades } from "hardhat";

async function main() {
  const baseUri = "https://storage.mitaverse.world/reveal/";

  const token = await ethers.getContractFactory("Mitaverse");

  const mitaverse = await upgrades.deployProxy(token, [baseUri], {
    pollingInterval: 1000,
    timeout: 0,
  });
  await mitaverse.deployed();
  console.log("deployed address:", mitaverse.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * hard wallet
 */
// const frame = ethProvider("frame");
// const Mitaverse = await ethers.getContractFactory('Mitaverse')
// const tx = await Mitaverse.getDeployTransaction()
// // Set `tx.from` to current Frame account
// // @ts-ignore
// tx.from = (await frame.request({ method: 'eth_requestAccounts' }))[0]

// // Sign and send the transaction using Frame
// await frame.request({ method: 'eth_sendTransaction', params: [tx] })
