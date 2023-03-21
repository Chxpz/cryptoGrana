import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumberish, ethers } from "ethers";
import {ERC20ABI} from "./ABIs/ERC20Abi.json";

interface DepositERC20Params {
    ERC20Token: string;
    amount: BigNumberish;
    signer: SignerWithAddress;
}

interface approveERC20Params {
    ERC20Token: string;
    amount: BigNumberish;
    signer: SignerWithAddress;
    spender: string;
}

export async function depositERC20({
    ERC20Token,
    amount,
    signer
}:DepositERC20Params): Promise<ethers.providers.TransactionResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            const ERC20TokenContract = new ethers.Contract(ERC20Token, ERC20ABI, signer);
            const tx = await ERC20TokenContract.deposit({ value: amount });
            resolve(tx);
        } catch (error) {
            reject(error);
        }
    })
}

export async function approveERC20({
    ERC20Token,
    amount,
    signer,
    spender
}:approveERC20Params): Promise<ethers.providers.TransactionResponse> {
    return new Promise(async (resolve, reject) => {
        try {
            const ERC20TokenContract = new ethers.Contract(ERC20Token, ERC20ABI, signer);
            const tx = await ERC20TokenContract.approve(spender, amount);
            resolve(tx);
        } catch (error) {
            reject(error);
        }
    })
}

