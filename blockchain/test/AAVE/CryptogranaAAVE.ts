import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert, expect } from "chai";
import { utils, Contract, BigNumberish } from "ethers";
import { ethers, network } from "hardhat";
import { supplyTokens, borrowTokens } from "../helpers/AAVEAdapterFunc";
import { getAtokenWeth, getCryptograna, getWeth } from "../helpers/setUp";
import { approveERC20, depositERC20 } from "../helpers/wethHelper";
require("chai").use(require("chai-as-promised")).should();




describe("Cryptograna AAVE Adapter", function () {


  let cryptograna: any;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let pool: string
  let weth: Contract
  let aTokenWeth: Contract
  let amount: BigNumberish;

  let poolList: string[] = []

  this.beforeAll(async () => {
    cryptograna = await getCryptograna();

    weth = await getWeth();

    aTokenWeth = await getAtokenWeth();

    pool = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";

    [owner, user] = await ethers.getSigners();

    amount = ethers.utils.parseEther("100");

    poolList = [
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704",
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "0xae78736Cd615f374D3085123A210448E74Fc6393",
      "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
      "0xD533a949740bb3306d119CC777fa900bA034cd52"
    ]

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

    await supplyTokens({
      contract: cryptograna,
      signer: user,
      pool: pool,
      token: weth.address,
      amount: amount,
      referralCode: 0
    })

    const supplyBalance = await aTokenWeth.balanceOf(cryptograna.address);

    expect(amount.toString()).to.eq(supplyBalance.toString());

    expect((await cryptograna.aaveTokenToWeth(user.address)).toString()).to.eq(supplyBalance.toString());

  });

  it("Should not borrow tokens from AAVE when there is no borrow cap", async () => {

    await borrowTokens({
      contract: cryptograna,
      signer: user,
      pooldataProvider:"0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3",
      pool: pool,
      token: poolList[6],
      amount: 2000000,
      interestRateMode: 2,
      referralCode: 0,
      onBehalfOf: cryptograna.address
    }).should.be.rejectedWith("VM Exception while processing transaction: reverted with custom error 'AssetOutOfBorrowCap()'");
  
  });
});




