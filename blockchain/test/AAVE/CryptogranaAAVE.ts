import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { utils, Contract, BigNumberish } from "ethers";
import { ethers, network } from "hardhat";
import { getAtokenWeth, getCryptograna, getWeth } from "./helpers/setUp";
import { approveERC20, depositERC20 } from "./helpers/wethHelper";
require("chai").use(require("chai-as-promised")).should();




describe("Cryptograna AAVE Adapter", function () {


  let cryptograna: any;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let pool: string
  let weth: Contract
  let aTokenWeth: Contract
  let amount: BigNumberish;

  this.beforeAll(async () => {
    cryptograna = await getCryptograna();

    weth = await getWeth();

    aTokenWeth = await getAtokenWeth();

    pool = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";

    [owner, user] = await ethers.getSigners();

    amount = ethers.utils.parseEther("100");

  })

  it("Should supply tokens on AAVE", async () => {

    await depositERC20({
      ERC20Token: weth.address,
      amount: amount,
      signer: user
    })

    await approveERC20({
      ERC20Token: weth.address,
      amount: amount,
      signer: user,
      spender: cryptograna.address
    })


    await cryptograna.connect(user).supplyTokens(
      pool,
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      amount,
      0
    )

    const supplyBalance = await aTokenWeth.balanceOf(cryptograna.address);

    expect(amount.toString()).to.eq(supplyBalance.toString());

    expect((await cryptograna.aaveTokenToWeth(user.address)).toString()).to.eq(supplyBalance.toString());

  });
});
