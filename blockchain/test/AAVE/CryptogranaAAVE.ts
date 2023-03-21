import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { utils, Contract } from "ethers";
import { ethers, network } from "hardhat";
import { getAtokenWeth, getCryptograna, getWeth } from "./helpers/setUp";
require("chai").use(require("chai-as-promised")).should();




describe("Cryptograna AAVE Adapter", function () {


  let cryptograna: any;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let pool: string
  let weth: Contract
  let aTokenWeth: Contract

  this.beforeAll(async () => {
    cryptograna = await getCryptograna();

    weth = await getWeth();

    aTokenWeth = await getAtokenWeth();

    pool = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";

    [owner, user] = await ethers.getSigners();

  })

  it("Should supply tokens on AAVE", async () => {

    const amountToSupply = ethers.utils.parseEther("100");

    weth.connect(user).deposit({ value: amountToSupply });

    await weth.connect(user).approve(cryptograna.address, amountToSupply);

    await cryptograna.connect(user).supplyTokens(
      pool,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      amountToSupply,
      0
    )

    const supplyBalance = await aTokenWeth.balanceOf(cryptograna.address);

    expect(amountToSupply.toString()).to.eq(supplyBalance.toString());

    expect((await cryptograna.aaveTokenToWeth(user.address)).toString()).to.eq(supplyBalance.toString());

  });
});
