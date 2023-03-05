import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { userArray } from "../userInfo";

describe("mitaverse", function () {
  const baseUri = "https://storage.mitaverse.world/reveal/";
  async function deployMitaverse() {
    const [owner, account1, account2] = await ethers.getSigners();
    const token = await ethers.getContractFactory("Mitaverse");

    const mitaverse = await upgrades.deployProxy(token, [baseUri]);
    await mitaverse.deployed();

    return { owner, account1, account2, mitaverse };
  }
  it("mint should work", async function () {
    const { owner, account1, account2, mitaverse } = await loadFixture(
      deployMitaverse
    );
    await mitaverse.migrationMint(account1.address, 1);
  });
  it("bulk mint should work", async function () {
    const { owner, account1, account2, mitaverse } = await loadFixture(
      deployMitaverse
    );

    // for (let i = 0; i < 400; i++) {
    //   array.push([account1.address, 5]);
    // }

    await mitaverse.bulkMigrationMint(userArray.splice(0, 40));
  });
  it("many people minting should work", async function () {
    const { owner, account1, account2, mitaverse } = await loadFixture(
      deployMitaverse
    );

    const airdropArry = [
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 10 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 20 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
      { to: "0x3eB6CAed9232492f20A350Bbbd7875586159bEe7", amount: 30 },
    ];
    let totalgas = 0;
    for (const airdrop of airdropArry) {
      const tx = await mitaverse.migrationMint(airdrop.to, airdrop.amount);
      const receipt = await tx.wait();
      const ownerGasFee = receipt.gasUsed?.mul(tx.gasPrice);
      totalgas += ownerGasFee?.toNumber();
    }
  });
  it("can't over the max supply", async function () {
    const { owner, account1, account2, mitaverse } = await loadFixture(
      deployMitaverse
    );
    await expect(mitaverse.migrationMint(account1.address, 5001)).revertedWith(
      "Miterverse: Max supply reached"
    );
  });

  it("base uri should work", async function () {
    const { owner, account1, account2, mitaverse } = await loadFixture(
      deployMitaverse
    );
    await mitaverse.migrationMint(account1.address, 3);
    expect(await mitaverse.baseURI()).to.equal(baseUri);
  });

  it("token uri should work before reveal", async function () {
    const { owner, account1, account2, mitaverse } = await loadFixture(
      deployMitaverse
    );
    await mitaverse.migrationMint(account1.address, 3);
    expect(await mitaverse.tokenURI(1)).to.equal(baseUri + "0");
    expect(await mitaverse.tokenURI(2)).to.equal(baseUri + "0");
    expect(await mitaverse.tokenURI(3)).to.equal(baseUri + "0");
  });

  it("token uri should work after reveal", async function () {
    const { owner, account1, account2, mitaverse } = await loadFixture(
      deployMitaverse
    );
    await mitaverse.migrationMint(account1.address, 3);
    await mitaverse.reveal();
    expect(await mitaverse.tokenURI(1)).to.equal(baseUri + "1");
    expect(await mitaverse.tokenURI(2)).to.equal(baseUri + "2");
    expect(await mitaverse.tokenURI(3)).to.equal(baseUri + "3");
  });
});
