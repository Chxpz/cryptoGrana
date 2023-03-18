import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { utils, Contract } from "ethers";
import { ethers, network } from "hardhat";
require("chai").use(require("chai-as-promised")).should();




describe("FlashLoans", function () {


  let broker: any;
  let owner: any;

  this.beforeAll(async () => {
    const brokerContract = await ethers.getContractFactory("Broker");
    broker = await brokerContract.deploy();

    [owner] = await ethers.getSigners();

  })

  it("It should perform a flash loan - get the money", async () => {
    // const poolAbi = [{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"initialize","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]
    // const poolAddress = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"
    // const aave = await ethers.getContractAt(poolAbi,poolAddress);

    const args = {
      poolAddress: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
      asset: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      amount: ethers.utils.parseEther("6485"),
      params: "0x",
      referralCode: 0
    }

    const tx = await broker.callFlashLoanSimple(
      args.poolAddress,
      args.asset,
      args.amount,
      args.params,
      args.referralCode
    ).chai.should.be.rejectedWith("")

  })
});




